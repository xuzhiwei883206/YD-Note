- Cookie是存储于访问者的计算机中的变量。每当同一台计算机通过浏览器请求某个页面时，就会发送这个cookie。

- Cookie的作用就是用于解决"如何记录客户端的用户信息"：

    1. 当用户访问web页面时，他的名字可以记录在Cookie中。

    2. 在用户下一次访问该页面时，可以在Cookie中读取用户访问记录。
- Cookie实际上是一小段文本信息（上限为<font color = "red">**4kb**</font>）。客户端请求服务器，如果服务器需要记录该用户状态，就使用response向客户端浏览器颁发一个Cookie。客户端浏览器可以把Cookie保存起来。当浏览器再请求该网站时，浏览器把请求的网址连同该Cookie一同提交给服务器。服务器检查该Cookie，以此来辨认用户状态。服务还可以根据需要修改Cookie的内容。
- Cookie的属性
    - name:Cookie的名称，Cookie一旦创建，名称便不可更改
    - value:Cookie的值，如果值为Unicode字符，需要为字符编码。如果为二进制数据，则需要使用BASE64编码
    - maxAge:Cookie**失效的时间**，单位秒。如果为整数，则该Cookie在maxAge秒后失效。如果为负数，该Cookie为临时Cookie，关闭浏览器即失效，浏览器也不会以任何形式保存该Cookie。如果为0，表示删除该Cookie。默认为-1。
    - secure:该Cookie是否仅被使用安全协议传输。安全协议。安全协议有HTTPS，SSL等，在网络上传输数据之前先将数据加密。默认为false。
    - path:Cookie的使用路径。如果设置为“/sessionWeb/”，则只有contextPath为“/sessionWeb”的程序可以访问该Cookie。如果设置为“/”，则本域名下contextPath都可以访问该Cookie。注意最后一个字符必须为“/”。
    - domain:可以访问该Cookie的域名。如果设置为“.google.com”，则所有以“google.com”结尾的域名都可以访问该Cookie。注意第一个字符必须为“.”。
    - comment:该Cookie的用处说明，浏览器显示Cookie信息的时候显示该说明。
    - version:Cookie使用的版本号。0表示遵循Netscape的Cookie规范，1表示遵循W3C的RFC 2109规范


#### 查看cookies

> document.cookie