
Unix domain socket

> **Unix domain socket 又叫 IPC(inter-process communication 进程间通信) socket，用于实现同一主机上的进程间通信。**

socket 原本是为网络通讯设计的，但后来在 socket 的框架上发展出一种 IPC 机制，就是 UNIX domain socket。虽然网络 socket 也可用于同一台主机的进程间通讯(通过 loopback 地址 127.0.0.1)，但是 UNIX domain socket 用于 IPC 更有效率：不需要经过网络协议栈，不需要打包拆包、计算校验和、维护序号和应答等，只是将应用层数据从一个进程拷贝到另一个进程。这是因为，**IPC 机制本质上是可靠的通讯，而网络协议是为不可靠的通讯设计的。**

UNIX domain socket 是全双工的，API 接口语义丰富，相比其它 IPC 机制有明显的优越性，目前已成为使用最广泛的 IPC 机制，比如 X Window 服务器和 GUI 程序之间就是通过 UNIX domain socket 通讯的。

Unix domain socket 是 POSIX 标准中的一个组件，所以不要被名字迷惑，linux 系统也是支持它的。

https://www.cnblogs.com/sparkdev/p/8359028.html

IP socket

> IP socket要利用主机的传输层(**tcp**)，可以用于同一台主机上不同进程间的通信，也可以用于网络上不同主机间的通信。

