
#### nginx
- 安装node
    - mac
        1. brew info nginx
        2. brew search nginx
        3. brew install nginx
    - linux
        1. 在你的web服务器上 下载nginx( nginx-1.14.1 pgp) (990kb)
            ```
            wget https://nginx.org/download/nginx-1.14.1.tar.gz
            ```
        2. 下载完成后,解压文件
            ```
            tar zxvf nginx-1.14.1.tar.gz
            ```
        3. 检查是否有gcc编译器,在控制台输入gcc
            ```
            pixel@ubuntu:~/Desktop/workspace/nginx-1.14.1$ gcc<br>
            gcc: fatal error: no input files<br>
            compilation terminated.
            ```
            如果安装了gcc会提示错误信息: fatal error: no input files,否则会提示找不到gcc命令

            如果没有安装gcc,先安装
            ```
            sudo apt-get update
            sudo apt-get install gcc
            ```
        4. 在nginx目录下执行 ./configure 检查当前编译环境
            nginx待编译目录结构如下:
            ```
            pixel@ubuntu:~/Desktop/workspace/nginx-1.14.1$ ll
            总用量 756
            drwxr-xr-x 8 pixel pixel   4096 11月  6 05:52 ./
            drwxrwxr-x 4 pixel pixel   4096 11月 21 02:52 ../
            drwxr-xr-x 6 pixel pixel   4096 11月  6 05:52 auto/
            -rw-r--r-- 1 pixel pixel 287441 11月  6 05:52 CHANGES
            -rw-r--r-- 1 pixel pixel 438114 11月  6 05:52 CHANGES.ru
            drwxr-xr-x 2 pixel pixel   4096 11月  6 05:52 conf/
            -rwxr-xr-x 1 pixel pixel   2502 11月  6 05:52 configure
            drwxr-xr-x 4 pixel pixel   4096 11月  6 05:52 contrib/
            drwxr-xr-x 2 pixel pixel   4096 11月  6 05:52 html/
            -rw-r--r-- 1 pixel pixel   1397 11月  6 05:52 LICENSE
            drwxr-xr-x 2 pixel pixel   4096 11月  6 05:52 man/
            -rw-r--r-- 1 pixel pixel     49 11月  6 05:52 README
            drwxr-xr-x 9 pixel pixel   4096 11月  6 05:52 src/
            pixel@ubuntu:~/Desktop/workspace/nginx-1.14.1$ gcc
            gcc: fatal error: no input files
            compilation terminated.
            ```
            通过 ./configure 开始检查编译环境
            ```
            pixel@ubuntu:~/Desktop/workspace/nginx-1.14.1$ ./configure
            checking for OS
            + Linux 4.15.0-39-generic x86_64
            checking for C compiler ... found
            + using GNU C compiler
            + gcc version: 7.3.0 (Ubuntu 7.3.0-27ubuntu1~18.04)
            ```
            检查完编译环境,如果有缺失的库会在下面提示出来.

            比如下面提示: 缺少PCRE库
            ```
            ./configure: error: the HTTP rewrite module requires the PCRE library.
            You can either disable the module by using --without-http_rewrite_module
            option, or install the PCRE library into the system, or build the PCRE library
            statically from the source with nginx by using --with-pcre=<path> option.
            ```
            也可能缺少其他库:比如 zlib
            ```
            ./configure: error: the HTTP gzip module requires the zlib library.
            You can either disable the module by using --without-http_gzip_module
            option, or install the zlib library into the system, or build the zlib library
            statically from the source with nginx by using --with-zlib=<path> option.
            ```
            如果此时执行下一步编译 , 会提示 : make: *** 没有规则可制作目标“build”，由“default” 需求。 停止
            ```
            pixel@ubuntu:~/Desktop/workspace/nginx-1.14.1$ make
            make: *** 没有规则可制作目标“build”，由“default” 需求。 停止。
            ```
            那么我们需要先把缺少的 PCRE 库和 zlib 库安装完,如果已经安装，请忽略这一步
            ```
            sudo apt-get update
            sudo apt-get install libpcre3 libpcre3-dev
            sudo apt-get install zlib1g-dev
            ```
            执行完./configure脚本之后,默认会在当前目录生成文件 Makefile

            产生Makefile文件后,直接输入make命令进行编译,make会在当前目录查找Makefile文件.

            找到后进行编译,下一步执行make install进行安装
            ```
            make
            make install
            ```
            通过编译安装后,会在 /usr/local 下生成一个nginx目录

            如通过yum安装,会在 /etc/ 下生成nginx目录
            下面以编译方法举例:
            - /usr/local/nginx/sbin,找到nginx,此文件是可执行文件,用于启动nginx
            ```
            $ cd /usr/local/nginx/sbin
            $ ./nginx          >>>>>>>>>>>>>启动文件
            ```
            - 启动nginx前还需要修改 nginx.conf 配置文件,nginx的配置文件在 /usr/local/nginx/conf目录,进入目录找到并修改文件: nginx.conf
#### nginx文件结构
```
... #全局块
events {         #events块
    ...
}
http #http块
{
    ... #http全局块
    server #server块
    {
        ... #server全局块
        location [PATTERN] #location块
        {
            ...
        }
        location [PATTERN]
        {
            ...
        }
    }
    server
    {
        ...
    }
    ... #http全局块
}
```
下面简单描述各个参数意义
```
#user nobody; --以什么用户身份启动nginx (手动编译这个参数默认是屏蔽状态,用yum安装这个是生效状态)
worker_processes 1;  --工作进程数(启动nginx时,会启动1个主管理进程,1个工作进程,工作进程默认数是1.当通过http访问nginx时,是工作进程在干活)
#error_log logs/error.log;  --日志以及输出地址
#pid logs/nginx.pid --进程管理 不用管
events {
    worker_connections 1024; --工作进程的最大连接数 不是专业的服务器运维这个不用管
}

http{        #配置http协议
    include mime.types; #引用其他配置文件
    default_type application/octet-stream; #默认以流的形式传输数据
    sendfile ##可以直接下载文件
    keepalive_timeout #连接超时时间
    gzin #是否启用压缩

      //配置反向代理需要添加upstream web_crm{}块
      //配置多个反向代理,以IP和端口区分
      upstream web_crm{
            server 127.0.0.1:8080;
            server 127.0.0.2:8080;
            server 127.0.0.3:8080;
            #//可以配置多个server做负载,智能管理,自动切换
      }
     upstream web_XXX{
            server 127.0.0.1:8090;
      }
    server{    --虚拟站点 可以有多个server块
             listen  --端口
             server_name  localhost 网址
             location / { --配置地址
                  root  html/monitor/;--配置根目录
                  index index.html index.htm   --配置首页
             }
             location /test/ { --配置子地址
                  root  html;--配置根目录
                  index text.html   --配置首页
             }
            location /crm/ {
                    proxy_pass http://web_crm/crm/;
                    #--代理路径,格式: 协议://上面配置的upstream名字/所代理地址的子目录

                    proxy_redirect off;
                    proxy_set_header Host $host;
                    #/////////////////////////////////////////////////////////////////////////////////////
                    //这部分内容复制粘贴就好,作用是配置转发的信息头
                    proxy_http_version 1.1;
                    proxy_set_header Upgrade $http_upgrade; #代理webscoket流量
                    proxy_cache_bypass $http_upgrade;#代理webscoket流量

                    proxy_set_header X-Real-IP $remote_addr;
                    proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
                    #/////////////////////////////////////////////////////////////////////////////////////
                    #//热备配置(后期总结)
                    #//变量配置(后期总结)
                    # 详细参见 nginx配置学习资料.pdf
                    #/////////////////////////////////////////////////////////////////////////////////////
            }
    }
}
```


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
