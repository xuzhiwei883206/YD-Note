#### 命令
- sudo service jenkins start
- sudo service jenkins stop
- sudo service jenkins restart
- sudo chkconfig jenkins on

- http://localhost:8080/exit
- http://localhost:8080/restart
- http://localhost:8080/reload

#### 安装
```
brew install jenkins
```
#### 执行
```
java -jar /usr/local/Cellar/jenkins/2.49/libexec/jenkins.war --httpPort=8080
//2.49是指Jenkins的版本号
访问8080端口即可看到界面
```
#### 链接launchd配置文件
```
ln -sfv /usr/local/opt/jenkins/*.plist ~/Library/LaunchAgents
```
#### 启动jenkins
```
 launchctl load /Library/LaunchDaemons/org.jenkins-ci.plist
```
#### 停止jenkins
```
 launchctl unload /Library/LaunchDaemons/org.jenkins-ci.plist
```

如果启动失败，可以运行如下命令查看错误信息

> systemctl status jenkins.service

如上错误是java配置错误，需要修改jenkins配置文件

> vi /etc/rc.d/init.d/jenkins

类似修改如下
```
candidates="
************
************
/usr/local/jdk1.8/bin/java
"
```

#### jenkins的默认设置  ( 配置文件：/etc/rc.d/init.d/jenkins )
Jenkins会随系统启动而启动。详情参照/etc/init.d/jenkins
- Jenkins会创建一个用户叫做jenkins, 如果你修改了user，则要修修改所属者：/var/log/jenkins,/var/lib/jenkins,/var/cache/jenkins
- 如果遇到问题，查看日志/var/log/jenkins/jenkins.log
- 配置文件/etc/sysconfig/jenkins
- 默认启用8080   ---开启非80端口需要打开防火墙，参考：http://www.cnblogs.com/rslai/p/7954080.html

#### 相关概念

Jenkins是一个功能强大的应用程序，允许持续集成和持续交付项目，无论用的是什么平台。这是一个免费的源代码，可以处理任何类型的构建或持续集成。集成Jenkins可以用于一些测试和部署技术。Jenkins是一种软件允许持续集成。

#### 目的
1. 持续、自动地构建/测试软件项目。
2. 监控软件开放流程，快速问题定位及处理，提示开放效率。

#### 特性
- 开源的java语言开发持续集成工具，支持CI，CD。
- 易于安装部署配置：可通过yum安装,或下载war包以及通过docker容器等快速实现安装部署，可方便web界面配置管理。
- 消息通知及测试报告：集成RSS/E-mail通过RSS发布构建结果或当构建完成时通过e-mail通知，- 生成JUnit/TestNG测试报告。
- 分布式构建：支持Jenkins能够让多台计算机一起构建/测试。
- 文件识别:Jenkins能够跟踪哪次构建生成哪些jar，哪次构建使用哪个版本的jar等。
- 丰富的插件支持:支持扩展插件，你可以开发适合自己团队使用的工具，如git，svn，maven，docker等。

#### 产品发布流程
- 产品设计成型 -> 开发人员开发代码 -> 测试人员测试功能 -> 运维人员发布上线
- 持续集成 （Continuous integration，简称CI）
- 持续交付（Continuous delivery）
- 持续部署（continuous deployment）

---

#### 基于Jenkins的持续集成CI

CI（continuous integration）持续集成

一次构建：可能包含编译，测试，审查和部署，以及其他一些事情，一次构建就是将源代码放在一起，并验证软件是否可以作为一个一致的单元运行的过程。可以理解为频繁的在多个团队的工作中集成，并且给与反馈的过程。团队开发成员经常集成它们的工作，每次集成都通过自动化的构建（包括编译，发布，自动化测试）来验证，从而尽早地发现集成错误。

CI场景如下：

（1）开发人员向版本控制库提交代码，同时，集成构建计算机上的CI服务器正在轮询检查版本控制库中的变更

（2）在提交发生之后，CI服务器检测到版本控制库中发生了变更，所以CI服务器会从库中取得最新的代码副本，执行构建脚本，该脚本将对软件进行集成

（3）CI服务器向指定的项目成员发成电子邮件，提供构建结果的反馈信息。

（4）CI服务器继续轮询版本控制库中的变更。

CI持续集成周期

一个典型的持续集成周期包括以下几个步骤：

（1）持续集成服务器不断从版本控制服务器上检查代码状态，看代码是否有更新。

（2）如果发现代码有最新的提交，那么就从版本控制服务器下载最新的代码。

（3）等代码完全更新以后，调用自动化编译脚本，进行代码编译。

（4）运行所有的自动化测试。

（5）进行代码分析。

（6）产生可执行的软件，能够提供给测试人员进行测试。

CI系统

在CI中您需要一个版本控制库，比如（CVS或者SVN，subversion）来执行CI。版本控制库，大家都知道SVN，可以方便的管理源代码，可以沿着时间轴取得不同同版本的代码。CI服务器在变更提交到版本库后执行的集成构建，他会每个一段时间去检查版本库中的变更，所以我们需要对CI服务器进行配置。CI服务器还需要提供一个方便的显示板来显示构建的结果。但是CI服务器并不是必须的，也可以通过执行构建脚本来执行构建。

从上面我们知道CI的4个基本特征：与版本控制库链接，构建脚本，某种类型的反馈机制，集成源代码变更的过程。这也是CI系统的4个基本功能。一个好的CI系统的关键特征就是速度，这个系统的本质就及时向开发者和项目风险承担者提供反馈信息。

既然CI这么好，但还是有些团队并没有选择使用，其实这是一个综合考虑的结果。使用CI会增加一些成本的，比如增加了维护CI系统的开销，变化太多尤其是对于老项目需要改变很多才能实现CI。失败的构建太多，如果在提交代码之前没有私有构建一次，就会造成在使用ci的时候变更变得频繁。存在额外的硬件和软件成本，使用ci就需要一台独立的集成服务器。

一些需要考虑到的问题

测试能达到多少代码覆盖率？

执行构建需要多长的时间？

平均的代码复杂度如何？有多少代码重复？

在版本控制系统中对构建版本打上标签了吗？

已部署的软件存放在哪里?

是否使用测试覆盖率工具？

如何做好code review？

CI工具

持续集成工具：jenkins、CruiseControl、Hudson、gauntlet

构建工具：Maven、Ant、groovy

CDBI：持续数据库集成，即每次项目的版本控制库中发生变更时，重建数据库和测试数据。

Jenkins

Jenkins 是一个开源项目，提供了一种易于使用的持续集成系统，使开发者从繁杂的集成中解脱出来，专注于更为重要的业务逻辑实现上。同时 Jenkins 能实施监控集成中存在的错误，提供详细的日志文件和提醒功能，还能用图表的形式形象地展示项目构建的趋势和稳定性。Jenkins 还提供了非常丰富的插件支持，这使得 Jenkins 变得越来越强大。我们可以方便的安装各种第三方插件，从而方便快捷的集成第三方的应用。

PMD

静态代码分析工具，通过扫描Java源代码，发现隐藏在其中的各种问题，包括重复代码，日志记录不规范，异常处理不规范，未使用引入的包，支持ant集成。

这里有关于PMD的一些介绍：http://blog.csdn.net/sadamdiyi/article/details/6073694

Checkstyle

提供了一个帮助JAVA开发人员遵守某些编码规范的工具。它能够自动化代码规范检查过程。相比于PMD会更加侧重于编码标准（语法）方面的检查，而PMD是侧重于语义bug。

基于Jenkins快速搭建CI环境
首先要知道一个持续集成环境需要包括三个方面要素：代码存储库、构建过程和持续集成服务器。

​代码存储库一般使用SVN，

1、开始新建一个 Jenkins 项目， 由于我们需要连接 SVN 的代码存储器， 我们选择 Build a free-style software project。

2、然后配置这个 JenkinsTest 项目了，根据实际的 SVN 服务器服务器信息配置 Source Code Management，这能让 Jenkins 知道如何从哪里获取最新的代码。

3、根据开发需要，隔一段时间需要重新构建一次。选择 Build periodically，在 Schedule 中填写 0 * * * *对应的构建时间。

4、添加 build 的步骤了。Jenkins 提供了四个选项供我们选择，可以根据需要执行或调用外部命令和脚本，例如ant、shell、maven等等。这些脚本都是根据需要自己配置的。

5、可以在 Jenkins 中观察构建的进度和最终的状态——成功或者失败。太阳代表之前的构建没有任何失败，蓝色的小球代表构建成功。也可以在JenkinsTest 查看单次构建的 Console 的输出结果。从中能看到构建的第一步是从 SVN 服务器上 check out 代码，然后在build。

具体的可以参考：http://www.ibm.com/developerworks/cn/java/j-lo-jenkins/

后话：其实这就是我在公司实习时所谓的CBD，他们没有使用集成工具，而是直接在服务器上执行CBD脚本，check代码，build构建，deploy部署。