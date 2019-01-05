#### 断言库
* TDD（功能）先写测试用例再写代码，这个在国内很少
    * 测试驱动开发(Test-Driven Development,TDD)
    * TDD关注所有的功能是否被实现(每一个功能都必须有对应的测试用 例)，suite配合test利用assert('tobi' == user.name);

* BDD（整体）大多数公司用的都是BDD
    * 行为驱动开发(Behavior Driven Development,BDD)
    * BDD关注整体行为是否符合整体预期,编写的每一行代码都有目的提供一个全面的测试用例集。expect/should,describe配合it利用自然语 言expect(1).toEqual(fn())执行结果。
    * should.js 该对象放在原型上，对IE不友好
    * expect.js 该对象放在构造函数上
#### 库整理
* better-assert(TDD断言库Github 190star 19fork)
* should.js(BDD断言库Github 2295star 194fork)
* expect.js(BDD断言库Github 1391star 162fork)
* chai.js(TDD BDD双模Github 2823star 271fork)
* Jasmine.js(BDD Github10723star1680fork)
* Node.js本身集成 require(“assert”)
* Intern 更是一个大而全的单元测试框架
* QUnit 一个游离在jQuery左右的测试框架
* Macaca 一套完整的自动化测试解决方案 国产神器来自阿里巴巴

#### karma
> karma是一个集成的测试化的环境

#### 注意事项
* 一般测试文件以 .spec.js结尾
* 需要测试的内容
    * 公用库
    * 公用组件
    * 公用库
* 页面测试 e2e测试（端对端测试）


####自动化测试流程
1. npm install -g karma
2. npm install
3. npm install karma --save-dev
4. karma init //生成配置文件karma.conf.js
5. "unit":"karma start" //配置命令 npm run unit
6. 配置文件karma.conf.js
    1. singleRun 设置为 true,
    2. files:配置需要测试的文件
    3. exclude:配置排除文件，不需要测试的文件
    4. reporters:['progress','coverage']   //progress:进度报告，coverage:覆盖率报告
    5. preprocessors:{'unit/**/*.js':['coverage']}  //unit下面的js文件都要进行覆盖率检查
    6. coverageReporter:{type:'html',dir:'docs/'}  //报表存放的地址，和报表的类型
7. npm install karma-jasmine jasmine-core --save-dev
    1. 因为我们用的是jasmine，所以我们需要安装jasmine-core（核心库），karma-jasmine就想是一个适配器，把jasmine集成到karma里面来，都可以全局装一下
8. 覆盖率检查:npm install karma-coverage --save-dev
9. npm run unit  //之前配置了 "unit": "karma start"  单元测试在unit文件夹下面
10. npm install phantomjs --save-dev
    1.  无头浏览器
    2.  配合兄弟phantomcss插件对比截图抓图（可以在无头浏览器内部游走，click，hover...）
    3.  全局安装下
11. npm install karma-phantomjs-launcher --save-dev  //类似于karma版本的phantomjs的适配器
12. npm install selenium-webdriver --save-dev //入门级别的e2e测试
13. 到 https://www.npmjs.com/package/selenium-webdriver 下载浏览器驱动，放到根目录
14. npm run e2e //之前配置了  "e2e":"node ./e2e/baidu.spec.js"  端对端测试在e2e文件夹下面
15. npm install -g backstopjs  //这个用来测试ui的，比phantomcss好用
16. backstop init
    1. 生成配置文件 backstop.json  配置如下
    2. viewports：需要对比的界面，设置响应式
    3. onBeforeScript: before操作文件的地址
    4. onReadyScript:ready操作文件的地址
    5. backstop_data/engine_scripts(这个文件夹下面是几个核心的库)
        1. caspor库:
            1. clickAndHoverHelper 在无头浏览器里操作鼠标（比如把鼠标移动到某个位置点击，hover截图）
            2. loadCookies：注入，读取cookie
    6. scenarios
        1. cookiePath:需要注入的cookie的文件地址
        2. url:需要测试的地址
    7. paths
        1. bitmaps_reference:参考的图地址,也就是美工出的图 //这里面的文件名字命名有规则，必须要有图才能对比测试
        2. bitmaps_test:测试的图地址
        3. engine_scripts:js引擎地址
        4. html_report:报表地址
        5. ci_report:自动化测试报表，可以导入到ci里面，ci去展现//Jenkins
    8. report:在哪里跑，browser->浏览器中跑
    9. engine:引擎  无头浏览器中现在排名第一的是 pupperteer（新的）
    10. engineOptions: 引擎的一些值
17. npm run ui //之前配置了"ui":"backstop test"
18. npm install express --save-dev
19. npm install mocha --save-dev  //测试异步的
20. npm install mochawesome --save-dev  //报表

#### 总结
ui测试  backstop  phantomjs
接口测试  mocha mochawesome
单元测试  karma-jasmine jasmine-core 断言库
工程化e2e nightwatchjs puppeteer+rize（新秀）
自动化录制 f2etest(阿里)
代码覆盖率 karma-coverage karma


#### 补充 
[Nightmare](https://github.com/ruanyf/jstraining/blob/master/demos/README.md#rest-api)


