iphoneX的“刘海”为相机和其他组件留出了空间，同时在底部也留有可操作区域。那么网站边尴尬了~被限制在了这样的“安全区域”内，两边会出现一道白条。解决的方案是：
第一步：设置网页在可视窗口的布局方式
ios11新增 viweport-fit 属性，使得页面内容完全覆盖整个窗口：
> <meta name="viewport" content="width=device-width, initial-scale=1.0, viewport-fit=cover">
第二步：页面主体内容限定在安全区域内
env() 和 constant()ios11新增特性
● safe-area-inset-left：安全区域距离左边边界距离
● safe-area-inset-right：安全区域距离右边边界距离
● safe-area-inset-top：安全区域距离顶部边界距离
● safe-area-inset-bottom：安全区域距离底部边界距离

这里我们只需要关注 safe-area-inset-bottom 这个变量，因为它对应的就是小黑条的高度（横竖屏时值不一样）。
```
body {
    padding-bottom: constant(safe-area-inset-bottom);
    padding-bottom: env(safe-area-inset-bottom);
}
```
第三步：fixed 元素的适配
● 类型一：fixed 完全吸底元素（bottom = 0）
```
{
    padding-bottom: constant(safe-area-inset-bottom);
    padding-bottom: env(safe-area-inset-bottom);
}
```
● 类型二：fixed 非完全吸底元素（bottom ≠ 0），比如 “返回顶部”、“侧边广告” 等
```
{
    margin-bottom: constant(safe-area-inset-bottom);
    margin-bottom: env(safe-area-inset-bottom);
}
```
第四步：如果我们只希望 iPhoneX 才需要新增适配样式，我们可以配合 @supports 来隔离兼容样式
```
@supports (bottom: constant(safe-area-inset-bottom)) or (bottom: env(safe-area-inset-bottom)) {
    div {
        margin-bottom: constant(safe-area-inset-bottom);
        margin-bottom: env(safe-area-inset-bottom);
    }
}
```