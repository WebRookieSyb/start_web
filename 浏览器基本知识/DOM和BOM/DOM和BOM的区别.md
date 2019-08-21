### javascript的组成
1. 核心（ECMAScript）：描述了js的基本语法和基本对象。
2. 文档对象模型（DOM）:处理网页内容的方法和接口。
3. 浏览器对象模型（BOM）：与浏览器交互的方法和接口。

#### ECMAScipt
1. ECMAScipt是一个标准，js只是他的一个实现，其他实现包括ActionScript。
2. “ECMAScript可以为不同种类的宿主环境提供核心的脚本编程能力……”，即ECMAScript不与具体的宿主环境相绑定，如JS的宿主环境是浏览器，AS的宿主环境是Flash。
3. ECMAScript描述了以下内容：语法、类型、语句、关键字、保留字、运算符、对象。

#### BOM和DOM
1. DOM是w3c标准，所有浏览器公共遵守的标准
2. BOM 是 各个浏览器厂商根据 DOM在各自浏览器上的实现;表现为不同浏览器定义有差别,实现方式不同。
3. window 是 BOM对象，而非js对象。

##### DOM（文档对象模型）是 HTML 和 XML 的应用程序接口（API）。DOM描述了处理网页内容的方法和接口。
DOM 全称是 Document Object Model，也就是文档对象模型。是针对XML和HTML的基于树的API。描述了处理网页内容的方法和接口，是HTML和XML的API，DOM把整个页面规划成由节点层级构成的文档。针对XHTML和HTML的DOM。这个DOM定义了一个HTMLDocument和HTMLElement做为这种实现的基础,就是说为了能以编程的方法操作这个 HTML 的内容（比如添加某些元素、修改元素的内容、删除某些元素），我们把这个 HTML 看做一个对象树（DOM树），它本身和里面的所有东西比如 `<div></div>` 这些标签都看做一个对象，每个对象都叫做一个节点（node） 

* 元素节点：构成了DOM的基础。文档结构中，<html>是根元素，代表整个文档，其他的还有<head>,<body>,<p>,<span>等等。元素节点之间可以相互包含(当然遵循一定的规则)

* 文本节点：包含在元素节点中。

* 属性节点：元素都可以包含一些属性，属性的作用是对元素做出更具体的描述，比如id,name之类的。
##### BOM 主要处理浏览器窗口和框架，不过通常浏览器特定的 JavaScript 扩展都被看做 BOM 的一部分，BOM描述了与浏览器进行交互的方法和接口。

BOM(浏览器对象模型),核心是window，而window对象又具有双重角色，它既是通过js访问浏览器窗口的一个接口，又是一个Global（全局）对象。这意味着在网页中定义的任何对象，变量和函数，都以window作为其global对象。

Window 对象是 JavaScript层级中的顶层对象。

Window 对象代表一个浏览器窗口或一个框架。

Window 对象会在 <body>或<frameset>每次出现时被自动创建。

BOM的拓展包括：

弹出新的浏览器窗口

移动、关闭浏览器窗口以及调整窗口大小

提供 Web 浏览器详细信息的定位对象

提供用户屏幕分辨率详细信息的屏幕对象

对 cookie 的支持

IE 扩展了 BOM，加入了ActiveXObject类，可以通过JavaScript实例化ActiveX对象

#####二者关系
javacsript是通过访问BOM（Browser Object Model）对象来访问、控制、修改客户端(浏览器)，由于BOM的window包含了document，window对象的属性和方法是直接可以使用而且被感知的，因此可以直接使用window对象的document属性，通过document属性就可以访问、检索、修改XHTML文档内容与结构。因为document对象又是DOM（Document Object Model）模型的根节点。可以说，BOM包含了DOM(对象)，浏览器提供出来给予访问的是BOM对象，从BOM对象再访问到DOM对象，从而js可以操作浏览器以及浏览器读取到的文档。其中
DOM包含：window

Window对象包含属性：document、location、navigator、screen、history、frames

Document根节点包含子节点：forms、location、anchors、images、links

**从window.document已然可以看出，DOM的最根本的对象是BOM的window对象的子对象。**