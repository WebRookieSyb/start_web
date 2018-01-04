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

##### constructor
所有的原型对象会自动获得一个constructor属性，指向prototype属性所在的函数(构造函数)
我们根据需要，可以Person.prototype 属性指定新的对象，来作为Person的原型对象。但是这个时候有个问题，新的对象的constructor属性则不再指向Person构造函数了。

##### 执行上下文环境
javascript是一个单线程语言，这意味着在浏览器中同时只能做一件事情。当javascript解释器初始执行代码，它首先默认进入全局上下文。每次调用一个函数将会创建一个新的执行上下文。 
定义：执行函数的时候，会产生一个上下文的对象，里面保存变量，函数声明和this。  
作用：用来保存本次运行时所需要的数据。  
在产生执行上下文(执行上下文环境)时，浏览器会做以下三个准备工作：
1. 提取var 声明的变量，并赋值为 undefined
2. 给this赋值，指向window或当前对象。
3. 提取声明式函数。 函数在定义的时候（不是调用的时候），就已经确定了函数体内部自由变量的作用域（函数整个被保存）。函数每被调用一次，都会产生一个新的执行上下文环境。因为不同的调用可能就会有不同的参数。  
javascript在执行一个代码段之前，都会进行这些“准备工作”来生成执行上下文。这个“代码段”其实分三种情况——全局代码，函数体，eval代码。
* 全局上下文环境  
全局级别的代码，如多个script标签，一旦执行就会进入全局执行上下文环境   
1.提取普通变量，如 var a  ，并赋值 a = undefined  
2.提取声明式函数，function fn(){}  
3.给 this 赋值，this指向window  
* 局部上下文环境  
在函数调用的时候产生，每一次调用就会产生，调用完成后销毁(除闭包)。（js中for和if、else无法创建作用域,只有函数创建作用域）  
1.提取普通变量，如 var a  ，并赋值 a = undefined  
2.提取声明式函数，function fn(){}  
3.给 this 赋值，this指向当前对象  
4.给参数赋值  
5.给arguments 赋值  
6.自由变量的取值作用域，查找并赋值  
自由变量：在当前作用域中未声明的变量，会去其上一级查找，直到window  
arguments:是一个实参副本，与实参保持一致。  
* 执行上下文栈
每次新创建的一个执行上下文会被添加到作用域链的顶部，有时也称为执行或调用栈。浏览器总是运行位于作用域链顶部的当前执行上下文。一旦完成，当前执行上下文将从栈顶被移除并且将控制权归还给之前的执行上下文。出栈后，会销毁本次调用的局部上下文环境。
##### this
在函数中this到底取何值，是在函数真正被调用执行的时候确定的，函数定义的时候确定不了。因为this的取值是执行上下文环境的一部分，每次调用函数，都会产生一个新的执行上下文环境。
* 构造函数 
所谓构造函数就是用来new对象的函数。其实严格来说，所有的函数都可以new一个对象，但是有些函数的定义是为了new一个对象，而有些函数则不是。另外注意，构造函数的函数名第一个字母大写（规则约定）。例如：Object、Array、Function等。  
如果函数作为构造函数用，那么其中的this就代表它即将new出来的对象。
如果直接调用，这种情况下this是window。
* 函数作为对象的一个属性 
如果函数作为对象的一个属性时，并且作为对象的一个属性被调用时，函数中的this指向该对象。

##### 作用域链
作用域链在执行上下文环境的时候已经被确定
不同执行上下文之间的变量命名冲突通过攀爬作用域链解决，从局部直到全局。这意味着具有相同名称的局部变量在作用域链中有更高的优先级。 
简单的说，每次你试图访问函数执行上下文中的变量时，查找进程总是从自己的变量对象开始。如果在自己的变量对象中没发现要查找的变量，继续搜索作用域链。它将攀爬作用域链检查每一个执行上下文的变量对象，寻找和变量名称匹配的值。
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

