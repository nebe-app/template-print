document.addEventListener('keydown', (event) => {
	if (event.key.toLowerCase() === 'd') {
		document.querySelector('html').classList.toggle('is-development');
	}
});

window.LOAD_IMAGE = src => {
	return new Promise((resolve, reject) => {
		let img = new Image();
		img.onload = () => resolve(img);
		img.onerror = (error) => reject(error);
		img.src = src;
	});
};

window.FILL = async (inputs) => {
	window.clickTag = inputs.url;

	const textSlots = ['headline', 'price', 'price_old', 'discount', 'name', 'description'];

	textSlots.forEach((slotName) => {
		const slotElement = document.querySelector(`article[data-slot="${slotName}"]`);

		if (slotElement) {
			slotElement.innerHTML = inputs[slotName];
		}
	});

	const imageEl = document.querySelector(`article[data-image-slot="image"]`);
	const hasImage = inputs.image && inputs.image.indexOf('http') === 0;

	if (hasImage) {
		await window.LOAD_IMAGE(inputs.image);
		imageEl.innerHTML = `<img src="${inputs.image}" alt="">`;
		imageEl.style.display = 'block';
	} else {
		console.warn(`Nebylo definován obrázek`);
	}

	// Reformat old price
	const priceOldEl = document.querySelector(`article[data-slot="price_old"]`);
	const priceOld = priceOldEl.textContent.replace(/\D/g, '');
	priceOldEl.innerHTML= `<strong>${parseInt(priceOld).toLocaleString('cs')}</strong> €`;

	// Reformat price
	const priceEl = document.querySelector(`article[data-slot="price"]`);
	const price = priceEl.textContent.replace(/\D/g, '');
	priceEl.innerHTML = `<small>only</small> <strong>${parseInt(price).toLocaleString('cs')}</strong> €`;

	// Reformat discount
	const discountEl = document.querySelector(`article[data-slot="discount"]`);
	const discount = discountEl.textContent.replace(/\D/g, '');
	discountEl.textContent = `-${parseInt(discount).toLocaleString('cs')}`;

	// Headline
	await window.FIT(document.querySelector('article[data-slot="headline"]'));

	// Name
	await window.FIT(document.querySelector('article[data-slot="name"]'));
};
