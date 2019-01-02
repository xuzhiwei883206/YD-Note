
#### 1、关闭防火墙
centos 7：
```
systemctl stop firewalld.service #停止
systemctl disable firewalld.service #禁用
```
之前的版本：
```
service iptables stop #停止
chkconfig iptables off #禁用
```
#### 2、开启防火墙
centos7：
```
systemctl start firewalld.service # 开启防火墙
systemctl restart firewalld.service # 重启防火墙
```
#### 3、firewalld开发某些端口
```
添加
firewall-cmd --zone=public --add-port=80/tcp --permanent    （--permanent永久生效，没有此参数重启后失效）

重新载入
firewall-cmd --reload

查看
firewall-cmd --zone= public --query-port=80/tcp

删除
firewall-cmd --zone= public --remove-port=80/tcp --permanent
```
#### 4、iptables开放某些端口

查看已打开的端口

> /etc/init.d/iptables status

打开svn端口

> /sbin/iptables -I INPUT -p tcp --dport 3690 -j ACCEPT

保存配置

> /etc/rc.d/init.d/iptables save

#### 5、重启防火墙
```
/etc/init.d/iptables restart
```

#### 4、恢复默认配置，默认防火墙配置在此文件中只要将其恢复即可
```
vi /etc/sysconfig/iptables
```
#### 5、常用端口
- svn 3690
- nexus 8081
- ftp 21

#### 6、CentOS7防火墙firewalld和iptable的设置和使用
相关文档:http://blog.csdn.net/lmb55/article/details/77076175

