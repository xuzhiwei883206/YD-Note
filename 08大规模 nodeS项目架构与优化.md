#### Node
- Node.js的本质是一个Javascript的解释器
- Node.js是Javascript的运行环境
- Node.js是一个服务器程序
- Node.js本身是使用的V8引擎
- Node不是web服务器
- 对于在html当中，浏览器就是充当的解释器
- 解决回调地狱的方法，promise
- supervisor 热启动

    > sudo npm install supervisor  -g

    > supervisor 文件名

<hr>

#### node架构

- nginx拦着（一层负载） -> 分配到具体的机器 -> 具体机器内部pm2启动多核（两层负载）

> node是单线程（也可以多线程），被pm2开启多核后，4核的cpu机器上就变成4个单线程，吞吐量变成四倍 pm2的线程之间可以进行相互**数据交互**，要是一个用户在下单，这时候一个线程挂了，其他线程还可以继续完成下面的请求工作，因为他们的数据是共享的<br>
> 并发超过了**QPS**就会完了，并发大了就该加机器了<br>
> 流量就是并发网站能不能吃得消，比如你的网站页面是4KB，1000万用户进来，那你的带宽够不够，所以开始的时候都要进行预算<br>

<font color=red>流量具体怎么计算，按用户请求获取的文件大小吗？</font>