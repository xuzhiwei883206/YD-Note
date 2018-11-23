
#### mac 目录结构

- /Applications 应用程序目录，默认所有的GUI应用程序都安装在这里；

- /Library 系统的数据文件、帮助文件、文档等等；

- /Network 网络节点存放目录；

- /System 他只包含一个名为Library的目录，这个子目录中存放了系统的绝大部分组件，如各种framework，以及内核模块，字体文件等等。

- /Users 存放用户的个人资料和配置。每个用户有自己的单独目录。

- /Volumes 文件系统挂载点存放目录。

- /cores 内核转储文件存放目录。当一个进程崩溃时，如果系统允许则会产生转储文件。

- /private 里面的子目录存放了/tmp, /var, /etc等链接目录的目标目录。

- /bin 传统unix命令的存放目录，如ls，rm，mv等。

- /sbin 传统unix管理类命令存放目录，如fdisk，ifconfig等等。

- /usr 第三方程序安装目录。

  > **/usr/bin, /usr/sbin, /usr/lib**，其中/usr/lib目录中存放了共享库（动态链接库）.

- /etc. 标准unix系统配置文件存放目录，如用户密码文件/etc/passwd。此目录实际为指向/private/etc的链接。

- /dev 设备文件存放目录，如何代表硬盘的/dev/disk0。

- /tmp 临时文件存放目录，其权限为所有人任意读写。此目录实际为指向/private/tmp的链接。

- /var 存放经常变化的文件，如日志文件。此目录实际为指向/private/var的链接。

#### MAC自带apache开启目录访问及基本配置

- 查询运行文件所在路径

  	> which name

- 查看文件安装路径

  	> where name

- 切到root帐号

  	> sudo su

- 查看当前版本

  	> httpd -v

- 配置文件与网站根目录默认所在位置

  	> /etc/apache2/httpd.conf //配置文件

  	> /Library/WebServer/Documents //网站根目录

	> sudo apachectl start[/restart/stop] #开启等

- 使用前切记开启一个选项,Mac下apache默认不开启php,需要手动开启
	> sudo vi /etc/apache2/httpd.conf   //LoadModule php5_module libexec/apache2/libphp5.so

	> sudo apachectl -v #查看版本

  	> sudo /usr/sbin/httpd -k start #当配置文件出错时，可通过这个方式查看具体出错位置

  	> lsof -i:8000  用于查看某一端口的占用情况，比如查看8000端口使用情况，lsof -i:8000

  	> netstat -tunlp |grep 端口号，用于查看指定的端口号的进程情况，如查看8000端口的情况，netstat -tunlp |grep 8000

- 修改/etc/apache2/httpd.conf,把Options FollowSymLinks Multiviews改成Options Indexes FollowSymLinks MultiMultiviews 禁止显示目录列表views

- 禁掉防火墙：systemctl enable firewalld

#### nginx
- 启动

	1. 启动代码格式：nginx安装目录地址 -c nginx配置文件地址

		> /usr/local/nginx/sbin/nginx -c /usr/local/nginx/conf/nginx.conf

- 从容停止

	1. 查看进程号

  		> ps -ef|grep nginx

	2. 杀死进程

		> kill -QUIT 2072

- 快速停止

	1. 查看进程号

  		> ps -ef|grep nginx

	2. 杀死进程

   		> kill -TERM 2132   或者    kill -INT 2132
- 强制停止

	> pkill -9 nginx

- 重启
	1. 验证nginx配置文件是否正确
		- 方法一：进入nginx安装目录sbin下，输入命令./nginx -t
			> 看到如下显示nginx.conf syntax is ok\nginx.conf test is successful 说明配置文件正确！
		- 方法二：在启动命令-c前加-t
	2. 重启Nginx服务
		- 方法一：进入nginx可执行目录sbin下，输入命令./nginx -s reload 即可
		- 方法二：查找当前nginx进程号，然后输入命令：kill -HUP 进程号 实现重启nginx服务


nginx配置php7详解
​ 掌握nginx配置是一个phper的基本要求，我一直对nginx的配置不求甚解，解决php7和nginx的配置时也是懵懵懂懂的感觉，又是一个因为麻烦而不愿意去深究的问题。这次特地写个博客记录一下。

​ 首先先贴一段代码：

server
{
        listen 80;
        server_name local.med;
        root /var/www/med;
        index index.html index.htm index.php;
        location /api
        {
            set $root_path /var/www/med/server/public;
            try_files $uri $uri/ index.html /index.php?$query_string;
        }
        location ~ [^/]\.php(/|$)
        {
            fastcgi_pass unix:/run/php/php7.0-fpm.sock;
            fastcgi_index index.php;
            fastcgi_param  SCRIPT_FILENAME  $root_path$fastcgi_script_name;
            include fastcgi_params;
        }

}


这是我在ubuntu下nginx的一个配置文件的配置，接下来我基于关键字分析这段代码:

server

这是nginx用于设置站点的代码块，所有的站点配置都应该包括在server{}块中。

listen

这是nginx用于设置监听端口的关键字，listen 80代表监听80端口，也可以选择其他空闲端口。有时候谷歌浏览器或者什么应用占用了80端口就需要用到这个关键字。

server_name

这个关键字比较重要，用于发布网站。emmmm，假设你有一个www.baidu.com的已经备案的域名，那么填在这里是正确的选择。这样子用户就不用去记忆你的网站IP（鬼才会去记）。当然，本地设置虚拟域名也是没问题的，上面代码展示的local.med就是我本地的域名，只需要在hosts添加对应解析即可。像我这样，只需要在浏览器中输入local.med就可以访问我的项目，方便的很。所以这个关键字后面应该填写你的域名。

index

这个用于设置 网站根目录的“入口文件”格式，如果设置了比如index index.html index.htm index.php那么nginx就知道要去解析这三类文件，如果没有设置nginx是认不出来这类文件的。

try_files(php伪静态实现的方法)

在nginx的官网上，try_files的意思是“基于root路径和发起的URL尝试寻找文件”。比如说假设我的一个请求http：//local.med/api/auth/login,root路径在上面设置好了是/var/www/med,那么根据我的请求http：//local.med/api/auth/login,此时的$uri是api/auth/login。那么根据try_files的语法,它先会去找/var/www/med/api/auth/login这个文件，没找到（这是肯定的，因为这是个伪静态的URL），那么它会去找/var/www/med/api/auth/login/这个目录，也没有，再找index.html,显然也是没有的。然后它走进最后一个参数，就是nginx内部发起一个index.php?query_string的请求，最后这个请求会被下面的php的location块所解析。简而言之，就是try_files最后一个参数之前的参数都在找文件，最后一个参数则是nginx的一个内部重定向。

location

这个关键字经常使用，所以非常重要。代码中的location /api代表着一种匹配规则，像http://local.med/api或者是http://local.med/test/api这种请求最后都会匹配到location /api这个块中进行处理。在上面的代码中，匹配到/api的规则后立刻先设置（set）一个变量$root_path,再使用try_files关键字进行处理。也就是说，location块实际的作用就是匹配URL路径，再用块内语句对该URL进行处理而已。
