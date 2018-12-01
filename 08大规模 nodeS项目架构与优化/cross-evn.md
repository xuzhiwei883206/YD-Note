cross-env**能跨平台地设置及使用环境变量**

大多数情况下，在windows平台下使用类似于: NODE_ENV=production的命令行指令会卡住，windows平台与POSIX在使用命令行时有许多区别（例如在POSIX，使用$ENV_VAR,在windows，使用%ENV_VAR%。。。）

cross-env让这一切变得简单，不同平台使用唯一指令，无需担心跨平台问题

npm安装方式

npm i --save-dev cross-env

在npm脚本(多是package.json)里这么配置

{
  "scripts": {
    "build": "cross-env NODE_ENV=production webpack --config build/webpack.config.js"
  }
}
运行npm run build，这样NODE_ENV便设置成功，无需担心跨平台问题