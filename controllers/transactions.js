const { databaseApi } = require("../repository")
const { CustomError } = require("../helpers/errorHandler")
const {
	HttpCode,
	errorConstants,
	categoriesConstants,
} = require("../helpers/constants")

const getTransactions = async ({ user, query }, res) => {
	const { id: userId, loginToken } = user
	const { limit = 5, offset = 0 } = query
	const searchOptions = { owner: userId }
	const response = await databaseApi.getAllTransaction(searchOptions, {
		limit,
		offset,
	})
	res.json({
		status: "success",
		code: HttpCode.OK,
		loginToken,
		response,
	})
}

const getTransaction = async (req, res) => {
	const { id: userId, loginToken } = req.user
	const transaction = await databaseApi.getTransactionById(
		req.params.transactionId,
		userId,
	)
	if (transaction) {
		return res.status(HttpCode.OK).json({
			status: "success",
			code: HttpCode.OK,
			loginToken,
			response: {
				transaction,
			},
		})
	}
	throw new CustomError(
		HttpCode.NOT_FOUND,
		"Transaction not found",
		errorConstants.TRANSACTION_ID_ERROR,
	)
}

const saveTransaction = async ({ user, body }, res) => {
	const { id: userId, loginToken } = user
	const { balance } = await databaseApi.updateBalance(
		userId,
		body.sum,
		body.type,
	)
	const dataSeconds = new Date(+body.date)
	console.log(dataSeconds)
	console.log(
		`${dataSeconds.getFullYear()}-${
			dataSeconds.getMonth() + 1
		}-${dataSeconds.getDate()}`,
	)

	const month = dataSeconds.getMonth() + 1
	const day = dataSeconds.getDate()
	const response = await databaseApi.createTransaction({
		...body,
		owner: userId,
		balance,
		date: `${dataSeconds.getFullYear()}-${month < 10 ? `0${month}` : month}-${
			day < 10 ? `0${day}` : day
		}`,
	})
	res.status(HttpCode.CREATED).json({
		status: "success",
		code: HttpCode.CREATED,
		loginToken,
		response,
	})
}

const changeTransaction = async (req, res) => {
	const { id: userId, loginToken } = req.user
	const transaction = await databaseApi.updateTransaction(
		req.params.transactionId,
		req.body,
		userId,
	)
	if (transaction) {
		return res.status(HttpCode.OK).json({
			status: "success",
			code: HttpCode.OK,
			loginToken,
			response: {
				transaction,
			},
		})
	}
	throw new CustomError(
		HttpCode.NOT_FOUND,
		"Transaction not found",
		errorConstants.TRANSACTION_ID_ERROR,
	)
}

const deleteTransaction = async (req, res) => {
	const { id: userId, loginToken } = req.user
	const response = await databaseApi.removeTransaction(
		req.params.transactionId,
		userId,
	)

	if (response) {
		return res.status(HttpCode.OK).json({
			status: "success",
			code: HttpCode.OK,
			loginToken,
			response,
		})
	}
	throw new CustomError(
		HttpCode.NOT_FOUND,
		"Transaction not found",
		errorConstants.TRANSACTION_ID_ERROR,
	)
}

const getStatistic = async ({ user, query }, res) => {
	const { id: userId, loginToken } = user
	const { month = null, year = null } = query

	let searchOptions = { owner: userId, type: false }

	const transactions = await databaseApi.getStat(searchOptions)

	let response = []

	Object.keys(categoriesConstants.categoryIncrement).forEach(key => {
		const category = transactions.reduce(
			(acc, el) => {
				if (month) {
					const testMonth = el.date.split("-")[1]

					if (month !== testMonth) return acc
				}

				if (year) {
					const testYear = el.date.split("-")[0]
					console.log(el.date.split("-")[0] === year)
					if (year !== testYear) return acc
				}
				if (el.category === key) {
					acc = { ...acc, summary: acc.summary + el.sum }
					return acc
				}
				return acc
			},
			{ summary: 0, type: key },
		)
		response.push(category)
	})

	return res.status(HttpCode.OK).json({
		status: "success",
		code: HttpCode.OK,
		loginToken,
		response,
	})
}

module.exports = {
	getTransactions,
	getTransaction,
	saveTransaction,
	changeTransaction,
	deleteTransaction,
	getStatistic,
}
