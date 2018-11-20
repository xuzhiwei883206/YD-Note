#### Js 变量声明提升和函数声明提升 https://www.cnblogs.com/xiaohuochai/p/5700590.html
1. Js代码分为两个阶段：**编译阶段** 和 **执行阶段**
    1. Js代码的编译阶段会找到 **所有的声明** ，并用合适的作用域将它们关联起来，这是词法作用域的核心内容包括变量声明(var a)和函数声明(function a(){})在内的所有声明都会在代码被执行前的编译阶段首先被处理
    2. 过程就好像变量声明和函数声明从他们代码中出现的位置被移动到执行环境的顶部，这个过程就叫做 **提升**
    3. 只有声明操作会被提升，赋值和逻辑操作会被留在原地等待执行

2. 变量声明
    1. Js编译器会把变量声明看成两个部分分别是 **声明操作**(var a)和 **赋值操作**(a=2)
    2. 声明操作在编译阶段进行，声明操作会被提升到执行环境的顶部，值是undefined(表示未初始化)赋值操作会被留在原地等待执行阶段
        ```
        var a = 2;

        function foo() {
            console.log(a); //undefined
            var a = 10;
            console.log(a); //10
        }

        foo();

        // 相当于

        var a = 2;

        function foo() {
            var a;
            console.log(a); //undefined
            a = 10;
            console.log(a); //10
        }

        foo();
        ```

3. 函数声明
    1. 定义函数有两种方式：函数声明和函数表达式
    2. 函数声明提升会在编译阶段把声明和函数体整体都提前到执行环境顶部，所以我们可以在函数声明之前调用这个函数
    3. 函数表达式，其实就是变量声明的一种，声明操作会被提升到执行环境顶部，并赋值undefined。赋值操作被留在原地等到执行。
        ```
        // 函数声明

        foo(); //100

        function foo(){
            console.log(100);
        }
        ```

        ```
        // 函数表达式
        baz(); // TypeError: baz is not a function

        var baz = function(){
            console.log(200);
        }

        //相当于

        var baz;

        baz();

        baz = function() {
            console.log(200);
        };
        ```
4. 控制语句
    1. <font color=red>Js中使用函数级作用域，不存在块级作用域。所有普通块中的声明都会被提升到顶部，所以控制语句对声明的控制就显得完全没有效果</font>
        ```
        if (false) {
            var a = 10;
        }

        console.log(a); //undefined

        // 相当于

        var a;
        if (false) {
            a = 10;
        }

        console.log(a) //undefined
        ```
    2. 奇怪的函数声明
        ```
        console.log(a); //undefined

        if (false) {
            function a() {
                console.log(100);
            }
        }

        a(); //TypeError: a is not a function 理论上应该是100
        ```
        > 奇怪吧？？函数提升发生在所有代码执行之前，所以尽管a函数的定义过程写在了if分支中，但是理论上，它是不会影响函数声明提升的,在新版本的浏览器中会出现此问题，旧版本的浏览器中会在控制台中打印出100这也提醒了我们尽量不要在控制语句中进行声明，会造成很多无法预知的bug

5. 函数优先
    1. 提升操作会优先进行函数的声明

    2. 函数会首先被提升然后才是变量，重复的变量声明会被忽略，只剩下赋值操作，多个函数声明可以进行覆盖声明的顺序是这样的：

        1. 找到所有的函数声明，初始化函数体，如有同名的函数则会进行覆盖

        2. 查找变量声明，初始化为undefined，如果已经存在同名的变量，就什么也不做直接略过
            ```
            // 1
            foo(); //200

            function foo() {
                console.log(100);
            }

            function foo() {
                console.log(200);
            }

            // 2
            console.log(foo); //function foo(){...}

            function foo(){
                console.log(200);
            }
            var foo = 100;
            ```
6. [注意]函数表达式的名称只能在函数体内部使用，而不能在函数体外部使用
    ```
    var bar;
    var foo = function bar(){
        console.log(1);
    };
    bar();//TypeError: bar is not a function
    ```
7. 函数覆盖
    1. 函数声明和变量声明都会被提升。但是，函数声明会覆盖变量声明(变量没有值为undefined时)
        ```
        var a;
        function a(){}
        console.log(a);//'function a(){}'
        ```
    2. 但是，如果变量存在赋值操作，则最终的值为变量的值
        ```
        var a=1;
        function a(){}
        console.log(a);//1
        ```

        ```
        var a;
        function a(){};
        console.log(a);//'function a(){}'
        a = 1;
        console.log(a);//1
        ```
8. [注意]变量的重复声明是无用的，但函数的重复声明会覆盖前面的声明(无论是变量还是函数声明)
    1. 变量的重复声明无用
        ```
        var a = 1;
        var a;
        console.log(a);//1
        ```
    2. 由于函数声明提升优先于变量声明提升，所以变量的声明无作用
        ```
        var a;
        function a(){
            console.log(1);
        }
        a();//1
        ```
    3. 后面的函数声明会覆盖前面的函数声明
        ```
        a();//2
        function a(){
            console.log(1);
        }
        function a(){
            console.log(2);
        }
        ```