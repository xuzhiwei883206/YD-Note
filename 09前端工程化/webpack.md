npm install webpack -g

npm install --save-dev webpack

webpack webpack.config.js

#### 配置
- entry:配置入口资源
- output:配置编译后的资源
- module:资源处理
- resolve:配置资源别名/扩展名等
- plugins：插件，比loader更强大

npm install html-webpack-plugin --save-dev
npm install style-loader --save
npm install css-loader --save
npm install --save-dev babel-core babel-loader babel-preset-env babel-preset-react