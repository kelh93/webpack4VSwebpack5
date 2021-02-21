(function (modules) {
  // webpackBootstrap
  // 模块缓存
  var installedModules = {};

  // 加载模块的函数
  function __webpack_require__(moduleId) {
    // 检测模块是否在缓存内
    if (installedModules[moduleId]) {
      return installedModules[moduleId].exports;
    }
    // 没有缓存的，则创建模块对象。module.exports = {};
    var module = (installedModules[moduleId] = {
      i: moduleId,
      l: false,
      exports: {},
    });

    // Execute the module function
    // 执行module，通过call改变this指向。
    modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);

    // 模块是否被load的标记。
    module.l = true;

    // 返回模块的导出。
    return module.exports;
  }
  // 添加函数静态属性
  // 暴露modules
  __webpack_require__.m = modules;

  // 暴露module缓存
  __webpack_require__.c = installedModules;

  // define getter function for harmony exports
  // 为和谐的exports定义getter函数。
  __webpack_require__.d = function (exports, name, getter) {
    if (!__webpack_require__.o(exports, name)) {
      Object.defineProperty(exports, name, { enumerable: true, get: getter });
    }
  };

  // define __esModule on exports
  __webpack_require__.r = function (exports) {
    if (typeof Symbol !== 'undefined' && Symbol.toStringTag) {
      Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
    }
    Object.defineProperty(exports, '__esModule', { value: true });
  };

  // create a fake namespace object
  // mode & 1: value is a module id, require it
  // mode & 2: merge all properties of value into the ns
  // mode & 4: return value when already ns object
  // mode & 8|1: behave like require
  __webpack_require__.t = function (value, mode) {
    if (mode & 1) value = __webpack_require__(value);
    if (mode & 8) return value;
    if (mode & 4 && typeof value === 'object' && value && value.__esModule) return value;
    var ns = Object.create(null);
    __webpack_require__.r(ns);
    Object.defineProperty(ns, 'default', { enumerable: true, value: value });
    if (mode & 2 && typeof value != 'string')
      for (var key in value)
        __webpack_require__.d(
          ns,
          key,
          function (key) {
            return value[key];
          }.bind(null, key)
        );
    return ns;
  };

  // getDefaultExport function for compatibility with non-harmony modules
  __webpack_require__.n = function (module) {
    var getter =
      module && module.__esModule
        ? function getDefault() {
            return module['default'];
          }
        : function getModuleExports() {
            return module;
          };
    __webpack_require__.d(getter, 'a', getter);
    return getter;
  };

  // Object.prototype.hasOwnProperty.call
  __webpack_require__.o = function (object, property) {
    return Object.prototype.hasOwnProperty.call(object, property);
  };

  // __webpack_public_path__
  __webpack_require__.p = '';

  // Load entry module and return exports
  // 加载入口模块，返回exports
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
    console.log('ck-webpack4');
    var c = Object(_add__WEBPACK_IMPORTED_MODULE_0__['default'])(1, 2);
    console.log('1+2等于', c);
    var str = 'apple';
    var d = Object(_tool__WEBPACK_IMPORTED_MODULE_1__['default'])(str);
    console.log('apple转大写', d);
  },
  './src/tool.js': function (module, __webpack_exports__, __webpack_require__) {
    __webpack_require__.r(__webpack_exports__);
    const upperCase = function (str) {
      return str.toUpperCase();
    };
    __webpack_exports__['default'] = upperCase;
  },
});
