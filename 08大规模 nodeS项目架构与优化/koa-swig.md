1. 安装koa-swig

    > npm install koa-swig

    > npm install co //koa2依赖

2. 引入库app.js

    > var render = require('koa-swig');

3. 配置
    ```
    app.context.render = co.wrap(render({
        root: __dirname + '/views',
        autoescape: true,
        cache: 'memory', // disable, set to false
        ext: 'html'
    }));
    ```

#### 前台页面的渲染

1. 继承layout.html页面的内容

    - index.html页面代码

    ```
    {% extends 'layout.html' %}

    {% block title %} {{title}} {% endblock%}

    {% block cotent %} <p> 测试</p> {% endblock %}
    ```
    - layout.html页面代码

2. 也可以在页面中引入其它的页面

    ```
    {% include "login.html" %}
    ```

    你可以标记 ignore missing，这样如果模板不存在，也不会抛出错误

    ```
    {% include "foobar.html" ignore missing %}
    ```

    如果想把本地声明的变量引入到包含的模板种，可以使用 with 参数来把后面的对象创建到包含模板的上下文中

    ```
    {% set foo = { bar: "baz" } %}
    {% include "inc.html" with foo %}
    {% for bar in thing %}
        {% include "inc.html" with bar %}
    {% endfor %}
    ```

3. 变量过滤器
    1. demo
    ```
    {{ name|title }} was born on {{ birthday|date('F jS, Y') }}
    and has {{ bikes|length|default("zero") }} bikes.
    ```
    也可以使用 filter 标签来为块内容添加过滤器
    ```
    {% filter upper %}oh hi, paul{% endfilter %}
    ```
    2. 内置过滤器
    ```
    add(value)：使变量与value相加，可以转换为数值字符串会自动转换为数值。
    addslashes：用 \ 转义字符串
    capitalize：大写首字母
    date(format[, tzOffset])：转换日期为指定格式
    format：格式
    tzOffset：时区
    default(value)：默认值（如果变量为undefined，null，false）
    escape([type])：转义字符
    默认： &, <, >, ", '
    js: &, <, >, ", ', =, -, ;
    first：返回数组第一个值
    join(glue)：同[].join
    json_encode([indent])：类似JSON.stringify, indent为缩进空格数
    last：返回数组最后一个值
    length：返回变量的length，如果是object，返回key的数量
    lower：同''.toLowerCase()
    raw：指定输入不会被转义
    replace(search, replace[, flags])：同''.replace
    reverse：翻转数组
    striptags：去除html/xml标签
    title：大写首字母
    uniq：数组去重
    upper：同''.toUpperCase
    url_encode：同encodeURIComponent
    url_decode：同decodeURIComponemt
    ```
    3. 自定义过滤器

    创建一个 myfilter.js 然后引入到 Swig 的初始化函数中
    ```
    swig.init({ filters: require('myfilters') });
    ```

    在 myfilter.js 里，每一个 filter 方法都是一个简单的 js 方法，下例是一个翻转字符串的 filter：
    ```
    exports.myfilter = function (input) {
        return input.toString().split('').reverse().join('');
    };
    ```

    你的 filter 一旦被引入，你就可以向下面一样使用：
    ```
    {{ name|myfilter }}
        {% filter myfilter %}
        I shall be filtered
    {% endfilter %}
    ```
    4. 条件语句
    ```
    {% for x in y %}
        {% if loop.first %}<ul>{% endif %}
            <li>{{ loop.index }} - {{ loop.key }}: {{ x }}</li>
        {% if loop.last %}</ul>{% endif %}
    {% endfor %}
    ```

    ```
    loop.index：当前循环的索引（1开始）
    loop.index0：当前循环的索引（0开始）
    loop.revindex：当前循环从结尾开始的索引（1开始）
    loop.revindex0：当前循环从结尾开始的索引（0开始）
    loop.key：如果迭代是对象，是当前循环的键，否则同 loop.index
    loop.first：如果是第一个值返回 true
    loop.last：如果是最后一个值返回 true
    loop.cycle：一个帮助函数，以指定的参数作为周期
    ```
    在 for 标签里使用 else
    ```
    {% for person in people %}
        {{ person }}
    {% else %}
        There are no people yet!
    {% endfor %}
    ```
    if：条件语句
    - 参数：接受任何有效的 JavaScript 条件语句，以及一些其他人类可读语法
    ```
    {% if x %}{% endif %}
    {% if !x %}{% endif %}
    {% if not x %}{% endif %}
    {% if x and y %}{% endif %}
    {% if x && y %}{% endif %}
    {% if x or y %}{% endif %}
    {% if x || y %}{% endif %}
    {% if x || (y && z) %}{% endif %}
    {% if x [operator] y %}
        Operators: ==, !=, <, <=, >, >=, ===, !==
    {% endif %}
    {% if x == 'five' %}
        The operands can be also be string or number literals
    {% endif %}
    {% if x|length === 3 %}
        You can use filters on any operand in the statement.
    {% endif %}
    {% if x in y %}
        If x is a value that is present in y, this will return true.
    {% endif %}
    ```
    else 和 else if
    ```
    {% if foo %}
        Some content.
    {% else if "foo" in bar %}
        Content if the array `bar` has "foo" in it.
    {% else %}
        Fallback content.
    {% endif %}
    ```
    autoescape：改变当前变量的自动转义行为
    - 参数on：当前内容是否转义
    - 参数type：转义类型，js 或者 html，默认 html

    假设
    ```
    some_html_output = '<p>Hello "you" & \'them\'</p>';
    ```

    然后
    ```
    {% autoescape false %}
        {{ some_html_output }}
    {% endautoescape %}
    {% autoescape true %}
        {{ some_html_output }}
    {% endautoescape %}
    {% autoescape true "js" %}
        {{ some_html_output }}
    {% endautoescape %}
    ```

    set：设置一个变量，在当前上下文中复用
    - 参数name：变量名
    - 参数=：语法标记
    - 参数value：变量值
    ```
    {% set foo = [0, 1, 2, 3, 4, 5] %} {% for num in foo %}
        <li>{{ num }}</li>
    {% endfor %}
    ```

    macro：创建自定义可服用的代码段
    - 参数...: 用户定义
    ```
    {% macro input type name id label value error %}
    <label for="{{ name }}">{{ label }}</label>
    <input type="{{ type }}" name="{{ name }}" id="{{ id }}" value="{{ value }}"{% if error %} class="error"{% endif %}>
    {% endmacro %}
    ```

    然后像下面使用
    ```
    <div>
        {{ input("text", "fname", "fname", "First Name", fname.value, fname.errors) }}
    </div>
    <div>
        {{ input("text", "lname", "lname", "Last Name", lname.value, lname.errors) }}
    </div>
    ```

    输出如下
    ```
    <div>
        <label for="fname">First Name</label>
        <input type="text" name="fname" id="fname" value="Paul">
    </div>
    <div>
        <label for="lname">Last Name</label>
        <input type="text" name="lname" id="lname" value="" class="error">
    </div>
    ```

    import：允许引入另一个模板的宏进入当前上下文
    - 参数file：引入模板相对模板 root 的相对路径
    - 参数as：语法标记 var: 分配给宏的可访问上下文对象
    ```
    {% import 'formmacros.html' as form %}
    {# this will run the input macro #}
        {{ form.input("text", "name") }}
        {# this, however, will NOT output anything because the macro is scoped to the "form"     object: #}
    {{ input("text", "name") }}
    ```

    spaceless：尝试移除html标签间的空格
    ```
    {% spaceless %}
        {% for num in foo %}
            <li>{{ loop.index }}</li>
        {% endfor %}
    {% endspaceless %}
    ```