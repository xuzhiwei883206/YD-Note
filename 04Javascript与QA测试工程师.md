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
    4. reporters:['progress','coverage']   //progress:进度，coverage:覆盖率
    5. preprocessors:{'unit/**/*.js':['coverage']}  //unit下面的js文件都要进行覆盖率检查
    6. coverageReporter:{type:'html',dir:'docs/'}  //报表存放的地址，和报表的类型
7. npm install karma-jasmine jasmine-core --save-dev
    1. 因为我们用的是jasmine，所以我们需要安装jasmine-core（核心库），karma-jasmine就想是一个适配器，把jasmine集成到karma里面来，都可以全局装一下
8. 覆盖率检查:npm install karma-coverage --save-dev
9.  npm install phantomjs --save-dev//无头浏览器  可以全局安装下
10. npm install karma-phantomjs-launcher --save-dev  //类似于karma版本的phantomjs的适配器
11. npm run unit
12. npm install selenium-webdriver --save-dev //入门级别的e2e测试
13. 到 https://www.npmjs.com/package/selenium-webdriver 下载浏览器驱动，放到根目录