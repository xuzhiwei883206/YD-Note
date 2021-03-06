
#### SEO

<font color=#ff0000>SEO</font>是由英文 **Search Engine Optimization** 缩写而来， 中文意译为“**搜索引擎优化**”。SEO 是指通过对网站进行站内优化和修复(网站Web结构调整、网站内容建设、网站代码优化和编码等)和站外优化，从而提高网站的网站关键词排名以及公司产品的曝光度。通过搜索引擎查找信息是当今网民们寻找网上信息和资源的主要手段。而 <font color=#ff0000>SEM</font> (**Search Engine Marketing**)**搜索引擎营销** ，就是根据用户使用搜索引擎的方式，利用用户检索信息的机会尽可能将营销信息传递给目标用户。在目前企业网站营销中，<font color=#ff0000>**SOM（SEO+SEM）**</font>模式越来越显重要。

在责任上， SEO应该是 <font color=#1C86EE>站点开发者</font> 、<font color=#1C86EE>站点运营者</font> 、<font color=#1C86EE>搜索引擎</font>三者共同完成的。站点开发者做好页面结构科学、标签语义化、站点路由精简、提供必要的爬虫信息（如 Robot.txt，Sitemap，标签 role，ref 等等）；运营人员负责关键词选取、原创内容、出入友链及 SEO 服务购买；搜索引擎开发者负责爬虫开发、数据清洗、分析、排序、存储及其它产品性功能。

在现实环境中，现阶段 <font color=#ff0000>CSR</font> 客户端渲染 (**Client Side Rendering**) 大行其道，SPA 站点层出不穷，用户体验得到了质的升级、开发者效率有了长足的提升，使用前端路由技术也让用户感知不到 CSR 与<font color=#1C86EE>SSR</font>(Client Side Rendering) 区别，该给爬虫的路由给好了，该给爬虫的 hints 给够了，可爬虫就是要 html 文本，很气！路由 + hints + js 就已经包含爬虫需要的所有信息了，可 为了兼顾 SEO， 开发者不得不为爬虫提供专门的 shadow site，或者自己定期下载自己的页面提供给爬虫，或者使用 SSR，有种回归原始社会、天堂掉落地狱，为“弱智”的爬虫喂饭的感觉。

从技术角度上看，现代的前端测试框架已经可以测试页面功能、异步资源；也有 PhantomJS、Headless Browser 技术；甚至高校的学生也能做到为爬虫提供解析动态脚本的能力。惟有虑者，就是爬虫工具大规模应用脚本解析与 BOM 和 DOM 模拟时的性能问题或者是在虚拟机上运行浏览器的开销与复杂性问题，窃以为，这不是无解并不能优化的，加速设备、探索高效的技术方案都是路子，何况搜索引擎公司还有整天围着爬虫转的专职工程师。既然可迈着步子面向未来做无人车、人工智能，以之为基石的爬虫技术却不能满足现代 web 技术的需求，难免要叫人吐槽 SEO 界的主要矛盾之一是日益精进的现代 web 开发技术与落后不知进取的爬虫技术的矛盾。

固然可以反驳 CSR 成型才几年，可谷歌推出 Gmail 可是 2007 年，爬虫开发者们应该有为日后大行 SPA 之今日做准备的前瞻性。毕竟他们的 AI 已经可以识别语音、图像了，却对 CSR 的网页束手无策实在讽刺，一点不像推崇人工智能的公司的感觉。在现在及未来，还有一些用 CSS 特性实现的站点，爬虫们似乎更是绝不 care 了（固然这样的站点 Accessibility 极差，不过健全人是能识别的！按下不表）。

私以为，使用 SSR 合理的考量是为了加速页面渲染（此点有待商榷并和站点实际情况相关），浏览器兼容，A/B 测试等情况。为了 SEO 不得不给 CSR 站点加上 SSR 真有种让开发者嘴上说道「搜索引擎您真是大爷，我准备了 SSR 好好伺候您」，OS却是「老子还要迁就这搜索引擎的破技术，你跑一下我的 JS 不就拿到 HTML 了吗，你觉得麻烦咋不直接要我自己写爬虫自己清洗数据自己去你的网站填数据库呢」的不服气又不得不妥协的无力感呢！

站在开发者角度，当然是希望搜索引擎更新抓取技术，把JS执行一遍抓取内容，但是站在搜索引擎的角度，要能执行JS抓内容那么简单当年早就把flash的内容执行抓了。其实搜索引擎需要的是数据，从HTML解析文本可以拿到，这种方法简单可靠，执行JS再拿理论上也可以拿到，但是太复杂，而且CSR的路由是借助HTML的伪链实现的，根本不是啥正规URL，真要抓内容，不如直接定义API规范，让搜索引擎调API取数据，连解析都省了。