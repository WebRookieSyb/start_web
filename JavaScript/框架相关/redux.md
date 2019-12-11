
前言
==

相信很多新手朋友们对于 React、Redux、React-Redux 这三者之间的关系和区别肯定有很多不解和疑惑。这里我们就来详细的剖析一下它们吧。  

`React`：负责组件的 UI 界面渲染；  
`Redux`：数据处理中心；  
`React-Redux`：连接组件和数据中心，也就是把 React 和 Redux 联系起来。  

React
=====

React 主要就是用来实现 UI 界面的，是一个专注于 view 层的框架。对于一些小项目，如果数据的交互不是很多，完全可以只使用 React 就能很好的实现。  

在传统的页面开发模式中，需要多次的操作 DOM 来进行页面的更新，我们都知道对 DOM 的操作会造成极大的性能问题。而 React 的提出就是减少对 DOM 的操作来提升性能，也就是 Virtual DOM。

#### Virtual DOM

Virtual DOM 就相当于一个虚拟空间，React 就是基于 Virtual DOM 来工作的。  

它的工作过程是：当有数据需要进行更新时，会先计算 Virtual DOM ，并和上一次的 Virtual DOM 做对比，得到 DOM 结构的区别，然后只会将需要变化的部分批量的更新到真实的 DOM 上。  

说到如何去计算 Virtual DOM，在 React 里面，用到的是 react-diff 算法。我们都知道传统的 diff 算法是通过循环递归对每个节点进行依次对比，效率低下，算法复杂度达到了 O(n^3)，其中 n 是树中节点的总数。  

根据 react diff 策略:  

1.  Web UI 中 DOM 节点跨层级的移动操作特别少，可以忽略不计;
2.  拥有相同类的两个组件将会生成相似的树形结构，拥有不同类的两个组件将会生成不同的树形结构;
3.  对于同一层级的一组子节点，它们可以通过唯一 id 进行区分。

React 分别对 tree diff、component diff 以及 element diff 进行了算法优化：  

1.  `tree diff`：对树进行分层比较，两棵树只会对同一层次的节点进行比较
2.  `component diff`：

*   如果是同一类型的组件，按照原策略继续比较 virtual DOM tree。
*   如果不是，则将该组件判断为 dirty component，从而替换整个组件下的所有子节点。
*   对于同一类型的组件，有可能其 Virtual DOM 没有任何变化，如果能够确切的知道这点那可以节省大量的 diff 运算时间，因此 React 允许用户通过 shouldComponentUpdate() 来判断该组件是否需要进行 diff。

3.  `element diff`：当节点处于同一层级时，React diff 提供了三种节点操作，分别为：插入、移动、删除。

这是整个 react diff 算法的比较流程图:  

![](https://raw.githubusercontent.com/WebRookieSyb/graph-bed/master/img/1642cc069b5aceec.jpg)

#### React 生命周期

React 总共有 10 个周期函数（render 重复一次），这 10 个函数可以满足我们所有对组件操作的需求，利用的好可以提高开发效率和组件性能。

一、组件在初始化时会触发 5 个钩子函数：

1.  `getDefaultProps()`

设置默认的 props，es6 中用 `static dufaultProps={}` 设置组件的默认属性。在整个生命周期只执行一次。

2.  `getInitialState()`

在使用 es6 的 class 语法时是没有这个钩子函数的，可以直接在 constructor 中定义 this.state。此时可以访问 this.props。

3.  `componentWillMount()` ajax 数据的拉取操作，定时器的启动。

组件初始化时调用，以后组件更新不调用，整个生命周期只调用一次，此时可以修改 state。

4.  `render()`

React 最重要的步骤，创建虚拟 dom，进行 diff 算法，更新 dom 树都在此进行。此时就不能更改 state 了。

5.  `componentDidMount()` 动画的启动，输入框自动聚焦

组件渲染之后调用，可以通过 this.getDOMNode() 获取和操作 dom 节点，只调用一次。

二、在更新时也会触发 5 个钩子函数：

6.  `componentWillReceivePorps(nextProps)`

组件初始化时不调用，组件接受新的 props 时调用。不管父组件传递给子组件的 props 有没有改变，都会触发。

7.  `shouldComponentUpdate(nextProps, nextState)`

React 性能优化非常重要的一环。组件接受新的 state 或者 props 时调用，我们可以设置在此对比前后两个 props 和 state 是否相同，如果相同则返回 false 阻止更新，因为相同的属性状态一定会生成相同的 dom 树，这样就不需要创造新的 dom 树和旧的 dom 树进行 diff 算法对比，节省大量性能，尤其是在 dom 结构复杂的时候。不过调用 this.forceUpdate 会跳过此步骤。

8.  `componentWillUpdate(nextProps, nextState)`

组件初始化时不调用，只有在组件将要更新时才调用，此时可以修改 state

9.  `render()`

不多说

10.  `componentDidUpdate()`

组件初始化时不调用，组件更新完成后调用，此时可以获取 dom 节点。

三、卸载钩子函数

11.  `componentWillUnmount()` 定时器的清除

组件将要卸载时调用，一些事件监听和定时器需要在此时清除。

![](https://raw.githubusercontent.com/WebRookieSyb/graph-bed/master/img/1642cca46deb8072.png)

Redux
=====

Redux 是一种架构模式，是由 flux 发展而来的。

Redux 三大原则
----------

1.  唯一数据源
2.  状态只读
3.  数据改变只能通过纯函数（reducer）完成

Redux 核心 api
------------

Redux 主要由三部分组成：store，reducer，action。  

### store

Redux 的核心是 store，它由 Redux 提供的 createStore(reducer， defaultState) 这个方法生成，生成三个方法，getState(),dispatch(),subscrible()。  

![](https://raw.githubusercontent.com/WebRookieSyb/graph-bed/master/img/1642cd9d8d014496.jpg)

*   getState()：存储的数据，状态树；
*   dispatch(action)：分发 action，并返回一个 action，这是唯一能改变 store 中数据的方式；
*   subscrible(listener)：注册一个监听者，store 发生变化的时候被调用。

### reducer

reducer 是一个纯函数，它根据 previousState 和 action 计算出新的 state。  
reducer(previousState,action)

![](https://raw.githubusercontent.com/WebRookieSyb/graph-bed/master/img/1642fe4239346286.jpg)

### action

action 本质上是一个 JavaScript 对象，其中必须包含一个 type 字段来表示将要执行的动作，其他的字段都可以根据需求来自定义。

```
const ADD_TODO = 'ADD_TODO'
复制代码

```

```
{
  type: ADD_TODO,
  text: 'Build my first Redux app'
}
复制代码

```

整合
--

他们三者之间的交互，可以由下图概括：

![](https://raw.githubusercontent.com/WebRookieSyb/graph-bed/master/img/1642fe4239346286.jpg)

React-Redux
===========

Redux 本身和 React 没有关系，只是数据处理中心，是 React-Redux 让他们联系在一起。  

React-rRedux 提供两个方法：connect 和 Provider。  

connect
-------

connect 连接 React 组件和 Redux store。connect 实际上是一个高阶函数，返回一个新的已与 Redux store 连接的组件类。  

```
const VisibleTodoList = connect(
  mapStateToProps,
  mapDispatchToProps
)(TodoList)
复制代码

```

TodoList 是 UI 组件，VisibleTodoList 就是由 react-redux 通过 connect 方法自动生成的容器组件。

1.  `mapStateToProps`：从 Redux 状态树中提取需要的部分作为 props 传递给当前的组件。
2.  `mapDispatchToProps`：将需要绑定的响应事件（action）作为 props 传递到组件上。

![](https://raw.githubusercontent.com/WebRookieSyb/graph-bed/master/img/164325cc2f6288e1.jpg)

Provider
--------

Provider 实现 store 的全局访问，将 store 传给每个组件。  

原理：使用 React 的 context，context 可以实现跨组件之间的传递。  

总结
==

下图阐述了它们三者之间的工作流程：

![](https://raw.githubusercontent.com/WebRookieSyb/graph-bed/master/img/1643259f68138eed.jpg)