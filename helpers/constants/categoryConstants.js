const categoryDecrement = { regular: "Регулярный доход", irregular: "Нерегулярный доход" }
const categoryIncrement = { any: "Разное", auto: "Машина", products: "Продукты" }

const categoryKeys = {
	categoryDecrement: Object.entries(categoriesConstants.categoryDecrement).flatMap(arr => ({
		type: arr[0],
		value: arr[1],
	})),
	categoryIncrement: Object.entries(categoriesConstants.categoryIncrement).flatMap(arr => ({
		type: arr[0],
		value: arr[1],
	})),
}

module.exports = { categoryDecrement, categoryIncrement, categoryKeys }
