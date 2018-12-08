npm install webpack -g
npm install --save-dev webpack
npm install --save-dev webpack

####配置package
"prod": "webpack --mode production",
"dev": "webpack --mode development"

touch .babelrc
npm install babel-preset-env --save-dev

#### 配置
webpack webpack.config.js
- entry:配置入口资源
- output:配置编译后的资源
- module:资源处理
- resolve:配置资源别名/扩展名等
- plugins：插件，比loader更强大

npm install html-webpack-plugin --save-dev
npm install style-loader --save
npm install css-loader --save
npm install --save-dev babel-core babel-loader babel-preset-env babel-preset-react