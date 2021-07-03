/**
 * Перекликивание маленьких картинок в превью карточки товаров в большую
 */
document.querySelectorAll('.gallery-image').forEach(item => {
	item.addEventListener('click', event => {
		event.target.closest('.card__preview').querySelector('.card__image').src = event.target.src;
	});
});
/**
 * Функционал добавления изображений из превью карточки товара в галерею
 */
const renewGallery = image => {
	let galleryTrack = document.querySelector('.modal__content');
	let sliderImg = image.cloneNode();
	sliderImg.classList.remove('card__image');
	sliderImg.classList.add('slider-image');
	sliderImg.classList.add('active');
	galleryTrack.innerHTML = ``;
	galleryTrack.appendChild(sliderImg);
	image.parentElement.querySelectorAll('.gallery-image').forEach(galImage => {
		let resImage = galImage.cloneNode();
		resImage.classList.remove('gallery-image');
		resImage.classList.add('slider-image');
		if (galImage.src !== image.src) {
			galleryTrack.appendChild(resImage);
		}
	});
}
/**
 * Открытие модального окна при нажатии на активную картинку товара и наполнение слайдера картинками
 */
document.querySelectorAll('.card__image').forEach(image => {
	image.addEventListener('click', event => {
		renewGallery(event.target);
		document.querySelector('.modal-wrapper').classList.toggle('hide');
	});
});
/**
 * Закрытие мобального окна
 */
document.querySelector('.modal__close').addEventListener('click', event => {
	event.currentTarget.parentElement.classList.add('hide');
});
/**
 * Функционал прокрутки слайдера
 */
const sliderScroll = (arrow, move = 'next') => {
	let currentRender = move === 'prev' ? arrow.nextElementSibling.querySelector('.active') : arrow.previousElementSibling.querySelector('.active');
	currentRender.classList.remove('active');
	if (move === 'next') {
		currentRender.nextElementSibling !== null ? currentRender.nextElementSibling.classList.add('active') : currentRender.parentElement.firstElementChild.classList.add('active');
		return true;
	}
	if (move === 'prev') {
		currentRender.previousElementSibling !== null ? currentRender.previousElementSibling.classList.add('active') : currentRender.parentElement.lastElementChild.classList.add('active');
		return true;
	}
}
document.querySelectorAll('.modal__prev, .modal__next').forEach(arrow => {
	arrow.addEventListener('click', event => {
		event.currentTarget.classList.contains('modal__prev') ? sliderScroll(event.currentTarget, 'prev') : sliderScroll(event.currentTarget, 'next');
	});
});
/**
 * Пересчет стоимости всех товаров в корзине и их количества
 */
const recalcCartPrice = (item, action) => {
	let [currentSumm, currentCount] = [+document.querySelector('.mini-cart__summ').textContent, +document.querySelector('.mini-cart__count').textContent];
	if (action === '+') {
		currentSumm += +item.querySelector('.price').textContent;
		currentCount++;
	}
	if (action === '-') {
		currentSumm -= +item.querySelector('.mini-cart__price').textContent;
		currentCount--;
	}
	[document.querySelector('.mini-cart__summ').textContent, document.querySelector('.mini-cart__count').textContent] = [currentSumm.toString(), currentCount.toString()];

}
/**
 * Функционал добавления в корзину
 */
const addProductToCart = button => {
	let product = button.closest('.card');
	let productProps = {
		image: product.querySelector('.card__image').src,
		name: product.querySelector('.card-title').textContent,
		price: product.querySelector('.card-body .price').textContent,
	}
	document.querySelector('.mini-cart__items').insertAdjacentHTML('beforeend',
		`<div class="mini-cart__item">
					<span class="mini-cart__cross"><i class="fas fa-times"></i></span>
					<div class="mini-cart__props">
					<img src="${productProps.image}" alt="#" class="mini-cart__image">
						<div class="mini-cart__caption">
							<p class="mini-cart__title">${productProps.name}</p>
							<p class="mini-cart__price">${productProps.price}</p>
						</div>
					</div>
				</div>`);
}
document.querySelectorAll('.buy-now').forEach(button => {
	button.addEventListener('click', event => {
		recalcCartPrice(event.currentTarget.closest('.card'), "+");
		addProductToCart(event.currentTarget);
	});
});
/**
 * Функционал удаления из корзины
 */
document.querySelector('.mini-cart__detail').addEventListener('click', event => {
	if (event.target.parentElement.parentElement.className === 'mini-cart__cross') {
		recalcCartPrice(event.target.closest('.mini-cart__item'), '-');
		event.target.closest('.mini-cart__item').remove();
	}
});