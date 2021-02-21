(function (modules) {
  // webpackBootstrap
  // The module cache
  var installedModules = {};

  // The require function
  function __webpack_require__(moduleId) {
    // Check if module is in cache
    if (installedModules[moduleId]) {
      return installedModules[moduleId].exports;
    }
    // Create a new module (and put it into the cache)
    var module = (installedModules[moduleId] = {
      i: moduleId,
      l: false,
      exports: {},
    });

    // Execute the module function
    // 固定this。核心代码
    // modules中的函数执行的时候，this始终指向的是 module.exports 这个对象,并且传递了参数。
    modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);

    // Flag the module as loaded
    module.l = true;

    // Return the exports of the module
    return module.exports;
  }
  // Load entry module and return exports
  return __webpack_require__((__webpack_require__.s = './src/index.js'));
})({
  './src/add.js': function (module, __webpack_exports__, __webpack_require__) {
    __webpack_require__.r(__webpack_exports__);
    const add = function (a, b) {
      return a + b;
    };
    __webpack_exports__['default'] = add;
  },
  './src/index.js': function (module, __webpack_exports__, __webpack_require__) {
    __webpack_require__.r(__webpack_exports__);
    var _add__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__('./src/add.js');
    var _tool__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__('./src/tool.js');
    console.log('京城一灯');
    var c = Object(_add__WEBPACK_IMPORTED_MODULE_0__['default'])(1, 2);
    console.log('1+2等于', c);
    var str = 'apple';
    var d = Object(_tool__WEBPACK_IMPORTED_MODULE_1__['default'])(str);
    console.log('apple转大写', d);
  },
  './src/tool.js': function (module, __webpack_exports__, __webpack_require__) {
    // 1. __webpack_exports__ = module.exports = {};
    // 2. __webpack_require__ 加载模块。

    __webpack_require__.r(__webpack_exports__);
    const upperCase = function (str) {
      return str.toUpperCase();
    };
    // module.exports.default = upperCase;
    __webpack_exports__['default'] = upperCase;
  },
});
