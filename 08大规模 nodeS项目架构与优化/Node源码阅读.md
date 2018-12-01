#### 如何开始 先运行 
1. git clone https://github.com/nodejs/node.git Node
2. cd Node
3. ./configure&&make
4. make install
5. make test

#### 源文件分为三类  (下面的2和3是通过V8这个库串起来的)
1. 纯JavaScript写的核心模块（不用读c++）
2. 带NativeBinding的JavaScript核心模块（用到一些C++写的插件，Js加密模块基于openssl，所以不可能通过纯粹js，他要通过require了一个openssl的东西，再把他加载到js里面 ）
3. C++文件


#### 文件夹
lib（基本上就是我们的js文件，包括纯粹的js）
src（c++写的代码）


#### 提交
- branch name:fix/gh-{num}
- commit merssage:"module name:description"
- test/parallel/test-*.js