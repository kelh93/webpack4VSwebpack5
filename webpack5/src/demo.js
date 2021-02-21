let output = '';
// 不用 async await 配套使用. 在webpack4中可以使用babel插件实现
// async function main() {
const dynamic = await import('./data');
output = dynamic + '123';
// }
// main();
export { output };
