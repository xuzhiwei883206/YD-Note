
> log4js 是一个 nodejs 日志管理工具，可以将日志以各种形式输出到各种渠道。

> https://log4js-node.github.io/log4js-node/index.html

#### 特点
- stdout 或 stderr 彩色控制台记录
- File Appender，可根据文件大小或日期配置日志滚动
- File Appender
- GELF appender
- Loggly appender
- Logstash UDP appender
- logFaces （UDP and HTTP）appender
- multiprocess appender （当你有多个服务器但想要集中日志记录时非常有用）
- Connect / Express Logger 日志程序
- 可配置的日志消息 layout/patterns
- 不同日志类别的不同日志级别（将应用程序的某些部分作为调试，其他部分仅作为错误，等等）。
- 内置的支持，可以使用 node core cluster 模块进行日志记录。

#### 安装
> npm install log4js

#### 简单使用
```
var log4js = require('log4js');
var logger = log4js.getLogger();
logger.level = 'debug'; // default level is OFF - which means no logs at all.
logger.debug("Some debug messages");
```

#### API
##### configuration

log4js.configure(object || string) ：配置 log4js。

- string：加载配置的文件名。配置文件必须是 JSON 文件，并包含一个配置对象（参见下面的格式）。
- object：直接传递一个configuration对象

在应用程序中首次 require('log4js') 之后，应该立即进行配置。如果不调用 configure，log4js 将使用 LOG4JS_CONFIG （如果已定义）或默认配置。默认的配置定义了一个 appender，使用带颜色的布局将日志记录到 stdout，但也定义了默认日志级别是关闭的（即不会输出日志）。

如果您使用的是 cluster，那么在工作进程及主进程中都会调用 configure。工作进程将会为您的类别选择正确的级别，以及选择您定义的任何自定义级别。Appenders 只会在主进程被定义。因此，不存在多个进程试图写入同一个 appender 的危险。不需要特殊的配置来使用带有 cluster 的 Log4js （与以前的版本不同）。

configuration 对象必须定义至少一个 appender 和一个默认类别。如果配置无效，Log4js 将抛出异常。

configure 方法调用返回已配置的 Log4js 对象。

##### Configuration 对象

Properties:

- levels (可选, object)： 用于定义定制日志级别，或重新定义现有日志级别。是一个 map，key 是级别名level name（string, 不区分大小写），value是一个object对象。
    - object对象有两个属性：level value级别（整数）以及 colour颜色。

    - 日志级别用于分配日志消息的重要性，使用整数值来对其进行排序。如果您没有在配置中指定任何内容，则使用默认值：
        - <font color=red>ALL < TRACE < DEBUG < INFO < WARN < ERROR < FATAL < MARK < OFF</font>（OFF是用来关闭日志记录的，不是日志记录的一个级别。如果使用了 OFF，则不需要调用 logger.off('some log message')来关闭日志。）
    - 这里定义的级别除了默认级别外，还可以用整数值来确定它们与默认级别的关系。

      - 如果您定义的级别与默认级别相同，那么 config 中的整数值是优先级更高的。
      - 级别的名称必须以字母开头，并且只能包含字母、数字和下划线。

- appenders (object)：将命名 appender（string）映射到 appender definitions （object）的 map。appender definitions 必须有一个属性 type（string），其他属性依赖于 appender type。

- categories (object)：将命名 categories （string）映射到 category definitions（object）。你需要定义默认类别 category 用于所有与特定类别不匹配的日志事件。
    - 类别定义 category definitions 有两个属性：
        - appenders (array of strings)：在这个 category 类别中使用的 appender 名称列表。一个 category 类别中至少要有一个 appender
        - level (string, 不区分大小写)：这个 category 类别将给 appender 发送最小的日志级别。例如：如果设置成“error”，那么 appender 将只会收到级别为‘error’, ‘fatal’, ‘mark’的日志事件，日志事件为‘info’, ‘warn’, ‘debug’, ‘trace’的将会被忽略。

- pm2 (可选, boolean)：
    - 若您的 app 使用了 pm2，则这里必须设置为true，否则日志将不会工作（另外您还得下载 pm2-intercom作为 pm2模块: pm2 install pm2-intercom）
- pm2InstanceVar (string, 可选) (默认 ‘NODE_APP_INSTANCE’)：如果您使用pm2并更改了默认名称，则这里必须要设置。
- disableClustering (boolean, 可选)：
    - true：使用的 log4js 忽略集群环境（clustered environments）或者你在 pm2 日志中遇到了麻烦。每一个工作进程都将进行自己的日志记录。请小心使用这里如果你要把日志记录输出到文件。

#### Loggers

log4js.getLogger([category]) ：

- 此函数接受一个可选的字符串参数，以表示要在这个记录器上使用日志事件的类别。如果没有指定类别，则事件将被路由到默认类别的 appender 上。
- 返回一个 Logger 对象，它的级别设置为 config 中指定的级别，并实现下列功能：
    - <level>(args...)：可以是任何级别的小写名称（包括定义的任何定制级别）。例如：logger.info('some info')将用信息级别发送一个日志事件。如果您使用的是基本的、彩色的或通过布局传递的消息，那么日志字符串将会委托给util.format来定义格式（占位符，如%s、%d等）。
    - is<level>Enabled()：如果一个 level（驼峰命名） 级别的日志事件将被发送到为 logger 类别定义的 appender 上，则返回true。例如：logger.isInfoEnabled()将返回 true如果事件的级别是 INFO或者低于INFO。
    - addContext(<key>,<value>)：<key>是一个字符串，<value>可以是任意类型。这会存储一个键-值对，它被会添加到 appender 生成的所有日志事件中。
        - 用途：通过您的应用程序添加用于跟踪用户的 id。目前，只有 logFaces appender才会使用上下文值。
    - removeContext(<key>)：从上下文删除先前定义的键值对。
    - clearContext()：从 appender 中删除所有上下文对。

#### Logger 对象

Properties:

- level：log4js 级别或一个与级别（‘info’, ‘INFO’）匹配的字符串。允许覆盖这个日志的配置级别。改变这个值适用于同一类别的所有日志记录。

#### Shutdown

log4js.shutdown(cb)：

接受一个回调，当 log4js 关闭所有 appender 并完成写日志事件时，它将被调用。当您的程序退出时，请使用此函数来确保所有的日志都被写入文件，套接字被关闭，等等。

#### Custom Layouts

log4js.addLayout(type, fn)：添加用户定义的布局函数。更多详情
