### 起源
为了在老工程中使用vue和react等，目前云课堂使用[rollup-to-nej]()这个工具打包。在观察打包生成后代代码的时候，发现有挺多的一些辅助函数，这些辅助函数会被重复的加入到我们打包生成的文件中，比如当我们使用async/await的时候。解决方法就是引入`babel-runtime`和`babel-helper`并修改babel配置来移除这些辅助函数。

当我比较修改之后的打包文件的时候，发现用到async/await的时候少了这么两个辅助函数。![](https://raw.githubusercontent.com/WebRookieSyb/graph-bed/master/img/WechatIMG406.png)
那么到底打包的时候是如何实现async/await的呢？
### 实现
async/await实目前用的最多异步解决方案，它其实是Generator的一种语法糖，可以理解为一个自执行的generator。通常在babel或者ts打包为，一般会实现已下两步。
* 实现一个自执行的Generator
* 实现一个Generator(打包为es5)

#### 实现一个自执行的Generator
通常来说我们通过已下两种方式实现：
* 通过不断进行回调函数的执行，直到全部过程执行完毕，基于这种思路的是[thunkify](https://github.com/tj/node-thunkify)模块；
* 使用Javascript原生支持的Promise对象，将异步过程扁平化处理，基于这种思路的是[co](https://github.com/tj/co)模块。

babel和ts在打包的时候都是使用co模块的思路通过Promise来实现，将已下测试代码在ts中转为es5
```javaScript
async function doTest(asyncFn, name) {
  console.log(0)
  const result = await asyncFn(name);
  console.log(result)
  console.log(1)
  await asyncFn()
}
```
```javaScript
"use strict";
// async/await的实现
// 参数generator就是一个generator函数
// 参数P默认传void 0，取Promise
var __awaiter =
  (this && this.__awaiter) ||
  function (thisArg, _arguments, P, generator) {
    // adopt返回一个promise
    function adopt(value) {
      return value instanceof P
        ? value
        : new P(function (resolve) {
            resolve(value);
          });
    }

    return new (P || (P = Promise))(function (resolve, reject) {
      // promise的fulfilled函数,会去调用generator.next
      function fulfilled(value) {
        try {
          step(generator.next(value));
        } catch (e) {
          reject(e);
        }
      }
      // promise的rejected函数,会去调用generator.throw
      function rejected(value) {
        try {
          step(generator["throw"](value));
        } catch (e) {
          reject(e);
        }
      }
      // step判断generater函数有没有执行完
      function step(result) {
        // generater函数执行完的result值的done为true，执行完则resolve()
        // 否则生成一个Promise继续执行next
        result.done
          ? resolve(result.value)
          : adopt(result.value).then(fulfilled, rejected);
      }
      // 开始执行generator
      step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
  };
  // 原来的async和await会转换成一个generator实现
  function doTest(asyncFn, name) {
    return __awaiter(this, void 0, void 0, function* () {
        console.log(0);
        const result = yield asyncFn(name);
        console.log(result);
        console.log(1);
        yield asyncFn();
    });
}
```
看完ts的实现，在去看babel的实现（如图1中所示），会发现他其实就是多拆分成了一个函数而已，实现方法都是相同的。

#### 实现一个Generator生成器
因为因为Generator是es6的新语法，所以在babel和ts中打包为es5的代码时需要去实现一个Generator生成器。生成器的强大之处在于能方便地对生成器函数内部的逻辑进行控制。在生成器函数内部，通过`yield`或`yield*`，将当前生成器函数的控制权移交给外部，外部通过调用生成器的`next`或`throw`或`return`方法将控制权返还给生成器函数，并且还能够向其传递数据。

生成器并非由引擎从底层提供额外的支持，我们可以将生成器视为一个语法糖，用一个辅助工具将生成器函数转换为普通的Javascript代码，在经过转换的代码中，有两个关键点，一是要保存函数的上下文信息，二是实现一个完善的迭代方法，使得多个`yield`表达式按序执行，从而实现生成器的特性。

在babel中实现一个Generator
```javascript
  function _doTest() {
    _doTest = _asyncToGenerator(
    /*#__PURE__*/
    regeneratorRuntime.mark(function _callee(asyncFn, name) {
      var result;
      return regeneratorRuntime.wrap(function _callee$(_context) {
        while (1) {
          switch (_context.prev = _context.next) {
            case 0:
              console.log(0);
              _context.next = 3;
              return asyncFn(name);

            case 3:
              result = _context.sent;
              console.log(result);
              console.log(1);
              _context.next = 8;
              return asyncFn();

            case 8:
            case "end":
              return _context.stop();
          }
        }
      }, _callee);
    }));
    return _doTest.apply(this, arguments);
  }
```
* `yield`被转换为`switch case`,`_context`保存着当前函数的上下文状态

  我们可以把`switch case`看做看做是一个状态机，根据`_context`的状态来执行不同的代码。

* 函数被`regeneratorRuntime.mark`包装，返回一个被`regeneratorRuntime.wrap`包装的迭代器对象。
  简单来说，我们可以理解为实现了一个带有next\return\throw等属性的一个迭代器对象，babel中使用[regenerator](https://facebook.github.io/regenerator/)生成。如下图所示
  ![迭代器对象](https://raw.githubusercontent.com/WebRookieSyb/graph-bed/master/img/WechatIMG404.png)

  具体regenerator的实现这里就不再深入去分析。

ts中generator的实现的不完整版（）
```javascript
var __generator = (this && this.__generator) || function (thisArg, body) {
    // _保存着generator的上下文状态 
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] };
    // 返回一个遍历器对象
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    // v是next/throw/return等传入的值
    function verb(n) { return function (v) { return step([n, v]); }; }
    // 
    function step(op) {
      while (_) try {
          switch (op[0]) {
              case 0: case 1: t = op; break;
              // 未完成
              case 4: _.label++; return { value: op[1], done: false };

              default:
                  if (op[0] === 2) { _ = 0; continue; }
          }
          // 
          op = body.call(thisArg, _);
      } catch (e) {}
      // case2的时候已完成，位运算
      if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};

function doTest(asyncFn, name) {
    return __awaiter(this, void 0, void 0, function () {
        var result;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    console.log(0);
                    return [4 /*yield*/, asyncFn(name)];
                case 1:
                    result = _a.sent();
                    console.log(result);
                    console.log(1);
                    return [4 /*yield*/, asyncFn()];
                case 2:
                    _a.sent();
                    return [2 /*return*/];
            }
        });
    });
}
```


