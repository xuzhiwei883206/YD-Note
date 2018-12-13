#### 项目的四种进阶
1. Vue-cli  -->  dist
2. swig+Node
3. vue+node (同构)
4. 框架+node 用node实现真路由，框架是假路由(去模板法)

#### 上线部署
ps aux|grep node  //查看node进程谁在用
lsof -i tcp:3000  //查看谁在使用这个端口
kill -9 pid       //关闭进程
ssh 用户名@地址（免密登录）
scp course-map.json root@IP地址：/路径
scp -r advace/root@101200.185.250:/opt/node-publish/www/static
unzip 压缩文件名

#### Node
- Node.js的本质是一个Javascript的解释器
- Node.js是Javascript的运行环境
- Node.js是一个服务器程序
- Node.js本身是使用的V8引擎
- Node不是web服务器
- 对于在html当中，浏览器就是充当的解释器
- 解决回调地狱的方法，promise
- supervisor 热启动

    > sudo npm install supervisor  -g

    > supervisor 文件名

<hr>

#### 错误处理 log4j-wrapper 中间件
#### node架构

- nginx拦着（一层负载） -> 分配到具体的机器 -> 具体机器内部pm2启动多核（两层负载）

> node是单线程（也可以多线程），被pm2开启多核后，4核的cpu机器上就变成4个单线程，吞吐量变成四倍 pm2的线程之间可以进行相互**数据交互**，要是一个用户在下单，这时候一个线程挂了，其他线程还可以继续完成下面的请求工作，因为他们的数据是共享的<br>
> 并发超过了**QPS**就会完了，并发大了就该加机器了<br>
> 流量就是并发网站能不能吃得消，比如你的网站页面是4KB，1000万用户进来，那你的带宽够不够，所以开始的时候都要进行预算<br>

<font color=red>流量具体怎么计算，按用户请求获取的文件大小吗？</font>



- 微博热搜崩溃，是因为瞬间太多人使用，负责热搜的服务器总数不够，一下子应付不过来太多访问。只要一个服务器崩溃了，这个服务器的流量就会被负责均衡分发到其他服务器来处理，导致其他服务器负载更大了，这样很容易导致第二个服务器跟着崩溃……这样很容易一连串服务器都崩溃了，大部分时间都是正常流量，突发高流量在一年中只有那么几次，所以平时服务器数量都是按照正常流量来部署的，总体负载维持在 50% - 75% 之间，否则服务器费用太贵……突发高流量一般通过自动化扩容来解决，这才是云计算最大的用处之一


### pm2

> pm2 start app.js -i 4  //-i 代表启动的线程数，也就是需要fork的数量

> pm2 link ouaxhrnk1u88q5q hpiuwq2l1nvuagd MACHINE_NAME

> pm2 monit

> pm2 start/restart/reload/delete ecosystem.config.js --only api-app

> pm2 restart process.json --env staging

> pm2 start process.json --env production
```
http://pm2.keymetrics.io/docs/usage/application-declaration/
{
    "apps" : [{
      "name"        : "nodekoa2",
      "script"      : "./app.js",
      //日志日期格式
      "log_date_format":"YYYY-MM-DD HH:mm Z",
      //输出文件路径(默认为$HOME/.pm2/log/XXXout.log)
      "out_file":"./log/node-app.stdout.log",
      //错误文件路径(默认为$HOME/.pm2/log/XXXerr.log)
      "error_file":
      "watch"       : true,
      //culster 是以主线程的形式去起，几个独立的
      //forker 一个进程，剩下的往cpu复制
      "exec_mode":"cluster",
      //让cpu占满
      "instances":"max",
      "env": {
        "NODE_ENV": "development"
      },
      "env_production" : {
         "NODE_ENV": "production"
      }
    },{
      "name"       : "api-app",
      "script"     : "./api.js",
      "instances"  : 4,
      "exec_mode"  : "cluster"
    }]
  }

```



