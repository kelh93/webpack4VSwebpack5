import add from './add';
import upperCase from './tool';
import('./sync').then((data) => {
  console.log(data);
});

import('./async').then((_) => {
  console.log('_', _);
});
console.log('ck-webpack5');
var c = add(1, 2);
console.log('1+2等于', c);
var str = 'apple';
var d = upperCase(str);
console.log('apple转大写', d);
