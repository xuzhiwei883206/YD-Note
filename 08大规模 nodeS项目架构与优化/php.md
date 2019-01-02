看这个
https://blog.csdn.net/yangchuan_csdn91/article/details/78327895

在CentOS上搭建PHP服务器环境
1,先安装apache:
yum install httpd
配置ServerName
vi /etc/httpd/conf/httpd.conf
将#ServerName www.example.com:80修改为ServerName localhost:80
外部机器此时输入服务器的IP地址，应该看到apache的服务页面，端口不用输，apache默认就是使用80端口
如打不开可能端口80未开启外部访问，检查：
/etc/init.d/iptables status
后面是否有80等信息，无则开启之，注意位置及语句state,deport前面是两个中横杠--：
vim /etc/sysconfig/iptables
加入：
-A INPUT -p tcp -m state --state NEW -m tcp --dport 22 -j ACCEPT
-A INPUT -p tcp -m state --state NEW -m tcp --dport 80 -j ACCEPT

然后重启并保存 防火墙：
service iptables restart
/etc/rc.d/init.d/iptables save
再查一下是否开启：
/etc/init.d/iptables status
启动apache:
/etc/init.d/httpd start



2,安装mysql:
yum install mysql mysql-server
启动mysql:
/etc/init.d/mysqld start

3,安装php
yum install php php-devel
重启apache使php生效
/etc/init.d/httpd restart
此时可以在目录：/var/www/html/下建立一个PHP文件
代码：
<?php phpinfo(); ?>
然后访问这个文件，就能看到PHP的一些信息，php.ini配置文件的路径可以在这个页面上看到

安装php的扩展
yum install php-mysql php-gd php-imap php-ldap php-odbc php-pear php-xml php-xmlrpc
安装完扩展之后需要再次重启apache
/etc/init.d/httpd restart

测试mysql是否链接成功的php代码
<?php
$con = mysql_connect("10.0.@.@@","@@","@@");
if (!$con)
  {
  die('Could not connect: ' . mysql_error());
  }

mysql_select_db("mydb", $con);

$result = mysql_query("SELECT * FROM sys_user");

while($row = mysql_fetch_array($result))
  {
  echo $row['UserName'] . " " . $row['PassWord'] . " " . $row['id'];
  echo "<br />";
  }

mysql_close($con);
?>
可以把上面的代码传入目录/var/www/html/
就可以看到执行情况

安装目录介绍
Apache默认将网站的根目录指向/var/www/html 目录
默认的主配置文件是/etc/httpd/conf/httpd.conf
配置存储在的/etc/httpd/conf.d/目录



3,安装php
yum install php php-devel
重启apache使php生效
/etc/init.d/httpd restart
此时可以在目录：/var/www/html/下建立一个PHP文件
代码：
```
<?php phpinfo(); ?>
```
然后访问这个文件，就能看到PHP的一些信息，php.ini配置文件的路径可以在这个页面上看到

安装php的扩展

> yum install php-mysql php-gd php-imap php-ldap php-odbc php-pear php-xml php-xmlrpc

安装完扩展之后需要再次重启apache

/etc/init.d/httpd restart

测试mysql是否链接成功的php代码
```
<?php
$con = mysql_connect("10.0.@.@@","@@","@@");
if (!$con)
  {
  die('Could not connect: ' . mysql_error());
  }

mysql_select_db("mydb", $con);

$result = mysql_query("SELECT * FROM sys_user");

while($row = mysql_fetch_array($result))
  {
  echo $row['UserName'] . " " . $row['PassWord'] . " " . $row['id'];
  echo "<br />";
  }

mysql_close($con);
?>
```

可以把上面的代码传入目录/var/www/html/

就可以看到执行情况

安装目录介绍

Apache默认将网站的根目录指向/var/www/html 目录

默认的主配置文件是/etc/httpd/conf/httpd.conf

配置存储在的/etc/httpd/conf.d/目录