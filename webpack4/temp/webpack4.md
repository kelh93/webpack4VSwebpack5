webpack4 打包后生成的入口文件是一个闭包。
`var installedModules = {}`使用`installedModules`对象保存已经安装过的模块。
`__webpack_require__`

模块对象
```js
module = {
  i: moduleId,  // 模块的id，将文件的相对路径作为模块id
  l: false, // 模块是否被加载
  exports: {} // 模块导出的对象
}
```

// 保存所有的modules
__webpack_require__.m = modules;


webpack4异步加载js会出现串id的情况。可以在import的地方通过写魔法注释解决，格式如：“/* webpackChunkName: 'chunkname' */ ”.增加维护成本。

函数的静态属性。


### webpack4 prefetch/preload ###  
https://webpack.docschina.org/guides/code-splitting/

> import(/* webpackPrefetch: true */ 'LoginModal');  
> 这会生成 <link rel="prefetch" href="login-modal-chunk.js"> 并追加到页面头部，指示着浏览器在闲置时间预取 login-modal-chunk.js 文件。  

#### prefetch 和 preload 的不同 #### 
1. preload chunk会在父chunk加载时，以并行的方式开始下载。而prefetch chunk会在父chunk加载结束后开始加载。
2. preload chunk具有中等优先级，并立即下载。prefetch chunk在浏览器闲置时下载。
3. preload chunk会在父chunk中立即请求，用于当下时刻。prefetch chunk会用于未来某个时刻。
4. 浏览器支持程度不同。

```js import(/* webpackPreload: true */ 'ChartingLibrary'); ```
在页面中使用 ChartComponent 时，在请求 ChartComponent.js 的同时，还会通过 <link rel="preload"> 请求 charting-library-chunk。

webpack4 魔法注释
```js
import(/* webpackPrefetch: true */ 'LoginModal');  
import(/* webpackPreload: true */ 'ChartingLibrary');  
import(/* webpackChunkName: 'async.js' */ './src/async.js');  
```

webpack 异步加载原理
script onloaded之后将文件内容添加到主文件中。
```js
// async.js
window['webpackJsonp'].push([
  ['async'],
  {
    // 
  }
]);

//main.js
function webpackJsonpCallback(){

}

/* 加载异步js 
__webpack_require__.e = function(){
  var promises = [];
  ...
  return Promise.all(promises);
}
*/

// 主文件 -> 创建script标签 -> script加载成功后，取第二项 第一项是名字 -> 加到缓存里面 -> 放到main.js的最后.
```