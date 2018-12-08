#### 配置adb 环境
```
maleideMacBook-Pro:~ malei$ cd $HOME  //回到主目录
maleideMacBook-Pro:~ malei$ touch .base_profile  //创建文件
maleideMacBook-Pro:~ malei$ open -e .bash_profile  //编辑文件
```
```
export PATH=${PATH}:/Users/malei/Library/Android/sdk/platform-tools  //该路径可以通过as来查看
export PATH=${PATH}:/Users/malei/Library/Android/sdk/tools

maleideMacBook-Pro:~ malei$ source .bash_profile //关闭并刷新文件
maleideMacBook-Pro:~ malei$ adb devices //测试是否连接成功
```

adb shell

adb install localapkurl -r //覆盖安装

#### 基本指令

1）查看连接的设备

    adb devices

2）查看设备的日志

    adb logcat

3）重启设备

    adb reboot

4)安装一个apk

    adb install /Users/storm/temp/demo.apk

5）卸载一个apk

    adb uninstall <package>

第三步：当我们的app crash的时候，但是无法重现，我们就可以通过adb拿到日志

  adb logcat -d >/Users/malei/tt.log  (没有时间)

  adb logcat -d -v time >/Users/malei/tt.txt (有时间)

  adb logcat -v time >/Users/malei/tt.txt (有时间，实时不停打印 control+c 停止)

  
第四步：在程序中添加
```
<uses-permission android:name="android.permission.READ_LOGS" />
```
```
try {
      Process process = Runtime.getRuntime().exec("logcat -d");
      BufferedReader bufferedReader = new BufferedReader(
      new InputStreamReader(process.getInputStream()));

      StringBuilder log=new StringBuilder();
      String line;
      while ((line = bufferedReader.readLine()) != null) {
        log.append(line);
      }
      TextView tv = (TextView)findViewById(R.id.textView1);
      tv.setText(log.toString());
    } catch (IOException e) {
    }
```