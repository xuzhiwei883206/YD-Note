1. npm init
2. npm install koa
3. 创建启动文件app.js
	```
	const Koa = require('koa')
	const app = new Koa()

	app.use( async ( ctx ) => {
	ctx.body = 'hello koa2'
	})

	app.listen(3000)
	console.log('[demo] start-quick is starting at port 3000')
	```
4. 创建pm2.json 配置如下
	```
	{
		"apps" : [{
		"name"        : "nodekoa2",
		"script"      : "./app.js",
		"log_date_format":"YYYY-MM-DD HH:mm Z",
		"out_file":"./log/node-app.stdout.log",
		"error_file":"./log/node-app.stderror.log",
		"watch"       : true,
		"exec_mode":"cluster",
		"instances":"max",
		"env": {
			"NODE_ENV": "development"
		},
		"env_production" : {
			"NODE_ENV": "production"
		}
		}]
	}
	```
5. pm2 start pm2.json可以启动

6. koa路由，使用<font color=#ff0000>koa-simple-router</font>
	> https://www.npmjs.com/package/koa-simple-router
7. <font color=#ff0000>supervisor</font> 服务器自动重启模块

	> npm i supervisor -g

8. 设置静态目录,安装koa-static

	> npm i koa-static --save

	> const serv = require('koa-static');

	> app.use(serv(__dirname + '/static'));

	> 在目录中创建目录static，在static下创建文件demo.html，访问

9. 获取请求参数
	```
	请求demo
	var url = 'http://localhost:3000/login';
	var data = {
		username: 'laohu',
		phone: '15013795539'
	}
	$.ajax({
		url,
		data,
		type: 'get',
		dataType: 'json',
		success: function(res) {
			console.log(res);
		},
		error: function() {
			console.log('请求失败');
		}
	})
	```
	1. 获取get请求参数
		- 在router.js的login接口里加入如下代码
			```
			// 获取get请求参数
			const username = ctx.query.username;
			const phone = ctx.query.phone;
			并把username和phone放入ctx.body
			```
	2. 获取post请求
		- 获取post请求需要使用<font color=#ff0000>koa-body</font>模块
		> 安装koa-body npm i koa-body --save

		在app.js里加入如下代码：
			```
			const koaBody = require('koa-body');
			app.use(koaBody());
			```
			获取post请求参数的代码如下
			```
			ctx.request.body.xxx
			```
10. 模板
一般请求一个接口返回的是一坨数据，然而有时候我们希望返回的是一个html网页或者一段html代码（上周分享的服务器渲染）

我们试用koa-swig模块来向前端返回一个html
- 安装koa-swig
	> npm i koa-swig
- 在根目录创建views目录，在views目录下创建tpl.html
- 在app.js添加如下代码
	```
	const render = require('koa-swig')
	const co = require('co')
	app.context.render = co.wrap(render({
		root: './views',
		autoescape: true,
		cache: 'memory',
		writeBody: false,
		ext: 'html' }))

	// 在router.js里面的根路由修改成下面这样,同时给模板传递变量msg
	_.get('/', async (ctx, next) => {
		ctx.body = await ctx.render('tpl', { msg: 'hello' });
	})
	```
- 在tpl.html里面添加代码：
	```
	<p>{{msg}}</p>
	```
- 访问 http://localhost:3000，就可以看到一个html页面

- 可以使用axios请求后台接口，然后渲染页面，最后返回给前端（详情请看github上的demo）
- 本文github地址：https://github.com/wotu-courses/koa2
- 本文相关nodejs项目地址： https://github.com/wotu-courses/zhihu_server.git

11. npm install node-fetch --save
12. shelljs
	> npm install shell.js --save  如果会写shell的可以不用
	- 创建一个deploy.js
13. 建立config文件夹，在文件夹里面创建config.js的基本配置文件
14. 建立routes文件夹，存放路由文件
15. npm install --save koa-bodyparser 解析post参数
16. npm install --save cross-env
17. npm install lodash --save
18. npm install log4js --save //日志
