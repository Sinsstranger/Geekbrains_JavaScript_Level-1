'use strict';
const task3 = (a, b) => {
	console.log(`Задание 3: В этом задании не стал делать из else просто отстойник`);
	if (a >= 0 && b >= 0) {
		return a - b;
	} else if (a < 0 && b < 0) {
		return a * b;
	} else {
		return a + b;
	}
}
const task4 = (int = Math.floor(Math.random() * 15)) => {
	console.log(`Задание 4`);
	switch (int) {
		case 1:
			console.log(1);
		case 2:
			console.log(2);
		case 3:
			console.log(3);
		case 4:
			console.log(4);
		case 5:
			console.log(5);
		case 6:
			console.log(6);
		case 7:
			console.log(7);
		case 8:
			console.log(8);
		case 9:
			console.log(9);
		case 10:
			console.log(10);
		case 11:
			console.log(11);
		case 12:
			console.log(12);
		case 13:
			console.log(13);
		case 14:
			console.log(14);
		case 15:
			console.log(15);
		default:
			break;
	}
}
const task5 = (arg1, arg2, operation) => {
	switch (operation) {
		case '+':
			return arg1 + arg2;
		case '-':
			return arg1 - arg2;
		case '*':
			return arg1 * arg2;
		case '/':
			return arg1 / arg2 === Infinity || arg1 / arg2 === -Infinity ? 'На ноль делить нельзя!' : arg1 / arg2;
		default:
			return 'Не корректный ввод операции';

	}
}
const customPower = (value, pow) => {
	if (value === 0) {
		return 0;
	} else if (pow === 0) {
		return 1;
	} else if (pow < 0) {
		return customPower(1 / value, -pow);
	} else {
		return value * customPower(value, --pow);
	}
}
document.addEventListener('DOMContentLoaded', () => {
	console.log(task3(1, -2));
	task4();
	console.log(`Задание 5 результат: ${task5(9, 0, '/')}\nЗадание 6 поглощено, Задание 7 - в HTML`);
	console.log(`Задание 8 результат: ${customPower(2,10)}`);
});