const categoryDecrement = {
	regular: "Регулярный доход",
	irregular: "Нерегулярный доход",
}
const categoryIncrement = {
	otherExpenses: "Другие расходы",
	auto: "Машина",
	products: "Продукты",
	mainExpenses: "Основные расходы",
	familyExpenses: "Забота о семье",
	childrenExpenses: "Забота о детях",
	householdProducts: "Товары для дома",
	education: "Образование",
	leisure: "Досуг",
}

const categoryKeys = {
	categoryDecrement: Object.entries(categoryDecrement).flatMap(arr => ({
		type: arr[0],
		value: arr[1],
	})),
	categoryIncrement: Object.entries(categoryIncrement).flatMap(arr => ({
		type: arr[0],
		value: arr[1],
	})),
}

module.exports = { categoryDecrement, categoryIncrement, categoryKeys }
