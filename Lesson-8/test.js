if (!("a" in window)) {
	var a = 1;
}
console.log(a);

var b = function a(x) {
	x && a(--x);
};
console.log(a);

function a(x) {
	return x * 2;
}
var a;
console.log(a);

function b(x, y, a) {
	arguments[2] = 10;
	console.log(a);
}
b(1, 2, 3);

function a() {
	console.log(this);
}
a.call(null);
