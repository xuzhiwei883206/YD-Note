####起手
ionic start myApp tabs
ionic serve
- 添加平台
ionic cordova platform add android
ionic cordova platform add ios
- 删除平台
ionic cordova platform remove android
ionic cordova platform remove ios
- 在模拟器中启动项目
ionic cordova emulate android　　//android
ionic cordova emulate ios //ios
- 通常在开发当中我们需要用的时时刷新(livereload)所以在模拟器中启动项目的时候需要添加 --livereload 命令
ionic cordova emulate android --livereload
ionic cordova emulate ios --livereload
- 除此之外我们在开发当中需要看到控制台输出(console.log之类的)所以在模拟器中启动项目的时候需要添加-c命令(--console)结合--livereload 命令可以把命令简化成 -lc
ionic cordova emulate android -lc    //android
ionic cordova emulate ios -lc //ios
#### android 平台常见问题
- ionic cordova platform add android@7.0.0
- ionic cordova build android
- open android studio
- open project
- 提示升级android到3.14，升级gradle到4.4
- 设置android sdk
- 设置gradle 地址
- 错误：Configuration 'compile' is obsolete and has been replaced with 'implementation' and 'api'.It will be removed at the end of 2018. For more information see: http://d.android.com/r/tools/update-dependency-configurations.html
    > 将build.gradle(Module.app)中dependencies的 compile 换成 implementation 即可

    > https://blog.csdn.net/bencheng06/article/details/82049055
- ionic cordova build android 失败
    > 报错： Minimum supported Gradle version is 4.4. Current version is 4.1. If using the gradle wrapper, try editing the distributionUrl in /Users/mr.yang/Desktop/appzhidao/gradle/wrapper/gradle-wrapper.properties to gradle-4.4-all.zip
    - 打开android studio -> 找到项目-> Gradle Script -> gradle-wrapper
    - ionic 项目中 -> platform -> android -> gradle -> wrapper ->gradle-wrapper.properties



#### 腾讯地图跨域
```
    let testurl = 'https://apis.map.qq.com/ws/coord/v1/translate?locations=39.12,116.83;30.21,115.43&type=3&key=QIOBZ-PSSWJ-K7KFM-FE6GM-TQOOJ-UWFKE&get_poi=0&output=jsonp&callback=JSONP_CALLBACK'

    this.jsonp.get(testurl).subscribe(function (data) {
      console.log(data);
    }, function (err) {
      console.log(err);
    });

```
```
    var data:any = {
      locations: "39.12,116.83;30.21,115.43",
      /*换成自己申请的key*/
      key: "QIOBZ-PSSWJ-K7KFM-FE6GM-TQOOJ-UWFKE",
      type:3,
      get_poi: 0
    }
    var url = "https://apis.map.qq.com/ws/coord/v1/translate?";
    data.output = "jsonp";
    $.ajax({
      type: "get",
      dataType: 'jsonp',
      data: data,
      jsonp: "callback",
      jsonpCallback: "QQmap",
      url: url,
      success: function (json) {
        /*json对象转为文本 var aToStr=JSON.stringify(a);*/
        var toStr = JSON.stringify(json);
        console.log(toStr);
      },
      error: function (err) { alert("服务端错误，请刷新浏览器后重试") }
    })
```