#### 分块编码（Transfer-Encoding: chunked）https://www.cnblogs.com/xuehaoyue/p/6639029.html
- 参考链接：
    - HTTP 协议中的 Transfer-Encoding  http://network.51cto.com/art/201509/491335.htm
    - 分块传输编码 https://zh.wikipedia.org/wiki/%E5%88%86%E5%9D%97%E4%BC%A0%E8%BE%93%E7%BC%96%E7%A0%81

1. 背景：

    - 持续连接的问题：对于非持续连接，浏览器可以通过连接是否关闭来界定请求或响应实体的边界；而对于持续连接，这种方法显然不奏效。有时，尽管我已经发送完所有数据，但浏览器并不知道这一点，它无法得知这个打开的连接上是否还会有新数据进来，只能傻傻地等了。
    - 用Content-length解决：计算实体长度，并通过头部告诉对方。浏览器可以通过 Content-Length 的长度信息，判断出响应实体已结束
    - Content-length引入的新问题：由于 Content-Length 字段必须真实反映实体长度，但是对于动态生成的内容来说，在内容创建完之前，长度是不可知的。这时候要想准确获取长度，只能开一个足够大的 buffer，等内容全部生成好再计算。但这样做一方面需要更大的内存开销，另一方面也会让客户端等更久。
    - 我们需要一个新的机制：不依赖头部的长度信息，也能知道实体的边界——分块编码（Transfer-Encoding: chunked）


2. 分块编码（Transfer-Encoding: chunked）

    - Transfer-Encoding，是一个 HTTP 头部字段（响应头域），字面意思是「传输编码」。最新的 HTTP 规范里，只定义了一种编码传输：分块编码(chunked)。
    - <font color=red>分块传输编码（Chunked transfer encoding）是超文本传输协议（HTTP）中的一种数据传输机制，允许HTTP由网页服务器发送给客户端的数据可以分成多个部分。分块传输编码只在HTTP协议1.1版本（HTTP/1.1）中提供。</font>
    - 数据分解成一系列数据块，并以一个或多个块发送，这样服务器可以发送数据而不需要预先知道发送内容的总大小。
    - 具体方法
        - 在头部加入 Transfer-Encoding: chunked 之后，就代表这个报文采用了分块编码。这时，报文中的实体需要改为用一系列分块来传输。
        - 每个分块包含十六进制的长度值和数据，长度值独占一行，长度不包括它结尾的 CRLF(\r\n)，也不包括分块数据结尾的 CRLF。
        - 最后一个分块长度值必须为 0，对应的分块数据没有内容，表示实体结束。
            ```
                例：
                HTTP/1.1 200 OK
                Content-Type: text/plain
                Transfer-Encoding: chunked

                25\r\n
                This is the data in the first chunk\r\n

                1C\r\n
                and this is the second one\r\n

                3\r\n
                con\r\n

                8\r\n
                sequence\r\n

                0\r\n
                \r\n

                Content-Encoding 和 Transfer-Encoding 二者经常会结合来用，其实就是针对 Transfer-Encoding 的分块再进行 Content-Encoding压缩。
            ```