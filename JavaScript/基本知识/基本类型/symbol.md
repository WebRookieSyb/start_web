#### symbol独一无二的值

##### 基本知识

* `const s = Synbol("my symbol");` symbol是值类型而不是引用类型,Symbol不是构造函数，不用new。参数为描述参数，接受除symbol值之外的任何值。
* symbol值是独一无二的，任意两个symbol值都是不相同的。

* 只能通过typeof来判断是否是symbol类型

  

##### 常用用法

* 用作对象属性key，不过需要使用[]定义属性

  ``` js
  const NAME = Symbol();
  let obj = {
    [NAME]: "啊哈哈",
    age: 18
  }
  console.log(Object.keys(obj))
  for(let i in obj) {
    consolle.log(i)
  }
  console.log(Object.getOwnPropertyName(obj))
  ```

  symbol作为对象的key时，具有私有性，是不能通过Object.keys()或者for in来枚举的,也不含对象自身属性名的集合之中，JSON.stringify()也无法输出symbol属性。可以把一些不需要对外操作和访问的属性用symbol来定义。

* 定义类的私有属性/方法

* Symnbol.for()创建共享symbol,它可以注册或获取一个全局的Symbol实例

  

##### 常用的默认symbol值

* Symbol.iterator
* Symbol.hasInstance
* Symbol.match
* Symbol.toPrimitive
* Symbol.toStringTag

***具体参考链接***    [Symbol介绍](https://juejin.im/post/5cdcd7a7e51d453af7192b9a)