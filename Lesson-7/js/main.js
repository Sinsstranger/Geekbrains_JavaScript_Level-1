'use strict';
/**
 * Определение текущего состояния хранилища при открытии страницы;
 * @type {any|*[]}
 */
!localStorage.productsCartStore ? localStorage.setItem('productsCartStore', JSON.stringify([])) : '';
let productsCartStore = JSON.parse(localStorage.productsCartStore);

console.log(JSON.parse(localStorage.productsCartStore));
/**
 * Обработка операций с хранилищем
 * @param product
 * @param action
 * @returns {Promise<boolean>}
 */
const productsCartReducer = async (product, action) => {
	let isProductInCart = false;
	let productIndex = false;
	/**
	 * Определяем есть ли уже такой товар в корзине
	 */
	for (const index in productsCartStore) {
		if (isProductInCart) {
			break;
		} else if (productsCartStore[+index].id === product.id) {
			isProductInCart = true;
			productIndex = +index;
		}
	}
	if (isProductInCart) {
		if (action === 'add') {
			Object.assign(productsCartStore[productIndex], {count: ++productsCartStore[productIndex].count || 1});
		} else if (action === 'del') {
			Object.assign(productsCartStore[productIndex], {count: --productsCartStore[productIndex].count || 0});
			(productsCartStore[productIndex].count <= 0) ? productsCartStore.splice(+productIndex, 1) : '';
		}
	} else if (!isProductInCart && action === 'add') {
		product.count = 1;
		productsCartStore.push(product);
		productIndex = productsCartStore.length - 1;
	} else {
		console.log(`Не корректная операция\n`);
	}
	localStorage.productsCartStore = JSON.stringify(productsCartStore);
	console.log(`Reducer End\n`, JSON.parse(localStorage.productsCartStore));
	return productIndex;
}
/**
 * Генерация HTML кода для корзины
 * @param productId
 * @param productStoreIndex
 * @param cartType
 * @returns {Promise<string>}
 */
const smallCartItemGenerator = async (productId, productStoreIndex, cartType = 'mini-cart') => {
	if (productsCartStore[productStoreIndex].id === productId && document.querySelector(`.mini-cart [data-vendor-code="${productId}"] .mini-cart__count > .num`)) {
		document.querySelector(`.mini-cart [data-vendor-code="${productId}"] .mini-cart__count > .num`).textContent = `${productsCartStore[productStoreIndex].count}`;
		return ``;
	}
	return `<div class="${cartType}__item" data-vendor-code="${productId}">\
					<div class="${cartType}__close"><i class="far fa-times-circle"></i></div>\
						<div class="${cartType}__description">\
							<img src="https://via.placeholder.com/150" alt="#" class="mini-cart__image">\
							<div class="${cartType}__caption">
								<div class="${cartType}__title">${productsCartStore[productStoreIndex].name}</div>
								<div class="${cartType}__text">${productsCartStore[productStoreIndex].description}</div>
								<div class="${cartType}__price">Цена товара ${productsCartStore[productStoreIndex].price} рублей</div>
								<div class="${cartType}__count">Количество <span class="num">${productsCartStore[productStoreIndex].count}</span> единиц</div>
							</div>
						</div>
				</div>`;
}
/**
 * Обработка добавления в корзину нового товара, либо увеличения его количества
 * @param productBuy
 * @returns {Promise<void>}
 */
const handleAddToCart = async productBuy => {
	/* Свойства товара */
	let productProps = {
		id: productBuy.closest('.catalog__product').dataset.vendorCode,
		name: productBuy.closest('.catalog__product').querySelector('.card-title').textContent,
		description: productBuy.closest('.catalog__product').querySelector('.card-text').textContent,
		price: +productBuy.closest('.catalog__product').querySelector('.mini-cart__price>.num').textContent,
	};
	let productStoreIndex = await productsCartReducer(productProps, 'add');
	let cartItemHtml = await smallCartItemGenerator(productProps.id, productStoreIndex);
	document.querySelector('.mini-cart__items').insertAdjacentHTML('beforeend', cartItemHtml);
}
/**
 * Обработка удаления из корзины, либо уменьшения количества товаров
 * @param vendorCode
 * @returns {Promise<boolean>}
 */
const handleRemoveFromCart = async vendorCode => {
	return await productsCartReducer({id: vendorCode}, 'del');
}
const recalcCart = async () => {
	let allProductsCount = 0, allProductsPrice = 0;
	for (let product of productsCartStore) {
		allProductsCount += +product.count;
		allProductsPrice += +product.price * product.count;
	}
	console.log(allProductsCount, allProductsPrice);
	document.querySelectorAll('.mini-cart__epilog').forEach(cart => {
		cart.querySelector(`[class*="__count"]`).textContent = allProductsCount.toString();
		cart.querySelector(`[class*="__summ"]`).textContent = allProductsPrice.toString();
	});
}
/**
 * Вешаем событие добавления в корзину на родителя
 */
document.querySelectorAll('.mini-cart__buy').forEach(buyBtn => {
	buyBtn.addEventListener('click', async event => {
		await handleAddToCart(event.target);
		await recalcCart();
	});
});
/**
 * Вешаем событие удаления из корзины на родителя
 */
document.querySelectorAll('.mini-cart__items').forEach(removeBtn => {
	removeBtn.addEventListener('click', async event => {
		let productStoreIndex = await handleRemoveFromCart(event.target.closest('[data-vendor-code]').dataset.vendorCode);
		if (!productsCartStore[productStoreIndex] || productsCartStore[productStoreIndex].id !== event.target.closest('[data-vendor-code]').dataset.vendorCode) {
			event.target.closest('[data-vendor-code]').remove();
		} else if (+productsCartStore[productStoreIndex].id === +event.target.closest('[data-vendor-code]').dataset.vendorCode) {
			document.querySelectorAll(`.mini-cart__item[data-vendor-code="${productsCartStore[productStoreIndex].id}"]`).forEach(elem => {
				elem.querySelector('[class*="__count"]>.num').textContent = productsCartStore[productStoreIndex].count;
			});
		}
		await recalcCart();
	});
});
/**
 * Будем отрисовывать корзины большую и маленькую при загрузке страницы
 * @returns {Promise<{small: string, big: string}>}
 */
const restoreCarts = async () => {
	let smallCartHtml = '', bigCartHtml = '';
	await recalcCart();
	for (const index in productsCartStore) {
		smallCartHtml += await smallCartItemGenerator(productsCartStore[+index].id, +index);
		bigCartHtml += await smallCartItemGenerator(productsCartStore[+index].id, +index, 'big-cart');
	}
	return {small: smallCartHtml, big: bigCartHtml};
}
document.addEventListener('DOMContentLoaded', async event => {
	document.querySelector('.mini-cart__items').insertAdjacentHTML('beforeend', (await restoreCarts()).small);
	if(/.*cart\.html$/.test(window.location.pathname)){
		document.querySelector('.big-cart__items').insertAdjacentHTML('beforeend', (await restoreCarts()).big);
	}
});