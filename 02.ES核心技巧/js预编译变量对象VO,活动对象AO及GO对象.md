简单谈一下js的预编译过程。
```
function test(a,b){

    console.log(a)

    var a=123;

     function a(){}

    console.log(b)

    var b=234;

    console.log(b)

    function b(){}

    console.log(a)

    var b=function(){}

    console.log(b)

}

test(1)
```
我先说一下打印结果，结合实例给大家讲一下我对预编译的理解。

fn-a  fn-b 234 123 fn-b

首先js的执行过程会先扫描一下整体语法语句，如果存在逻辑错误或者语法错误，那么直接报错，程序停止执行，没有错误的话，开始从上到下解释一行执行一行。

但是js中首先你要清楚变量声明和函数声明是会提升的。

计算机执行到test()函数时，在执行的前一刻会创建一个ao对象。
```
ao{

}
```
这是第一步，创建一个ao对象，第二步是将函数内所有的形参和变量声明储存到ao对象中，value为undefined；
```
ao{

    a:undefined，

    b:undefined

}
```
第三步将形参和实参进行统一。
```
ao{

    a:1,

    b:undefined

}
```
第四步将所有的函数声明的函数名作为ao对象中的key，函数整体内容作为value，存储到ao对象中
```
ao{

    a:function(){},

    b:function(){}

}
```
之后开始打印的a，其实打印的就是ao对象中的a，然后a赋值123，在打印肯定就是123了，里面细节有很多，但是整体步骤就是这些，适合有点基础的前端看，用于给大家巩固一下ao对象的执行过程，go对象同理，只是<font color=#ff0000>go指向的是window对象，其实window对象也就是go对象的意思了，只是少了形参和实参统一的步骤罢了</font>。



#### 变量对象VO

变量对象VO是与执行上下文相关的特殊对象,用来存储上下文的函数声明，函数形参和变量。在global全局上下文中，变量对象也是全局对象自身，在函数上下文中，变量对象被表示为活动对象AO。

变量对象VO存储上下文中声明的以下内容
```
{
函数声明FD(如果在函数上下文中),—-不包含函数表达式
函数形参function arguments,
变量声明–注意b=10不是变量，但是var b = 10;是变量，有变量声明提升
alert(a); // undefined
alert(b); // “b” 没有声明

b = 10;
var a = 20;
}
```
```
var a = 10;

function test(x) {
  var b = 20;
};

test(30);

// 全局上下文的变量对象
VO(globalContext) = {
  a: 10,
  test: <reference to function>
};

// test函数上下文的变量对象
VO(test functionContext) = {
  x: 30,
  b: 20
};
```

#### 变量对象VO分类

全局上下文的变量对象VO，函数上下文的变量对象VO
```
//全局上下文的变量对象VO就是全局对象
VO(globalContext) === global;
```
#### 活动变量AO

<font color=#1C86EE>当函数被调用后，这个特殊的活动对象就被创建了。</font>它包含普通参数与特殊参数对象（具有索引属性的参数映射表）。活动对象在函数上下文中作为变量对象VO使用。

在函数执行上下文中，VO是不能直接访问的，此时由活动对象(activation object,缩写为AO)扮演VO的角色。
```
VO(functionContext) === AO;
```
Arguments对象是活动对象的一个属性，它包括如下属性：
- callee — 指向当前函数的引用
- length — 真正传递的参数个数
- properties-indexes (字符串类型的整数) 属性的值就是函数的参数值(按参数列表从左到右排列)。
- properties-indexes 内部元素的个数等于arguments.length. properties-indexes的值和实际传递进来的参数之间是共享的。
```
function foo(x, y, z) {

  // 声明的函数参数数量arguments (x, y, z)
  alert(foo.length); // 3

  // 真正传进来的参数个数(only x, y)
  alert(arguments.length); // 2

  // 参数的callee是函数自身
  alert(arguments.callee === foo); // true

  // 参数共享

  alert(x === arguments[0]); // true
  alert(x); // 10

  arguments[0] = 20;
  alert(x); // 20

  x = 30;
  alert(arguments[0]); // 30

  // 不过，没有传进来的参数z，和参数的第3个索引值是不共享的

  z = 40;
  alert(arguments[2]); // undefined

  arguments[2] = 50;
  alert(z); // 40

}

foo(10, 20);
```
处理上下文代码的2个阶段

进入执行上下文和执行代码

进入执行上下文：
变量是进入上下文阶段放入VO中，也就是变量声明提升并且变量声明顺序上是在函数声明和形参声明后
```
if (true) {
  var a = 1;
} else {
  var b = 2;
}

alert(a); // 1
alert(b); // undefined,不是b没有声明，而是b的值是undefined
```

<font color=#ff0000>变量声明在顺序上跟在函数声明和形式参数声明之后，而且在这个进入上下文阶段，变量声明不会干扰VO中已经存在的同名函数声明或形式参数声明</font>
```
alert(x); // function

var x = 10;
alert(x); // 10

x = 20;

function x() {};

alert(x); // 20
```
```
function test(a, b) {
  var c = 10;
  function d() {}
  var e = function _e() {};
  (function x() {});
}

test(10); // call
当进入带有参数10的test函数上下文时，AO表现为如下：
//AO里并不包含函数“x”。这是因为“x” 是一个函数表达式(FunctionExpression, 缩写为 FE) 而不是函数声明，函数表达式不会影响VO
AO(test) = {
  a: 10,
  b: undefined,
  c: undefined,
  d: <reference to FunctionDeclaration "d">
 e: undefined
};
```