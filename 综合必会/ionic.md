#### android 平台常见问题
- ionic cordova platform add android@7.0.0
- ionic cordova build android
- open android studio
- open project
- 提示升级android到3.14，升级gradle到4.4
- 设置android sdk
- 设置gradle 地址
- 错误：Configuration 'compile' is obsolete and has been replaced with 'implementation' and 'api'.It will be removed at the end of 2018. For more information see: http://d.android.com/r/tools/update-dependency-configurations.html
    > 将build.gradle(Module.app)中dependencies的compile换成implementation 即可

    > https://blog.csdn.net/bencheng06/article/details/82049055
- ionic cordova build android 失败
    > 报错： Minimum supported Gradle version is 4.4. Current version is 4.1. If using the gradle wrapper, try editing the distributionUrl in /Users/mr.yang/Desktop/appzhidao/gradle/wrapper/gradle-wrapper.properties to gradle-4.4-all.zip
    - 打开android studio -> 找到项目-> Gradle Script -> gradle-wrapper
    - ionic 项目中 -> platform -> android -> gradle -> wrapper ->gradle-wrapper.properties
