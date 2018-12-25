
### 简介
<p style="text-align: center;"><img src='./imgs/rollup/1.jpeg'></p>

首先简单介绍一下rollup.JS。根据官方的介绍，rollup.js是一个<font color=#ff0000>模块打包工具</font>，可以帮助你从一个入口文件开始，将所有使用到的模块文件都打包到一个最终的发布文件中（极其适合构建一个工具库，这也是我选择用rollup来打包的原因）。

rollup.js有两个重要的特性，其中一个就是它使用ES6的模块标准，这意味着你可以直接使用import和export而不需要引入babel（当然，在现在的项目中，babel可以说是必用的工具了）。

rollup.js的另一个重要特性叫做<font color=#ff0000>'tree-shaking'</font>，这个特性可以帮助你将无用代码（即没有使用到的代码）从最终的生成文件中删去。举个例子，我在A.js文件中定义了A1和A2两个方法，同时在B文件中引入了这两个方法，但是在B文件中只引入了A文件中的A1方法，那么在最后打包B文件时，rollup就不会将A2方法引入到最终文件中。（这个特性是基于ES6模块的静态分析的，也就是说，只有export而没有import的变量是不会被打包到最终代码中的）

### 实例

参考：https://segmentfault.com/a/1190000010628352?utm_source=tag-newest

补充阅读：[从webpack到rollup](http://www.ayqy.net/blog/%E4%BB%8Ewebpack%E5%88%B0rollup/)