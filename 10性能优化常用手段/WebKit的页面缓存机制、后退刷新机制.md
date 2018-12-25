### 一、背景

用户点击浏览器工具栏中的后退按钮，或者移动设备上的返回键时，或者JS执行history.go(-1);时，浏览器会在当前窗口“打开”历史纪录中的前一个页面。不同的浏览器在“打开”前一个页面的表现上并不统一，这和浏览器的实现以及页面本身的设置都有关系。

在移动端HTML5浏览器和webview中，“后退到前一个页面”意味着：前一个页面的html/js/css等静态资源的请求<font color=#ff0000>（甚至是ajax动态接口请求）根本不会重新发送，直接使用缓存的响应</font>，而<font color=#ff0000>不管这些静态资源响应的缓存策略是否被设置了禁用状态。</font>（这点我在自己的项目中也确实得到了验证，按回退按钮的时候抓包并没有抓到任何请求）。

在我自己项目中因为涉及到存取cookie的原因，由于返回不刷新而导致一系列的bug，所以需要‘回退刷新’的需求。

“回退刷新”的目标是浏览器在后退返回到前一个页面时，能从server端请求到一个全新的的页面内容（即status code 200 ok或status code 304 not modified的页面响应，而不是status 200 from cache根本不向server端请求）进行加载展示并重新执行JS代码。

### 二、解决方案

#### 浏览器历史纪录和HTTP 缓存

PC浏览器实现后退刷新的方法是给响应添加Cache-Control的header，如果server返回页面响应的headers中包含如下内容：
```
Cache-Control: no-cache,no-store,must-revalidate
Expires: Thu, 01 Jan 1970 00:00:00 GMT
Pragma: no-cache
```
浏览器在前进后退到该页面时，就会重新发送请求。
我们前端人员自己控制的话需要在头部加相关的meta标签
```
<meta http-equiv="cache-control" content="max-age=0" />
<meta http-equiv="cache-control" content="no-cache" />
<meta http-equiv="expires" content="0" />
<meta http-equiv="expires" content="Tue, 01 Jan 1980 1:00:00 GMT" /> //设置页面过期时间
<meta http-equiv="pragma" content="no-cache" /> //
```
　或者设置响应头
```
res.header('Cache-Control', 'private, no-cache, no-store, must-revalidate');
res.header('Expires', '-1');
res.header('Pragma', 'no-cache');
```
相比较而言，在header中设置比设置meta标签更为靠谱一些，但是也存在两者都没效果的情况。
这样看上去，浏览器历史纪录和HTTP缓存是有关系的。事实上不是这样的，参考　You Do Not Understand Browser History，里面的结论是：
> The browser does not respect HTTP caching rules when you click the back button.(当你点击返回按钮的时候浏览器不会遵循http缓存机制)

看来浏览器也是很任性的…

#### bfcache 和 page cache
bfcache 和 page cache是webkit和firefox有一项优化技术。可参考：
1. <font color=#ff0000>Firefox</font>将其称为 <font color=#1C86EE>“Back-Forward Cache”</font> 或<font color=#1C86EE>“bfcache”</font>

2. <font color=#ff0000>Opera</font>则称其为<font color=#1C86EE>“Fast History Navigation”</font>
3. 在 <font color=#ff0000>WebKit</font>的实现中我们称其为<font color=#1C86EE>“Page Cache”</font>， 以避免与“Back/Forward List.”的混淆。



这里简单介绍一下：

对于支持bfcache/page cache的浏览器，“后退”不光意味着html/js/css/接口等动静态资源不会重新请求，连JS也不会重新执行。因为前一个页面没有被unload，最后<font color=#1C86EE>离开时的状态和数据被完整地保留在内存中</font>，发生后退时浏览器直接把“离开时”的页面状态展示给用户。

就好像，你在页面A，点击链接要在当前窗口打开页面B，这时浏览器在不卸载页面A的情况下去加载页面B。这时你看到的是页面B，那页面A呢？ 页面A只是被隐藏了，JS暂停执行（我们称之为pagehide）。如果用户点击“返回”，浏览器快速把页面B隐藏，并把页面A再显示出来，JS恢复执行（我们称之为页面B pagehide, 页面A pageshow）。

 <font color=#ff0000>pageshow</font>事件在页面全新加载并展现时也会触发，与从bfcache/page cache中加载并展示的区分依据是pageshow event 的<font color=#1C86EE>persisted</font>属性。如果从缓存获取那么persisted的值就为true。

实际观察中发现，一些移动端浏览器的 pageshow event 的 persisted 属性值一直是 false ，尽管页面看上去确实是从bfcache/page cache中加载展示。（另外一个理论上的point，页面绑定了 <font color=#1C86EE>unload</font> 事件时，不再会进入bfcache/page cache，一些移动端浏览器上观察来看实际上也不是这样的）。

可行的方案是：<font color=#ff0000>JS监听pagehide/pageshow来阻止页面进入bfcache/page cache，或者监测到页面从bfcache/page cache中加载展现时进行刷新。</font>

参考：
Forcing mobile Safari to re-evaluate the cached page when user presses back button。

示例代码：

```
window.onpageshow = function(event) {
    if (event.persisted) {
        window.location.reload()
    }
};
```

#### 安卓webview cache的问题

安卓webview，包括安卓微信里面内嵌的QQ X5内核浏览器，都存在后退不会重新请求页面的问题，无论页面是否禁用缓存。上面的pageshow/pagehide方案也都失效。可行的方法，如下：

1. 给每个需要后退刷新的页面上加一个hidden input，存储页面在服务端的生成时间，作为页面的服务端版本号。
2. 并附加一段JS读取读取页面的版本号，同时也记录在浏览器/webview本地（cookie/localStorage/sessionStorage）进行存储，作为本地版本号。
3. JS检查页面的服务端版本号和本地存储中的版本号，如果服务端版本号大于本地存储中版本号，说明页面是从服务端重新生成的；否则页面就是本地缓存的，即发生了后退行为。
4. JS在监测到后退时，强制页面重新从服务端获取。

该方案的前提是浏览器在向server请求页面时，每次都用jsp重新生成html。需要页面本身有禁用缓存的配置。

方案的代码示例如下：
```
<!-- 安卓webview 后退强制刷新解决方案 START -->
<jsp:useBean id="now" class="java.util.Date" />
<input type="hidden" id="SERVER_TIME" value="${now.getTime()}"/>
<script>
//每次webview重新打开H5首页，就把server time记录本地存储
var SERVER_TIME = document.getElementById("SERVER_TIME");
var REMOTE_VER = SERVER_TIME && SERVER_TIME.value;
if(REMOTE_VER){
    var LOCAL_VER = sessionStorage && sessionStorage.PAGEVERSION;
    if(LOCAL_VER && parseInt(LOCAL_VER) >= parseInt(REMOTE_VER)){
        //说明html是从本地缓存中读取的
        location.reload(true);
    }else{
        //说明html是从server端重新生成的，更新LOCAL_VER
        sessionStorage.PAGEVERSION = REMOTE_VER;
    }
}
</script>
<!-- 安卓webview 后退强制刷新解决方案 END -->
```

### 三、总结
1. PC浏览器，设置禁用页面缓存header即可实现后退刷新
2. 支持bfcache/page cache的移动端浏览器，JS监听pageshow/pagehide，在检测到后退时强制刷新
3. 在前2个方案都不work的情况下，可以在HTML中写入服务端页面生成版本号，与本地存储中的版本号对比判断是否发生了后退并使用缓存中的页面

### 四、花絮

1. 后退时表单控件用户输入内容

后退时，有些浏览器还会把表单控件中用户输入内容给记录并恢复。可以通过给form或者input添加<font color=#1C86EE>autocomplete="off"</font>属性解决。如果不work，参考chrome和firefox中autocomplete属性失效的解决方法
```
1.form中没有input[type=password]，autocomplete="off"将起作用
2.去掉form，设置input[type=text]的autocomplete也起作用
```
2. 从webview的角度看缓存的问题

关于安卓微信webview缓存的问题，X5内核咨询汇总里面有描述：
```
问：浏览器缓存静态页面，如果这个静态页面重新生成了之后，还是原来的地址，用户看到的是不是就还是老页面了
回答：浏览器对页面这种主资源没有做缓存。只对子资源，图片，JS，CSS等做了缓存，而且缓存都是有一个新旧对比的，这个主要是服务器来控制哪些可以缓存哪些不能缓存。会有304 这种判断。
```

从webview层面来看待缓存问题：
```
缓存模式(5种)
LOAD_CACHE_ONLY: 不使用网络，只读取本地缓存数据
LOAD_DEFAULT: 根据cache-control决定是否从网络上取数据。
LOAD_CACHE_NORMAL: API level 17中已经废弃, 从API level 11开始作用同LOAD_DEFAULT模式
LOAD_NO_CACHE: 不使用缓存，只从网络获取数据.
LOAD_CACHE_ELSE_NETWORK，只要本地有，无论是否过期，或者no-cache，都使用缓存中的数据。
如：www.taobao.com的cache-control为no-cache，在模式LOAD_DEFAULT下，无论如何都会从网络上取数据，如果没有网络，就会出现错误页面；在LOAD_CACHE_ELSE_NETWORK模式下，无论是否有网络，只要本地有缓存，都使用缓存。本地没有缓存时才从网络上获取。
www.360.com.cn的cache-control为max-age=60，在两种模式下都使用本地缓存数据。
总结：根据以上两种模式，建议缓存策略为，判断是否有网络，有的话，使用LOAD_DEFAULT，无网络时，使用LOAD_CACHE_ELSE_NETWORK。
```
看上去修改webview的配置就能轻松愉快地解决问题的。只是迫于app版本发布缓慢的现实，才从JS和网页的层面来解决这个问题。