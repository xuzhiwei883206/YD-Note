**async** 是“异步”的简写，而 **await** 可以认为是 async wait 的简写。

#### async 起什么作用

这个问题的关键在于，async 函数是怎么处理它的返回值的！

async 函数返回的是一个 Promise 对象,如果在函数中 return 一个直接量，async 会把这个直接量通过 Promise.resolve() 封装成 Promise 对象。

#### await 到底在等啥

await 等待的是一个表达式，这个表达式的计算结果是 Promise 对象或者其它值（换句话说，就是没有特殊限定）。

如果它等到的是一个 Promise 对象，await 就忙起来了，它会阻塞后面的代码，等着 Promise 对象 resolve，然后<font color=red>得到 resolve 的值</font>，作为 await 表达式的运算结果。

参考：https://segmentfault.com/a/1190000007535316