参考：https://www.cnblogs.com/myzy/p/6515215.html

1. 安装
    1. window(安装完ruby之后)
    > gem install sass
    2. mac(MAC OSX系统自带ruby环境)
    > sudo gem install sass
2. 嵌套规则 (Nested Rules)
Sass 允许将一套 CSS 样式嵌套进另一套样式中，内层的样式将它外层的选择器作为父选择器，例如：
```
#main p {
  color: #00ff00;
  width: 97%;

  .redbox {
    background-color: #ff0000;
    color: #000000;
  }
}
```
嵌套功能避免了重复输入父选择器，而且令复杂的 CSS 结构更易于管理
3. 父选择器 & (Referencing Parent Selectors: &)
在嵌套 CSS 规则时，有时也需要直接使用嵌套外层的父选择器，例如，当给某个元素设定 hover 样式时，或者当 body 元素有某个 classname 时，可以用 & 代表嵌套规则外层的父选择器。
```
a {
  font-weight: bold;
  text-decoration: none;
  &:hover { text-decoration: underline; }
  &-sidebar { border: 1px solid; } //生成复合选择器
  body.firefox & { font-weight: normal; }
}
```
4. 属性嵌套 (Nested Properties)
有些 CSS 属性遵循相同的命名空间 (namespace)，比如 font-family, font-size, font-weight 都以 font 作为属性的命名空间。为了便于管理这样的属性，同时也为了避免了重复输入，Sass 允许将属性嵌套在命名空间中，例如：
```
.funky {
  font: {
    family: fantasy;
    size: 30em;
    weight: bold;
  }
}
```
编译为
```
.funky {
  font-family: fantasy;
  font-size: 30em;
  font-weight: bold; }
```
5. 变量 $ (Variables: $)
$width: 5em;
