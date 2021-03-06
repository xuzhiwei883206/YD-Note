
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
