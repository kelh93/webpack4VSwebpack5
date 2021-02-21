import add from './add';
import upperCase from './tool';
import(/* webpackChunkName: 'sync' */ './sync').then((data) => {
  onsole.log(data);
});
import(/* webpackChunkName: 'async' */ './async').then((_) => {
  console.log('_', _);
});

console.log('ck-webpack4');
var c = add(1, 2);
console.log('1+2等于', c);
var str = 'apple';
var d = upperCase(str);
console.log('apple转大写', d);
