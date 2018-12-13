看这个
https://blog.csdn.net/yangchuan_csdn91/article/details/78327895





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