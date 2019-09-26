#### proxy

##### 基本概念

* proxy（代理）简单理解就是代理他人行事。

  为什么需要代理：1. 被代理对象不想直接被访问 2. 被代理对象某些能力不足需要他人帮他做

  所以至少proxy有两方面的作用：进行访问控制和增加功能

* ES6的proxy

  1. proxy代理什么？ 代理对象
  2. 代理对象做什么？ 控制和修改对象的基本行为
  3. 哪些行为？ 属性调用、属性赋值、删除属性、方法调用等
  4. 控制和修改对象的基本行为，属于一种元编程

  

##### 基本语法

new Proxy()表示生成一个Proxy实例，target参数表示所要拦截的目标对象，handler参数也是一个对象，用来定制拦截行为。

```js
let target = {
  x: 10,
  y: 20
}

let hanler = {
  get: (obj, prop) => 42
}

target = new Proxy(target, hanler)

target.x //42
target.y //42
target.x // 42
```

[handler.get](https://link.juejin.im/?target=https%3A%2F%2Fdeveloper.mozilla.org%2Fen-US%2Fdocs%2FWeb%2FJavaScript%2FReference%2FGlobal_Objects%2FProxy%2Fhandler%2Fget)

[handler.set](https://link.juejin.im/?target=https%3A%2F%2Fdeveloper.mozilla.org%2Fen-US%2Fdocs%2FWeb%2FJavaScript%2FReference%2FGlobal_Objects%2FProxy%2Fhandler%2Fset)

[handler.has](https://link.juejin.im/?target=https%3A%2F%2Fdeveloper.mozilla.org%2Fen-US%2Fdocs%2FWeb%2FJavaScript%2FReference%2FGlobal_Objects%2FProxy%2Fhandler%2Fhas)

[handler.apply](https://link.juejin.im/?target=https%3A%2F%2Fdeveloper.mozilla.org%2Fen-US%2Fdocs%2FWeb%2FJavaScript%2FReference%2FGlobal_Objects%2FProxy%2Fhandler%2Fapply)

[handler.construct](https://link.juejin.im/?target=https%3A%2F%2Fdeveloper.mozilla.org%2Fen-US%2Fdocs%2FWeb%2FJavaScript%2FReference%2FGlobal_Objects%2FProxy%2Fhandler%2Fconstruct)

[handler.ownKeys](https://link.juejin.im/?target=https%3A%2F%2Fdeveloper.mozilla.org%2Fen-US%2Fdocs%2FWeb%2FJavaScript%2FReference%2FGlobal_Objects%2FProxy%2Fhandler%2FownKeys)

[handler.deleteProperty](https://link.juejin.im/?target=https%3A%2F%2Fdeveloper.mozilla.org%2Fen-US%2Fdocs%2FWeb%2FJavaScript%2FReference%2FGlobal_Objects%2FProxy%2Fhandler%2FdeleteProperty)

[handler.defineProperty](https://link.juejin.im/?target=https%3A%2F%2Fdeveloper.mozilla.org%2Fen-US%2Fdocs%2FWeb%2FJavaScript%2FReference%2FGlobal_Objects%2FProxy%2Fhandler%2FdefineProperty)

[handler.isExtensible](https://link.juejin.im/?target=https%3A%2F%2Fdeveloper.mozilla.org%2Fen-US%2Fdocs%2FWeb%2FJavaScript%2FReference%2FGlobal_Objects%2FProxy%2Fhandler%2FisExtensible)

[handler.preventExtensions](https://link.juejin.im/?target=https%3A%2F%2Fdeveloper.mozilla.org%2Fen-US%2Fdocs%2FWeb%2FJavaScript%2FReference%2FGlobal_Objects%2FProxy%2Fhandler%2FpreventExtensions)

[handler.getPrototypeOf](https://link.juejin.im/?target=https%3A%2F%2Fdeveloper.mozilla.org%2Fen-US%2Fdocs%2FWeb%2FJavaScript%2FReference%2FGlobal_Objects%2FProxy%2Fhandler%2FgetPrototypeOf)

[handler.setPrototypeOf](https://link.juejin.im/?target=https%3A%2F%2Fdeveloper.mozilla.org%2Fen-US%2Fdocs%2FWeb%2FJavaScript%2FReference%2FGlobal_Objects%2FProxy%2Fhandler%2FsetPrototypeOf)

[handler.getOwnPropertyDescriptor](https://link.juejin.im/?target=https%3A%2F%2Fdeveloper.mozilla.org%2Fen-US%2Fdocs%2FWeb%2FJavaScript%2FReference%2FGlobal_Objects%2FProxy%2Fhandler%2FgetOwnPropertyDescriptor)

##### 实际用例

[运算符重载](https://link.juejin.im/?target=https%3A%2F%2Fhackernoon.com%2Fintroducing-javascript-es6-proxies-1327419ab413)，[对象模拟](https://link.juejin.im/?target=https%3A%2F%2Fen.wikipedia.org%2Fwiki%2FMock_object)，[简洁而灵活的API创建](https://link.juejin.im/?target=https%3A%2F%2Fmedium.com%2Fdailyjs%2Fhow-to-use-javascript-proxies-for-fun-and-profit-365579d4a9f8)，[对象变化事件](https://link.juejin.im/?target=https%3A%2F%2Fgithub.com%2Fsindresorhus%2Fon-change)，甚至[Vue 3背后的内部响应系统提供动力](https://link.juejin.im/?target=https%3A%2F%2Fmedium.com%2F%40gustojs%2Fvuejs-3-and-other-top-news-from-q-a-event-with-core-vue-devs-c9834946ae7b)

***具体参考[掘金文章Proxy巧用](https://juejin.im/post/5d2e657ae51d4510b71da69d)[比较defineProperty和proxy](https://juejin.im/post/5be4f7cfe51d453339084530)***

