
### 简介
<p style="text-align: center;"><img src='./imgs/rollup/1.jpeg'></p>

首先简单介绍一下rollup.JS。根据官方的介绍，rollup.js是一个<font color=#ff0000>模块打包工具</font>，可以帮助你从一个入口文件开始，将所有使用到的模块文件都打包到一个最终的发布文件中（极其适合构建一个工具库，这也是我选择用rollup来打包的原因）。

rollup.js有两个重要的特性，其中一个就是它使用ES6的模块标准，这意味着你可以直接使用import和export而不需要引入babel（当然，在现在的项目中，babel可以说是必用的工具了）。

rollup.js的另一个重要特性叫做<font color=#ff0000>'tree-shaking'</font>，这个特性可以帮助你将无用代码（即没有使用到的代码）从最终的生成文件中删去。举个例子，我在A.js文件中定义了A1和A2两个方法，同时在B文件中引入了这两个方法，但是在B文件中只引入了A文件中的A1方法，那么在最后打包B文件时，rollup就不会将A2方法引入到最终文件中。（这个特性是基于ES6模块的静态分析的，也就是说，只有export而没有import的变量是不会被打包到最终代码中的）


rollup在打包JS上是一个十分快捷方便的工具，但和webpack相比，他的生态圈还是不够强大，对于大型web工程的适应度相对不足

rollup的优点在于方便的配置，天然的ES6模块支持让我们可以直接使用import和export语法，在打包JS上，不实现自己的模块机制，而是使用目前常见的模块规范有助于其他工具（例如requirejs）来引用打包文件；tree-shaking的特性也有助于减少代码量，因此我认为rollup比起构建应用工程项目，更适合用来构建一个JS库或node模块

我将上面介绍的插件集合到一起，添加了测试的支持，制作了一个较为完整的rollup工程模板。放在rollup-project-template目录下，需要的同学可以自取（你也可以增加或删除任意你需要的模块，来组建属于你自己的rollup项目模板）

[rollup插件合集](https://rollupjs.org/guide/en#plugins)

[如何通过 Rollup.js 打包 JavaScript —— 知乎专栏](https://zhuanlan.zhihu.com/p/28096758)

[demo](https://github.com/kainstar/rollup-demos)

### 实例

参考：https://segmentfault.com/a/1190000010628352?utm_source=tag-newest

补充阅读：[从webpack到rollup](http://www.ayqy.net/blog/%E4%BB%8Ewebpack%E5%88%B0rollup/)