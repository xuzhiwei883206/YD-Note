#### execCommand 执行命令

当将HTML文档切换成设计模式时，就会暴露出 execcommand 方法，然后我们可以通过使用这个方法来执行一些命令，比如复制，剪切，修改选中文字粗体、斜体、背景色、颜色，缩进，插入图片等等等等。

- 用法

用法也很简单，这里简单介绍几个，详细的介绍大家可以去MDN上看看。

这个API接受三个参数，第一个是要执行的命令，第二个参数mdn上说是Boolean用来表示是否展现用户界面，但我也没测试出来有什么不同，第三个参数就是使用对应命令所需要传递的参数。
```
// 一般不会直接去操作我们本身的HTML文档，可以去插入一个iframe然后通过contentDocument来获取、操作iframe中的HTML文档。
let iframe = document.createElement('ifram');
let doc = iframe.contentDocument;
// 首先要将HTML文档切换成设计模式
doc.designMode = 'on';

// 然后就可以使用execCommand 这个命令了；
// 执行复制命令，复制选中区域
doc.execCommand('copy')
// 剪切选中区域
doc.execCommand('cut')
// 全选
doc.execCommand('selectAll')
// 将选中文字变成粗体，同时接下来输入的文字也会成为粗体，
doc.execCommand('bold')
// 将选中文字变成斜体，同时接下来输入的文字也会成为斜体，
doc.execCommand('italic')
// 设置背景颜色，，比如设置背景色为红色，就传入 'red'即可
doc.execCommand('backColor',true,'red')
```
- 用处

我用这些命令简单的写了一个富文本的demo，大家可以看一下Demo，效果如下：

![富文本](./execCommand/1.git)


浏览器支持度
