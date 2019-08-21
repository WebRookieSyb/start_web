### BOM
BOM（Browser object Model）浏览器对象原型

BOM提供了独立于内容而与浏览器窗口进行交互的对象

BOM由一系列相关的对象构成，并且每个对象都提供了很多方法与属性

BOM的核心对象是window，它表示浏览器的一个实例，在浏览器中，window对象即使js访问浏览器窗口的一个接口，有时ECMAScript规定的Global对象（全局对象和函数都是window对象的属性和方法）**全局变量不能通过delete操作符删除，而直接在window上定义的属性可以**

JavaScript语法的标准化组织是ECMA，DOM的标准化组织是W3C(每个浏览器提供商又按照自己想法去扩展它)，BOM的的主要方面纳入了HTML5的规范。



#### window对象
BOM的核心对象是window,它表示浏览器的一个实例;

window对象处于JavaScript结构的最顶层;

对于每个打开的窗口,系统都会自动为其定义window对象;

window对象同时扮演着ECMAScript中Global对象的角色,因此所有在全局作用域中声明的变量/函数都会变成window对象的属性和方法;

**window下的属性和方法,可以使用window.属性、window.方法()或者直接属性、方法()的调用;**

##### window.location
window.location 提供了当前窗口中加载的文档有关信息，还提供一些导航功能


##### window.frames
返回当前窗口，一个类数组对象，列出了当前窗口的所有直接子窗口。（有length属性）

**window.frames === window  为true**

在window.frames类数组中的每一项都代表了窗口对应给定对象的frame和iframe的内容，而不是(i)frame DOM元素（即window.frames[ 0 ]与document.getElementsByTagName( "iframe" )[ 0 ].contentWindow是相同的）。

frame一般用来包含别的页面，例如我们可以将我们的静态页面切割为几部分，公共调用的地方就都放置在一个页面，然后所有网页都调用这个页面，这样也节省了我们重复修改的工作时间。但是iframe框架载入的页面和直接写入网页的HTML是不同，例如我们要获取到元素或者设置iframe里面的值，就需要用到window.frames或document.frames。

##### window.history
history对象保存着用户上网的历史记录，从窗口被打开的那一刻算起。由于安全方面的考虑，开发人员无法得到用户浏览器的URL，但借由用户访问过的页面列表，可以在不知道实际URL的情况下实现后退和前进。

* length属性保存着历史记录的URL数量。  初始时，该值为1。如果当前窗口先后访问了三个网址，history.length属性等于3。由于IE10+浏览器在初始时返回2，存在兼容性问题，所以该值并不常用

* go()使用go()方法可以在用户的历史记录中任意跳转。这个方法接收一个参数，表示向后或向前跳转的页面数的一个整数值。负数表示向后跳转(类似于后退按钮)，正数表示向前跳转(类似于前进按钮),go()方法无参数时，相当于history.go(0)，可以刷新当前页面

* back()方法用于模仿浏览器的后退按钮，相当于history.go(-1)

* forward()方法用于模仿浏览器的前进按钮，相当于history.go(1)

**如果移动的位置超出了访问历史的边界，以上三个方法并不报错，而是静默失败,使用历史记录时，页面通常从浏览器缓存之中加载，而不是重新要求服务器发送新的网页**

**HTML5为history对象添加了两个新方法，history.pushState()和history.replaceState()，用来在浏览历史中添加和修改记录。state属性用来保存记录对象，而popstate事件用来监听history对象的变化**

* history.pushState()方法向浏览器历史添加了一个状态。pushState()方法带有三个参数：一个状态对象、一个标题(现在被忽略了)以及一个可选的URL地址`history.pushState(state, title, url);`

state object —— 状态对象是一个由pushState()方法创建的、与历史纪录相关的javascript对象。当用户定向到一个新的状态时，会触发popstate事件。事件的state属性包含了历史纪录的state对象。如果不需要这个对象，此处可以填null

title —— 新页面的标题，但是所有浏览器目前都忽略这个值，因此这里可以填null

URL —— 这个参数提供了新历史纪录的地址。新URL必须和当前URL在同一个域，否则，pushState()将丢出异常。这个参数可选，如果它没有被特别标注，会被设置为文档的当前URL

假定当前网址是example.com/1.html，使用pushState方法在浏览记录(history对象)中添加一个新记录
```var stateObj = { foo: 'bar' };
history.pushState(stateObj, 'page 2', '2.html');
```
添加上面这个新记录后，浏览器地址栏立刻显示example.com/2.html，但并不会跳转到2.html，甚至也不会检查2.html是否存在，它只是成为浏览历史中的最新记录。假如这时访问了google.com，然后点击了倒退按钮，页面的url将显示2.html，但是内容还是原来的1.html。再点击一次倒退按钮，url将显示1.html，内容不变

总之，pushState方法不会触发页面刷新，只是导致history对象发生变化，地址栏的显示地址发生变化

如果pushState的url参数，设置了一个新的锚点值(即hash)，并不会触发hashchange事件，，即使新的URL和旧的只在hash上有区别

如果设置了一个跨域网址，则会报错。这样设计的目的是，防止恶意代码让用户以为他们是在另一个网站上`history.pushState(null, null, 'https://twitter.com/hello');`

history.replaceState方法的参数与pushState方法一模一样，不同之处在于replaceState()方法会修改当前历史记录条目而并非创建新的条目

假定当前网页是example.com/example.html
```
history.pushState({page: 1}, 'title 1', '?page=1');
history.pushState({page: 2}, 'title 2', '?page=2');
history.replaceState({page: 3}, 'title 3', '?page=3');
history.back()
// url显示为http://example.com/example.html?page=1
history.back()
// url显示为http://example.com/example.html
history.go(2)
// url显示为http://example.com/example.html?page=3
```

【state】

history.state属性返回当前页面的state对象

```history.pushState({page: 1}, 'title 1', '?page=1');
history.state// { page: 1 }
```

【popstate事件】
每当同一个文档的浏览历史(即history对象)出现变化时，就会触发popstate事件

需要注意的是，仅仅调用pushState方法或replaceState方法，并不会触发该事件，只有用户点击浏览器倒退按钮和前进按钮，或者使用javascript调用back()、forward()、go()方法时才会触发。另外，该事件只针对同一个文档，如果浏览历史的切换，导致加载不同的文档，该事件也不会触发

使用的时候，可以为popstate事件指定回调函数。这个回调函数的参数是一个event事件对象，它的state属性指向pushState和replaceState方法为当前URL所提供的状态对象(即这两个方法的第一个参数)
```window.onpopstate = function (event) {
 console.log('location: ' + document.location);
 console.log('state: ' + JSON.stringify(event.state));
};　　
```
上面代码中的event.state，就是通过pushState和replaceState方法，为当前URL绑定的state对象

这个state对象也可以直接通过history对象读取

`var currentState = history.state;`

往返缓存

默认情况下，浏览器会在当前会话(session)缓存页面，当用户点击“前进”或“后退”按钮时，浏览器就会从缓存中加载页面

浏览器有一个特性叫“往返缓存”(back-forward cache或bfcache)，可以在用户使用浏览器的“后退”和“前进”按钮时加快页面的转换速度。这个缓存中不仅保存着页面数据，还保存了DOM和javascript的状态；实际上是将整个页面都保存在了内存里。如果页面位于bfcache中，那么再次打开该页面时就不会触发load事件

[注意]IE10-浏览器不支持

【pageshow】

pageshow事件在页面加载时触发，包括第一次加载和从缓存加载两种情况。如果要指定页面每次加载(不管是不是从浏览器缓存)时都运行的代码，可以放在这个事件的监听函数

第一次加载时，它的触发顺序排在load事件后面。从缓存加载时，load事件不会触发，因为网页在缓存中的样子通常是load事件的监听函数运行后的样子，所以不必重复执行。同理，如果是从缓存中加载页面，网页内初始化的JavaScript脚本(比如DOMContentLoaded事件的监听函数)也不会执行

[注意]虽然这个事件的目标是document，但必须将其事件处理程序添加到window

pageshow事件有一个persisted属性，返回一个布尔值。页面第一次加载时或没有从缓存加载时，这个属性是false；当页面从缓存加载时，这个属性是true
```
(function(){
 var showCount = 0;
 window.onload = function(){
  console.log('loaded');
 }
 window.onpageshow = function(e){
  e = e || event;
  showCount ++;
  console.log(e.persisted,showCount + 'times');
 }
})();
```
* [注意]上面的例子使用了私有作用域，以防止变量showCount进入全局作用域。如果单击了浏览器的“刷新”按钮，那么showCount的值就会被重置为0，因为页面已经完全重新加载了

【pagehide】

与pageshow事件对应的是pagehide事件，该事件会在浏览器卸载页面的时候触发，而且是在unload事件之前触发。与pageshow事件一样，pagehide在document上面触发，但其事件处理程序必须要添加到window对象

[注意]指定了onunload事件处理程序的页面会被自动排除在bfcache之外，即使事件处理程序是空的。原因在于，onunload最常用于撤销在onload中所执行的操作，而跳过onload后再次显示页面很可能就会导致页面不正常

pagehide事件的event对象也包含persisted属性，不过其用途稍有不同。如果页面是从bfcache中加载的，那么persisted的值就是true；如果页面在卸载之后会被保存在bfcache中，那么persisted的值也会被设置为true。因此，当第一次触发pageshow时，persisted的值一定是false，而在第一次触发pagehide时，persisted就会变成true(除非页面不会被保存在bfcache中)

```
window.onpagehide = function(e){
 e = e || event;
 console.log(e.persisted);
}
```
[http://www.jb51.net/article/105062.htm 写的挺多的博客](http://www.jb51.net/article/105062.htm)

####系统对话框
浏览器通过alert()/confirm()和prompt()方法调用系统对话框向用户显示信息;
系统对话框与浏览器中显示的网页没有关系,也不包含HTML;
它们的外观由操作系统及(或)浏览器设置决定,而不是由CSS决定;
这几个方法打开的对话框都是同步和模态的;也就是说,显示这些对话框的时候代码会停止运行,而关掉这些对话框后代码又会恢复执行;