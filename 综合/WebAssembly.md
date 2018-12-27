WebAssembly

使用WebAssembly，可以更快地在 web 应用上运行代码。这里有 几个 WebAssembly 代码运行速度比 JavaScript 高效的原因。

- 文件加载 - WebAssembly 文件体积更小，所以下载速度更快。
- 解析 - 解码 WebAssembly 比解析 JavaScript 要快
- 编译和优化 - 编译和优化所需的时间较少，因为在将文件推送到服务器之前已经进行了更多优化，JavaScript 需要为动态类型多次编译代码
- 重新优化 - WebAssembly 代码不需要重新优化，因为编译器有足够的信息可以在第一次运行时获得正确的代码
- 执行 - 执行可以更快，WebAssembly 指令更接近机器码
- 垃圾回收 - 目前 WebAssembly 不直接支持垃圾回收，垃圾回收都是手动控制的，所以比自动垃圾回收效率更高。


参考：https://www.jianshu.com/p/bff8aa23fe4d

参考：https://www.ibm.com/developerworks/cn/web/wa-lo-webassembly-status-and-reality/index.html

