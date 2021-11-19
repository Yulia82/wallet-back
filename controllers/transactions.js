const { databaseApi } = require("../repository")
const { CustomError } = require("../helpers/errorHandler")
const { HttpCode, errorConstants } = require("../helpers/constants")

const getTransactions = async ({ user, query }, res) => {
	const { id: userId, loginToken } = user
	const { limit = 5, offset = 0, favorite = null } = query
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
	throw new CustomError(HttpCode.NOT_FOUND, "Transaction not found")
}

const saveTransaction = async ({ user, body }, res) => {
	const { id: userId, loginToken } = user
	const { balance } = await databaseApi.updateBalance(
		userId,
		body.sum,
		body.type,
	)
	const response = await databaseApi.createTransaction({
		...body,
		owner: userId,
		balance,
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
	const transaction = databaseApi.updateTransaction(
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
	throw new CustomError(HttpCode.NOT_FOUND, "Transaction not found")
}

const deleteTransaction = async (req, res) => {
	const { id: userId, loginToken } = req.user
	const transaction = await databaseApi.removeTransaction(
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
	throw new CustomError(HttpCode.NOT_FOUND, "Transaction not found")
}

const getStatistic = async (req, res) => {
	const {} = req.params
	console.log(req.params)
	res.send("hello")
}

module.exports = {
	getTransactions,
	getTransaction,
	saveTransaction,
	changeTransaction,
	deleteTransaction,
	getStatistic,
}
