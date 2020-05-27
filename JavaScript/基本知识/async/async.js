/*
async function doTest(asyncFn, name) {
  console.log(0)
  const result = await asyncFn(name);
  console.log(result)
  console.log(1)
  await asyncFn()
}
*/
// ts打包为es6代码
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
    //返回一个promise
    return new (P || (P = Promise))(function (resolve, reject) {
      // promise的fulfilled函数
      function fulfilled(value) {
        try {
          step(generator.next(value));
        } catch (e) {
          reject(e);
        }
      }
      // promise的rejected函数
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
        result.done
          ? resolve(result.value)
          : adopt(result.value).then(fulfilled, rejected);
      }
      step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
  };
function doTest(asyncFn, name) {
  return __awaiter(this, void 0, void 0, function* () {
    console.log(0);
    const result = yield asyncFn(name);
    console.log(result);
    console.log(1);
    yield asyncFn();
  });
}
