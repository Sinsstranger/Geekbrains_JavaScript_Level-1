```
if (!("a" in window)) {
var a = 1;
}
alert(a);
```
Undefined - интерпритатор при первом проходе объявит переменную без присваивания
в if не зайдет никогда, даже если передернуть страницу.
```
var b = function a(x) {
x && a(--x);
};
alert(a);
```
Ошибка - отругается что а не определено
```
function a(x) {
return x * 2;
}
var a;
alert(a);
```
Вернет тело функции, так как переменная а не определена, но определена функция а
ее и подсунет
```
function b(x, y, a) {
arguments[2] = 10;
alert(a);
}
b(1, 2, 3);
```
Отдаст 10 так как сначала в него передаем 3, потом через массив аргументов
по индексу меняем ее на 10
```
function a() {
alert(this);
}
a.call(null);
```
В современном стандарте call/apply передают this «как есть».
А в старом, без use strict, при указании первого аргумента null
или undefined в call/apply, функция получает this = window