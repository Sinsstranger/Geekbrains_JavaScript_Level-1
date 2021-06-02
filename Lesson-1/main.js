'use strict';
document.addEventListener('DOMContentLoaded', () => {
	/**
	 * Задание 1
	 */
	document.querySelector('#inputCelsium').addEventListener('change', (event) => {
		let fahrenheitTemperature = (9 / 5) * event.target.value + 32;
		document.querySelector('.fahrenheit-temperature').innerHTML = `${fahrenheitTemperature} &#8457;`;
	});
	/**
	 * Задание 2 летит - подробнее в HTML, поэтому сразу 3
	 */
	let name = 'Василий', admin = name;/* redundant */
	document.querySelector('.task3-result').innerHTML = admin;
	/**
	 * Ну и 4 с 5
	 */
	document.querySelector('[data-task="3"]').innerHTML = 1000 + "108";
});