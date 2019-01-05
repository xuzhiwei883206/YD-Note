已经有越来越多的观点认为直接使用 node packages，与他们提供的命令行界面，是一个好的路线。反之，将功能抽象到任务运行器后台运行已经越来越不被看好。在一定程度是，你无论如何都要使用npm，而同时npm提供了脚本功能，为什么不用呢？但使用npm的脚本功能的原因有很多。Damon会帮我们理解这样做的原因，并确切的告诉我们如何通过这种方式来完成前端构建过程中的大部分重要任务。

在过去的大概六个月里，我已经开始在我的项目中使用 npm scripts 。在此之前，我使用 Gulp ，再之前是 Grunt 。他们给了我很好的功能，通过自动化帮助我做了许多原先需要我手工做的事情，并且更快更有效地执行我的工作。但是我却开始觉得我在这些工具上花费的精力要比花在我自己代码上的精力多得多。

Grunt，Gulp，Broccoli，Brunch等类似的工具都需要你把你的任务配置成适合他们的范例和配置。每个工具你需要学习他们自己的语法，奇怪的用法和特有的方法。这增加了代码复杂性，构建复杂性，使您专注于修复工具的问题，而不是编写代码。

这些构建工具依赖于于包装了核心命令行工具的插件。并基于这个核心工具做了进一步的抽象，这意味着更多的潜在的问题会发生。

以下三个问题我已经碰到过多次：
如果您使用的命令行工具没有你想用的插件，那么你将束手无策（除非你自己写一个）。
您尝试使用的插件包含要使用的旧版本的工具。您使用的插件和当前版本的核心工具之间，功能和文档并不匹配。
错误不是处理得好。如果插件失败的话，它可能不会传递来自核心工具的错误提示，这导致我很沮丧，并且不知道如何调试的问题。
但是，请记住…
让我说：如果你对你当前的构建系统感到满意，并且它能够很好的完成你的需求的话，你可以继续使用它！虽然 npm scripts 越来越流行，但这并不意味着你应该马上转过来。继续专注于编写代码，而不是学习更多的工具。如果你开始感觉到不是你在使用工具，而是工作在使用你的时候，这是我建议考虑使用 npm scripts。

如果您决定要调研或开始使用 npm scripts ，那么继续阅读！ 在这篇文章的其余部分，你会发现很多案例任务。此外，我已经为所有这些任务创建了 npm-build-boilerplate 示例项目，你可以用作一个学习的起点。让我们开始吧！

编写 npm scripts
我们将大部分时间花在 package.json 文件中。这个文件包含了我们所有的依赖和脚本。这里是一个示例项目的精简版本：

{
  "name": "npm-build-boilerplate",
  "version": "1.0.0",
  "scripts": {
    ...
  },
  "devDependencies": {
    ...
  }
}
我们将一起来构建我们的 package.json 文件。我们的脚本会进入 scripts 对象，我们要使用的任何工具都将被安装并放入 devDependencies 对象中。

在我们开始之前，这里是示例项目的结构，我将在整篇文章中提到：



将SCSS编译为CSS
我是SCSS的铁粉，所以工作中我经常使用SCSS。要将SCSS编译为CSS，我使用了 node-sass 。首先，我们需要安装 node-sass ;

通过在命令行中运行以下命令来执行此操作：

npm install --save-dev node-sass
这个命令将会在当前目录中安装 node-sass 并将其添加到 package.json 的 devDependencies 对象中。当其他人运行您的项目时，这个特别有用，因为他们将拥有使项目运行所需的一切。一旦安装，我们可以在命令行中使用它：

node-sass --output-style compressed -o dist/css src/scss
让我们分解一下这个命令的作用。从结束的地方开始，他的意思是：在 src/scss 目录中查找所有的SCSS文件;输出（ -o 标识）编译的CSS到 dist/css 目录;压缩输出（使用带有 compressed 选项的 --output-style 标识）。

现在我们知道了 node-sass 在命令行中如何工作，让我们把这个命令行移动到 npm scirpt 中。 在你的 package.json 的 scripts 对象中，添加如下内容:

"scripts": {
  "scss": "node-sass --output-style compressed -o dist/css src/scss"
}
现在，回到命令行并运行：

npm run scss
您将看到与在命令行中直接运行 node-sass 命令相同的输出结果。

我们在本文的剩余部分创建的任何一个npm script，你任何时候都可以像上面的命令一样运行它。
只需将 scss 替换为你要运行的任务的名称即可。

正如你将看到的，我们使用的很多命令行工具都有很多的配置项，你可以使用配置项来精确完成你想要做的工作。

你可以使用配置项它完全看到合适。

例如，下面是列表。下面是一个不同的设置，演示如何传递多个选项：

"scripts": {
  "scss": "node-sass --output-style nested --indent-type tab --indent-width 4 -o dist/css src/scss"
}
使用PostCSS Autoprefix 自动给 CSS 加前缀
现在我们已经能够将Scss编译为CSS了，我们可以使用 Autoprefixer 和 PostCSS自动添加浏览器前缀。 我们可以同时安装多个 Node 模块，用空格分隔它们：

npm install --save-dev postcss-cli autoprefixer
我们需要安装两个模块，因为 PostCSS 默认情况下不执行任何操作。它依赖于其他插件，比如 Autoprefixer ，来操纵你提供的CSS。

安装并保存必要的工具到 devDependencies ，在您的 scripts 对象中添加一个新任务：

"scripts": {
  ...
  "autoprefixer": "postcss -u autoprefixer -r dist/css/*"
}
这个任务的意思是：嘿, postcss ，使用（ -u 标识） autoprefixer 替换（ -r 标志） dist/css 中的任何 .css 文件, 给他们自动添加浏览器前缀。 就是这样简单！ 需要更改 autoprefixer 的默认浏览器支持？ 只要给脚本添加如下代码即可:

"autoprefixer": "postcss -u autoprefixer --autoprefixer.browsers '> 5%, ie 9' -r dist/css/*"
同样，有很多选项可以用来配置自己的构建： postcss-cli 和 autoprefixer 。

JavaScript 代码检查
在编写代码的同时，保持标准格式和样式很重要，它可以确保将错误降低到最低程度，并提高开发人员的效率。“Linting（代码检查）”可以帮助我们自动完成这项工作，所以让我们使用 eslint 来进行 JavaScript 代码检查。

如上文所述，安装 eslint 包; 这一次，让我们使用一个快捷方式：

npm i -D eslint
这行代码等效于：

npm install --save-dev eslint
一旦安装完成后，我们可以使用 eslint 来设置一些运行代码的基本规则。 运行以下命令启动向导：

eslint --init
愚人码头注：这样直接使用会抛错eslint找不到，因为这种使用方法必须通过 npm install i -g eslint 全局方式安装;

我建议选择“回答关于你的风格的问题”，并回答它问的问题。 这将在您的项目的根目录中生成一个新文件，eslint将检查您的代码。

现在，让我们在 package.json 的 scripts 对象中添加一个 lint 任务：

"scripts": {
  ...
  "lint": "eslint src/js"
}
我们的lint任务仅有13个字符长！ 它会在 src/js 文件夹中查找所有的JavaScript文件，并根据之前生成的规则进行代码检测。

混淆压缩 JavaScript 文件
让我们来合并和压缩我们的JavaScript文件，我们可以使用 uglify-js 来做这项工作。 首先我们需要安装 uglify-js ：

npm i -D uglify-js
然后，我们可以在 package.json 中设置 混淆压缩(uglify) 任务：

"scripts": {
  ...
  "uglify": "mkdir -p dist/js && uglifyjs src/js/*.js -m -o dist/js/app.js"
}
npm scripts 其中一个伟大的功能是，它们本质上是一个命令行任务的别名，你可以重复执行。这意味着您可以在 npm scripts 中直接使用标准命令行代码！此任务使用两个标准命令行功能， mkdir 和 &amp;&amp; 。

这个任务的前半部分， mkdir -p dist/js 意思是说：当 dist/js 目录结构不存在（ -p 标识）时，那就创建 dist/js 目录结构（使用 mkdir 命令）。一旦成功完成，运行 uglifyjs 命令。 &amp;&amp; 允许你将多个命令连接在一起，如果前一个命令成功完成，就按顺序运行下一个命令。

这个任务的第二部分告诉 uglifyjs 从 src/js/ 中的所有JS文件（ *.js ）开始，应用 mangle 命令（ -m 标识），并将结果输出到 dist/js/app.js 中。

让我们更新我们的 uglify 任务来创建一个压缩版的 dist/js/app.js 。链接另一个 uglifyjs 命令并传递 compress （ -c 标识）：

"scripts": {
  ...
  "uglify": "mkdir -p dist/js && uglifyjs src/js/*.js -m -o dist/js/app.js && uglifyjs src/js/*.js -m -c -o dist/js/app.min.js"
}
压缩图片
让我们把注意力转到压缩图片上。根据 httparchive.org 的数据统计，在互联网上前1000个URL的平均页面大小为 1.9 MB， 其中图片占了 1.1 MB 。您可以做的提升页面速度的最好办法就之一是减少图片的大小。

安装 imagemin-cli ：

npm i -D imagemin-cli
Imagemin非常棒，因为它以压缩大多数类型的图片，包括GIF，JPG，PNG和SVG。 你可以传递整个图片文件夹，它会压缩该文件夹中所有的图片，像这样：

"scripts": {
  ...
  "imagemin": "imagemin src/images dist/images -p",
}
这个任务告诉 imagemin 查找和压缩 src/images 目录中的所有图片，并将它们放在 dist/images 中。传递 -p 标志在允许的情况下将图片处理成渐进图片。

SVG精灵（Sprites）
在过去几年里，关于围绕SVG的讨论逐渐增加了，并且使用 SVG 有很多好的理由。 他们在所有的设备上保持松散结构、可通过CSS编辑、对读屏软件友好。然而，SVG编辑软件通常会留下无关而且不必要的代码。幸运的是， svgo 可以帮助删除所有的冗余信息（我们将在下面安装它）。

您还可以自动化合并和精灵化SVG，来制作一个单一的SVG文件。

为了自动化整个过程，我们可以安装 svg-sprite-generator 。

npm i -D svgo svg-sprite-generator
这种模式现在你可能已经很熟悉了：一旦安装完成，在你的 package.json 的 scripts 对象中添加一个任务：

"scripts": {
  ...
  "icons": "svgo -f src/images/icons && mkdir -p dist/images && svg-sprite-generate -d src/images/icons -o dist/images/icons.svg"
}
注意： icons 任务通过两个 &amp;&amp; 指令做了三件事。首先，我们使用 svgo ，传递一个包含SVG的文件夹（ -f 标识）；这将压缩文件夹内的所有SVG。其次，如果 dist/images 文件夹内不存在，我们将创建该文件夹内（使用 mkdir -p 命令）。

最后，我们使用 svg-sprite-generator ，传递一个SVG文件夹内（ -d 标识）和我们想让SVG精灵输出的一个文件夹内路径，（ -o 标识）。

通过BrowserSync提供服务并且自动注入变更
最后一个难题是 BrowserSync 。它可以做的一些事情：启动一个本地服务，向连接的浏览器自动注入更新的文件，并同步浏览器的点击和滚动。安装它并添加任务：

npm i -D browser-sync
"scripts": {
  ...
  "serve": "browser-sync start --server --files 'dist/css/*.css, dist/js/*.js'"
}
默认情况下，我们的 BrowserSync 任务使用当前路径作为启动服务器的根目录（ --server 标识）。 --files 标志告诉 BrowserSync 监视 dist 文件夹中的任何CSS或JS文件;每当有任何变化时，自动将更改的文件注入页面。

您可以同时打开多个浏览器（即使在不同的设备上），他们都将会获得实时更新的文件变化！

任务分组
有了上面的所有任务，我们能够：

将SCSS编译为CSS并自动添加浏览器前缀
检查 和 混淆压缩 JavaScript
压缩图片
将SVG的文件夹转换为单个SVG文件
启动本地服务并自动将更改注入连接到服务器的任何浏览器
还不止如此！

合并 CSS 任务

让我们添加一个任务，合并两个CSS相关的任务（预处理 Sass 和运行 Autoprefixer ），这样我们就不必分别运行每个任务：

"scripts": {
  ...
  "build:css": "npm run scss && npm run autoprefixer"
}
当你运行 npm run build:css 时，它会告诉命令行运行 npm run scss ; 当它成功完成后，然后（ &amp;&amp; ）运行 npm run autoprefixer 。

类似于 build:css 任务一样，我们可以把JavaScript任务也合并到一起以方便执行：

合并 JavaScript 任务

"scripts": {
  ...
  "build:js": "npm run lint && npm run uglify"
}
现在，我们可以通过 npm run build:js 来一步进行代码检测、合并和压缩JavaScript代码了！

合并剩余任务

对于图片任务，我们可以做同样的事情，以及将所有构建任务合并为一个任务的执行：

"scripts": {
  ...
  "build:images": "npm run imagemin && npm run icons",
  "build:all": "npm run build:css && npm run build:js && npm run build:images",
}
监听变更
直到这一步，当我们需要更改某一文件时，我们需要切换回命令行并运行相应的任务。 我们可以做的最有用的事情之一是添加一个任务，监视文件更改时自动运行任务。 为此，我建议使用 onchange 。 像往常一样安装：

npm i -D onchange
让我们为 CSS 和 JavaScript 设置监听(watch)任务：

"scripts": {
  ...
  "watch:css": "onchange 'src/scss/*.scss' -- npm run build:css",
  "watch:js": "onchange 'src/js/*.js' -- npm run build:js",
}
以下是这些任务的明细： onchange 希望您传递一个要监听文件的路径字符串。我们将通过我们的 SCSS 和 JS 源文件来监听。我们要运行的命令在 -- 之后，当给定路径中的任何一个文件被添加，更改或删除的时候，这些任务就会被立即执行。

让我们再添加一个监听(watch)命令来完成我们的npm scripts构建过程。
安装一个软件包， parallelshell ：

npm i -D parallelshell
再次在 scripts 对象中添加一个新任务：

"scripts": {
  ...
  "watch:all": "parallelshell 'npm run serve' 'npm run watch:css' 'npm run watch:js'"
}
parallelshell 接受多个字符串，我们将会执行多个 npm run 任务。

为什么使用 parallelshell 来合并多个任务，而不是像以前一样，在任务中使用 &amp;&amp; 呢？起初，我也尝试这么做了。 问题是 &amp;&amp; 将多个命令链接在一起，需要等待每个命令成功完成后才会执行下一个命令。但是，由于我们正在运行 watch 命令，这些命令永远不会完成(愚人码头注：一直在监听中，不会结束)！我们会陷入一个无限循环中。

因此，使用 parallelshell 可以同时运行多个监听(watch)命令。

这个任务使用了BrowserSync的 npm run serve 任务启动了一个服务，然后对 CSS 和 JavaScript 文件执行了监听(watch)命令，一旦CSS或JavaScript文件有更改，监听(watch)任务就会执行相应的构建（build）任务。由于BrowserSync被设置成监控 dist 目录下的变更，所以它会自动的向相关联的URL内注入新的文件，真是太棒了！

其他实用任务
npm有 大量实用的任务 ，让我们使用其中一个构建的脚本再写一个任务。

"scripts": {
  ...
  "postinstall": "npm run watch:all"
}
当你在命令行中执行 npm install 后， postinstall 会立即执行，当团队合作时这个功能非常有用。当别人复制了你的项目并运行了 npm install 的时候，我们的 watch:all 任务就会马上执行，它们将自动启动服务器，打开浏览器窗口，并且监听(watch)文件是否有更改。

打包
太棒了！我们做到了！我希望你能够学到一些使用npm scripts构建过程和常用命令行的方法。

为了防止你错过某些知识点，我创建了一个包含所有这些任务的 npm-build-boilerplate 示例项目，你可以用作学习的起点。如果您有问题或意见，请在 twitter上@我 或发表评论。我会尽我所能的帮助您！

原文中一些有用的评论
愚人码头注：这部分是原文的评论，作为对文章的补充。

Sean Walsh 评论：

切换到 npm scripts 非常好，但是如果你正在维护一个开源项目并希望最大化贡献，请确保您的脚本也能在非 *nix 机器上运行。跨平台最大的难点是设置环境变量（例如 NODE_ENV ）。 better-npm-run 是一个很好的库来处理这个问题。

> Louis-rémi 回复评论：

> 另一个问题是注释你的代码，并保持其可读性和可维护性。我已经建立了 gulp-shelter ,可以使 npm scripts 和 gulpfiles 很好的结合，而不需要重复造轮子。

Craig Jennings 评论：我发现 npm-run-all 是非常有用的，可以代替 parallelshell 。它允许在任务执行时重新这些执行任务（愚人码头注：不用等带任务成功完成），比如：

"scripts": {
  ...
  "serve": "browser-sync start --server --files 'dist/css/*.css, dist/js/*.js'",
  "watch:css": "onchange 'src/scss/*.scss' -- npm run build:css",
  "watch:js": "onchange 'src/js/*.js' -- npm run build:js",
  "watch": "npm-run-all --parallel serve watch:*"
}
对于构建步骤也是如此：

"scripts" {
  ...
  "build:css": "npm run scss && npm run autoprefixer",
  "build:images": "npm run imagemin && npm run icons",
  "build:js": "npm run lint && npm run uglify",
  "build": “npm-run-all build:*"
}
Michael 评论： 关于Sass Sourcemaps

“min-sass”: “node-sass resources/sass/main.scss | cleancss -o public/stylesheets/main.min.css –source-map”

npm run min-sass

Christopher 回复评论： ‘mkdir’ 和 ‘rm’ 在 Windows 下步工作？

可以使用 rimraf 和 mkdirp


参考：http://www.open-open.com/lib/view/open1487819024678.html
