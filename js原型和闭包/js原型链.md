### 基本js知识
#### js中的基本数据类型
1. 值类型
undefined,number,string,null,boolean.  
其中null在typeof null时，值为object;  
null 是一个字面量（而不是全局对象的一个属性，undefined 是）表示空值（null or an "empty" value），即没有对象被呈现（no object value is present）
在 JavaScript 最初的实现中，JavaScript 中的值是由一个表示类型的标签和实际数据值表示的。对象的类型标签是 0。由于 null 代表的是空指针（大多数平台下值为 0x00），因此，null的类型标签也成为了 0，typeof null就错误的返回了"object"。
typeof 只能判断值类型，判断引用类型时只会返回function/object ，当判断引用类型到底是数组还是对象时用instanceof  
A instanceof B ,沿着A的__proto__这条线，再沿着B的prototype这条线找，如果能找到同一引用，则返回true  
2. 引用类型
object
其中函数在typeof 时，值为function;
数组array也为object; 

##### 普通对象和函数对象
对象就是属性的集合，对象里面的一切都是属性，只有属性，没有方法。那么这样方法如何表示呢？——方法也是一种属性。因为它的属性表示为键值对的形式。  
对象都是有函数创建的
如`var obj = {a: 10,b: 20};`其实也是同过函数创建，只不过是使用了‘语法糖’
相当于
```
var obj = new Object();
obj.a = 10;
obj.b = 20;
```
* 语法糖  
语法糖(syntactic sugar)是指编程语言中可以更容易的表达一个操作的语法，它可以使程序员更加容易去使用这门语言：操作可以变得更加清晰、方便，或者更加符合程序员的编程习惯。它并没有给计算机语言添加新功能，不仅在加糖后的代码功能与加糖前保持一致，更重要的是，糖在不改变其所在位置的语法结构的前提下，实现了运行时等价，即加糖后的代码编译后跟加糖前一毛一样。  
比如ES6中的箭头函数，或者正则中e+相当于一个或者多个e，e?表示零个或者一个e;e{i,j}表示i到j个e。C中a[i]就是*(a+i)的语法糖  
* 函数对象  
凡是通过new Function() 创建的对象都是函数对象，其他的都是普通对象。Function、Object 也是通过new Function()创建的

##### 原型对象和原型链
实例的构造函数属性(constructor)指向构造函数
* 每个对象都有__proto__(原型链指针，隐式原型)属性，指向创建该对象的函数（该对象的构造函数）的prototype（原型对象） ,但只有函数对象才有prototype属性，这个prototype的属性值是一个对象（对象是属性的集合，再次强调！），默认的只有一个叫做constructor的属性，指向这个函数本身。指向函数的原型对象（通俗点讲原型对象就是内存中为其他对象提供共享属性和方法的对象。）

* 在构造函数创建的时候，创建了一个它的实例对象并复制给他的prototype，所以原型对象(fn4.prototype)是构造函数(fn4)的一个实例
原型对象其实就是普通对象（但 Function.prototype 除外，它是函数对象，但它很特殊，他没有prototype属性（前面说道函数对象都有prototype属性），而且他的__proto__指向Object.prototype）

* 原型链指针proto，该指针指向上一层的原型对象，而上一层的原型对象的结构依然类似，这样利用proto一直指向Object的原型对象上，而Object的原型对象用Object.prototype.proto = null表示原型链的最顶端，如此变形成了javascript的原型链继承，同时也解释了为什么所有的javascript对象都具有Object的基本方法。

* instanceof的判断规则沿着A的__proto__这条线来找，同时沿着B的prototype这条线来找，如果两条线能找到同一个引用，即同一个对象，那么就返回true。如果找到终点还未重合，则返回false。可以看出instanceof表示的就是一种继承关系，或者原型链的结构。

* 在js中，对象在调用一个方法时会首先在自身里寻找是否有该方法，若没有，则去原型链上去寻找，依次层层递进，这里的原型链就是实例对象的__proto__属性。因此由于所有的对象的原型链都会找到Object.prototype。每个函数都有call，apply方法，都有length，arguments，caller等属性，是由于继承了Function.prototype中的方法。可以使用hasOwnProperty属性（Object.prototype中的方法）判断一个属性是基本的还是从原型中继承的。js中的继承基于原型的继承，原型链就形成了js中的多重继承。

##### 执行上下文环境

##### constructor
所有的原型对象会自动获得一个constructor属性，指向prototype属性所在的函数(构造函数)
我们根据需要，可以Person.prototype 属性指定新的对象，来作为Person的原型对象。但是这个时候有个问题，新的对象的constructor属性则不再指向Person构造函数了。

```
function fn4(name,age) {
            this.name = name;
            this.age = age;
            this.sayName = function() {
                alert(this.name);
            }
        }
        var fn41 = new fn4('syb',18);
        var fn42 = new fn4('aaa',19);
        //fn41和fn42都是fn4的实例，这两个实例都有constructor属性，指向fn4;
        console.log(fn42.constructor === fn4);//true
        console.log(fn41.constructor === fn4);//true
        //fn4.prototype也是fn4的实例，也就是在fn4创建的时候，创建了一个他的实例对象并且赋给了它的prototype
        console.log(fn4.prototype.constructor === fn4);//true
```
```
function Person () {}
    //直接给Person的原型指定对象字面量。则这个对象的constructor属性不再指向Person函数
    Person.prototype = {
        name:"syb"
    };
    var p1 = new Person();
    console.log(p1 instanceof Person); // true
    console.log(Person.prototype.constructor === Person); //false
```



###### 创建对象的方式
* 使用new关键字创建




Object.prototype.__proto__指向null  特例  
Object.__proto__指向Function.prototype  对象是由函数创建的  
Function.__proto__指向Function.prototype  
Function.prototype.__proto__指向Object.prototype   Function.prototype是一个对象  

