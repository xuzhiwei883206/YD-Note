[MDN]:https://developer.mozilla.org/zh-CN/docs/Web/CSS/Reference "MDN Css参考查找文档"

[Github]:https://github.com "Github"
#### 学习路径

[圣杯]:/你不知道的css合集/布局/圣杯.md "圣杯布局"

[双飞翼]:你不知道的css合集/布局/双飞翼.md "双飞翼布局"
[Flex]:你不知道的css合集/布局/Flex.md "Flex"


* [MDN]
* [Github]

#### 基础

1. 布局
    - pc端布局至少要知道[双飞翼]、[圣杯]
        * `圣杯布局`是**Kevin Cornell**在2006年提出的一个布局模型概念，在国内最早是由淘宝UED的工程师（传说是**玉伯**）改进并传播开来，在中国也有叫法是`双飞翼布局`
    - 移动端布局要知道
        - [Flex]是什么
        - 为什么要用[Grid]布局,Grid解决了以前display:table的什么问题
        - Flex布局有什么坑,有什么解决办法,为什么要有Flex
        - 1px的问题，view
        - meta
        - viewport
2. 垂直居中有多少种解决办法
3. 伪类
4. 项目中几倍图片是怎么处理的
5. 选择器
6. 穿透怎么解决
7. css module

* 3D全景VR网站：https://720yun.com/
* 比较好的H5网站：http://www.h5doo.com/
* 手机陀螺仪
    > z轴为轴，alpha的作用域为(0,360)°<br>
    > x轴为轴，beta的作用域为(-180,180)°<br>
    > y轴为轴，gamma的作用域为(-90,90)<br>
    * 罗盘校准

        ```
        window.addEventListener("compassneedcalibration",function(event){
            alert("您的罗盘需要校准");
            event.preventDefault();
        },true)
        ```
    * 重力加速度

        ```
        window.addEventListener("devicemotion",function(event){
            //处理event.acceleration
            //x(y,z):设备在x(y,z)方向上的移动加速度值
            //event.accelerationIncludingGravity
            //考虑了重力加速度后设备在x(y,z)
            //event.rotationRate
            //alpha,beta,gamma:设备绕x,y,z轴旋转的角度
        },true)
        ```
    * 摇一摇
        ```
        var speed = 30;
        var x=y=z=lastX=lastY=lastZ=0;
        function deviceMotionHandler(event){
            var acceleration = event.accelerationIncludingGravity;
            x=acceleration.x;
            y=acceleration.y;
            z=acceleration.z;
            if(Math.asb(x-lastX)>speed || Math.asb(y-lastY)>speed || Math.asb(z-lastZ)>speed){
                //简单的摇一摇触发代码
                alert(1);
            }
        }
        ```

* 球面投影：在三维空间，每个3D模型都等同于一个多面体（即3D模型只能由不能弯曲的平面组成）。你只能以一个正多边形表示圆：边越多圆越“完美”。

* Touch集合
    * touchstart
    * touchmove
    ```
    view.on("touchstart",function(e){
        x1 = e.targetTouches[0].pageX;//$(this).offset().left;
        y1 = e.targetTouches[0].pageY;//$(this).offset().top;
    })
    view.on("touchmove",function(e){
        var dist_x=x2-x1,
            dist_y=y2-y1,
            deg_x=Math.atan2(dist_y,perspective)/Math.PI*180,
            deg_y=Math.atan2(dist_x,perspective)/Math.PI*180,
            i,
            c_x_deg+=deg_x,
            c_y_deg+=deg_y;
        cube.css("transform",'rotateX('+deg_x+'deg)rotate('+deg_y+'deg)');
    })
    ```
* 没有自己手写3D的能力可以去github上搜一些css3的库，比如css3D-engine
* 也有一些js的库，比如parallax



