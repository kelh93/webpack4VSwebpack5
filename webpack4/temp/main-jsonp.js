(function (modules) {
  // webpackBootstrap
  // install a JSONP callback for chunk loading
  // webpack异步加载js的回调,将加载完成的js打上已安装的flag==>installedChunks[chunkId] = 0;
  function webpackJsonpCallback(data) {
    var chunkIds = data[0];
    var moreModules = data[1];

    // add "moreModules" to the modules object,
    // then flag all "chunkIds" as loaded and fire callback
    var moduleId,
      chunkId,
      i = 0,
      resolves = [];
    for (; i < chunkIds.length; i++) {
      chunkId = chunkIds[i];
      // if(installedChunks.chunkId && installedChunks[chunkId])
      if (Object.prototype.hasOwnProperty.call(installedChunks, chunkId) && installedChunks[chunkId]) {
        // installedChunks[chunkId][0]就是加载成功的resolve方法.
        resolves.push(installedChunks[chunkId][0]);
      }
      // 异步加载完成后将chunkId打上已安装的flag
      installedChunks[chunkId] = 0;
    }
    for (moduleId in moreModules) {
      if (Object.prototype.hasOwnProperty.call(moreModules, moduleId)) {
        modules[moduleId] = moreModules[moduleId];
      }
    }
    if (parentJsonpFunction) parentJsonpFunction(data);
    // 执行promise.resolve回调函数
    while (resolves.length) {
      resolves.shift()();
    }
  }

  // The module cache
  var installedModules = {};

  // object to store loaded and loading chunks
  // undefined = chunk not loaded, null = chunk preloaded/prefetched
  // Promise = chunk loading, 0 = chunk loaded
  // 哨兵变量。记录加载过的chunk
  var installedChunks = {
    main: 0,
  };

  // script path function
  // 拼接异步script路径
  function jsonpScriptSrc(chunkId) {
    return __webpack_require__.p + '' + ({ async: 'async', sync: 'sync' }[chunkId] || chunkId) + '.js';
  }

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
    modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);

    // Flag the module as loaded
    module.l = true;

    // Return the exports of the module
    return module.exports;
  }

  // This file contains only the entry chunk.
  // The chunk loading function for additional chunks
  // 通过主入口进行异步的启动的过程
  __webpack_require__.e = function requireEnsure(chunkId) {
    var promises = [];

    // JSONP chunk loading for javascript
    var installedChunkData = installedChunks[chunkId];
    // 0 代表以及安装了
    if (installedChunkData !== 0) {
      // 存在则直接将模块的函数放到promise
      if (installedChunkData) {
        // installedChunkData[2] ==> installedChunks[chunkId][2] ==> module.exports
        // 因为installedChunks[chunkId] = [resolve, reject];// 0是resolve，1是reject
        // installedChunkData[2] = promise
        promises.push(installedChunkData[2]);
      } else {
        // setup Promise in chunk cache
        var promise = new Promise(function (resolve, reject) {
          // 异步加载promise
          // installedChunks[chunkId] = [resolve, reject];
          // installedChunkData = [resolve, reject];
          installedChunkData = installedChunks[chunkId] = [resolve, reject];
        });
        promises.push((installedChunkData[2] = promise));

        // start chunk loading
        var script = document.createElement('script');
        var onScriptComplete;

        script.charset = 'utf-8';
        script.timeout = 120;
        if (__webpack_require__.nc) {
          script.setAttribute('nonce', __webpack_require__.nc);
        }
        script.src = jsonpScriptSrc(chunkId);

        // create error before stack unwound to get useful stacktrace later
        var error = new Error();
        onScriptComplete = function (event) {
          // avoid mem leaks in IE.
          script.onerror = script.onload = null;
          clearTimeout(timeout);
          var chunk = installedChunks[chunkId];
          // onload之后，chunk != 0，表示没有正常加载完成。
          if (chunk !== 0) {
            // 加载失败
            if (chunk) {
              var errorType = event && (event.type === 'load' ? 'missing' : event.type);
              var realSrc = event && event.target && event.target.src;
              error.message = 'Loading chunk ' + chunkId + ' failed.\n(' + errorType + ': ' + realSrc + ')';
              error.name = 'ChunkLoadError';
              error.type = errorType;
              error.request = realSrc;
              // 执行reject，返回error
              chunk[1](error);
            }
            // 未找到。将chunkId赋值为undefined
            installedChunks[chunkId] = undefined;
          }
        };
        var timeout = setTimeout(function () {
          onScriptComplete({ type: 'timeout', target: script });
        }, 120000);
        script.onerror = script.onload = onScriptComplete;
        document.head.appendChild(script);
      }
    }
    // Promise.all 返回一个数组
    return Promise.all(promises);
  };

  // expose the modules object (__webpack_modules__)
  __webpack_require__.m = modules;

  // expose the module cache
  __webpack_require__.c = installedModules;

  // define getter function for harmony exports
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

  // on error function for async loading
  __webpack_require__.oe = function (err) {
    console.error(err);
    throw err;
  };
  // 执行webpackJsonp的回调
  var jsonpArray = (window['webpackJsonp'] = window['webpackJsonp'] || []);
  var oldJsonpFunction = jsonpArray.push.bind(jsonpArray);
  jsonpArray.push = webpackJsonpCallback;
  jsonpArray = jsonpArray.slice();
  for (var i = 0; i < jsonpArray.length; i++) webpackJsonpCallback(jsonpArray[i]);
  var parentJsonpFunction = oldJsonpFunction;

  // Load entry module and return exports
  return __webpack_require__((__webpack_require__.s = './src/index.js'));
})({
  './src/add.js': function (module, __webpack_exports__, __webpack_require__) {
    __webpack_require__.r(__webpack_exports__);
    const add = function (a, b) {
      return a + b;
    };
    __webpack_exports__['default'] = add;
    // sourceMap原理
    //# sourceURL=webpack:///./src/add.js?'
  },
  './src/index.js': function (module, __webpack_exports__, __webpack_require__) {
    __webpack_require__.r(__webpack_exports__);
    var _add__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__('./src/add.js');
    var _tool__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__('./src/tool.js');
    __webpack_require__
      .e('sync')
      .then(__webpack_require__.bind(null, './src/sync.js'))
      .then((data) => {
        console.log(data);
      });
    __webpack_require__
      .e('async')
      .then(__webpack_require__.bind(null, './src/async.js'))
      .then((_) => {
        console.log('_', _);
      });
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
