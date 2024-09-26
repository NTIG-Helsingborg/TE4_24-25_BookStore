const item_list = document.getElementById("item_list");
/**
 * @return {Promise<{[id:string]:{image:string,name:string,price:number}}>}
 */
async function data_fetch() {
	const res = await fetch('/data.json')
	const json = await res.json()
	return json
}
data_fetch().then((data) => {
	for (const element of item_list.children) {
		const item_name = element.getAttribute("item");
		const add_btn = element.querySelector(".add_item");
		const remove_btn = element.querySelector(".remove_item");
		const btnForCart = element.querySelector('.btnForCart');
		const qty = element.querySelector('.qty');
		const productImg = element.querySelector(".productImg")
		const productName = element.querySelector(".productName")
		const productPrice = element.querySelector(".productPrice")
		productImg.setAttribute('src',data[item_name].image)
		productName.textContent = data[item_name].name
		productPrice.textContent = `${data[item_name].price} kr`
		qty.addEventListener('input', () => {
			// Replace any non-digit character with an empty string
			qty.value = qty.value.replace(/[^0-9]/g, '');

			// Prevent leading zeros and set default value to 0 if input is empty
			if (qty.value === '' || isNaN(qty.value)) {
				qty.value = 0;
			}
		});

		add_btn.addEventListener("click", () => {
			qty.value++;
		});
		btnForCart.addEventListener("click", () => {
			cart.set(item_name, parseInt(qty.value));
		});
		remove_btn.addEventListener("click", () => {
			qty.value--;
			if (qty.value < 0) {
				qty.value = 0;
			}
		});
	}
})