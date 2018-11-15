#### 下载安装Composer
```
curl -sS https://getcomposer.org/installer | php
mv composer.phar /usr/local/bin/composer
```
#### 安装 Yii
```
//安装 Composer 后，您可以通过在 Web 可访问的文件夹下运行以下命令来 安装Yii应用程序模板：
composer create-project --prefer-dist yiisoft/yii2-app-basic basic
//这将在一个名为 basic 的目录中安装Yii
//如果是使用下载模板的方式，那么需要配置下config/web.php文件下的
'cookieValidationKey' => '在此处输入你的密钥',

//安装高级模板
//使用一下两个命令完成Yii2基础项目高级模板的安装，项目被安装在yii2文件夹中：
composer global require "fxp/composer-asset-plugin:~1.0.3"
composer create-project --prefer-dist yiisoft/yii2-app-advanced yii2 -vvv


//错误解决方案
Your requirements could not be resolved to an installable set of packages.
如果提示上面的错误：
执行： composer update -vvv
```
#### Yii2基础模板目录结构
- composer.json/composer.lock    利用composer安装的时候就会有这个
- assets  静态文件
- config  引用配置以及其他配置
    * console.php  控制台应用配置信息
    * db.php 数据库
    * params.php  预定义一些参数
    * web.php       web应用配置的信息
- commands  控制台运行类
- controllers 控制器
- models 模型
- views 视图
- runtimes 运行时生成的文件，log日志文件，缓存文件
- vendor 包含已安装的composer包，同时也包含yii框架本身
- web
    - assets 外部资源文件
    - index.php 入口
- yii 是控制台命令执行脚本

#### Yii2高级模板的目录结构
- backend——后台web程序
- common——公共的文件
- console——控制台程序
- environments——环境配置
- frontend——前台web程序

#### Composer的常用命令

1. 修改下载代码库的地址
    因为github在功能比较慢，修改代码库下载地址，使用中国镜像：

    > composer config -g repositories.packagist composer http://packagist.phpcomposer.com

2. 下载github上的完整项目,将yiisoft用户（github的用户）下的yii2-app-advanced项目下载到yii-application文件夹下面，  yii-application就是一个项目。

    > composer create-project --prefer-dist    yiisoft/yii2-app-advanced yii-application -vvv


3. 下载代码库并且安装到项目中,安装yiisoft用户（github的用户）下的yii2-bootstrap到项目中
    > composer require --prefer-dist yiisoft/yii2-bootstrap -vvv
#### 验证安装的结果
```
php yii serve
//打开的是web目录
//可以加参数端口号php yii serve --port=8888
//http://localhost:8888/index.php?r=site/say
```

#### 生命周期
1. 访问入口index.php
2. 他会通过请求组件解析请求的路由
3. 创建一个控制器实例去处理请求
4. 控制器创建一个操作实例并针对操作执行
5. 执行过滤器，任何一个过滤器返回失败则操作返回退出，反之所有过滤器通过则操作执行
6. 操作会添加一个数据模型，或者是来自数据库，
7. 然后数据模型执行完madesform操作会渲染一个视图，把视图模型提供的数据提供给视图
8. 再是确认结果返回一个响应组件，响应组件发送渲染结果给用户浏览器
9. 这样整个生命周期完毕