/**
 * 1. С помощью цикла while вывести все простые числа в промежутке от 0 до 100.
 * сито Эратосфена - всю жизнь терпеть ни мог олимпиадное программирование
 */
const primeDiapason = (limit) => {
	if (limit < 2) return [];
	let sqrtlmt = limit ** .5 - 2;
	let nums = Array.from({length: limit - 1}, (_, i) => i + 2);
	for (let i = 0; i <= sqrtlmt; i++) {
		let p = nums[i];
		if (p) {
			for (let j = p * p - 2; j < nums.length; j += p)
				nums[j] = 0;
		}
	}
	return nums.filter(x => x);
}
console.log(`###\n${primeDiapason(100).join('|')}\n###`);
/**
 * 2. С этого урока начинаем работать с функционалом интернет-магазина. Предположим, есть сущность корзины. Нужно реализовать функционал подсчета стоимости корзины в зависимости от находящихся в ней товаров.
 * 3. Товары в корзине хранятся в массиве. Задачи:
 *		a) Организовать такой массив для хранения товаров в корзине;
 *		b) Организовать функцию countBasketPrice, которая будет считать стоимость корзины.
 */
let cart = {
	items: [
		{name: `Майка`, price: 2300},
		{name: `Брюки`, price: 4700},
		{name: `Туфли`, price: 6200}
	],
	countBasketPrice() {
		return `Цена товаров в корзине: ${this.items.reduce((buffer, currentItem) => buffer + currentItem.price, 0
		)}\n`;
	}
};
console.log(cart.countBasketPrice());
/**
 * 4.*Вывести с помощью цикла for числа от 0 до 9, не используя тело цикла.
 */
for (let i = 0; i < 9; console.log(++i)) {
}
/**
 * 5. *Нарисовать пирамиду с помощью console.log, у вашей пирамиды должно быть 20 рядов
 */
for (let symb = 'x'; symb.length <= 20; symb += 'x') {
	console.log(`${symb}`);
}