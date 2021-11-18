const { databaseApi } = require("../repository")
const { CustomError } = require("../helpers/errorHandler")
const { HttpCode, errorConstants } = require("../helpers/constants")

const getTransactions = async (req, res) => {
	const { id: userId, loginToken } = req.user
	const transactions = await databaseApi.getAllTransaction(userId)
	res.json({ status: "success", code: HttpCode.OK, loginToken, response: { transactions } })
}

const getTransaction = async (req, res) => {
	const { id: userId, loginToken } = req.user
	const transaction = await databaseApi.getTransactionById(req.params.transactionId, userId)
	if (transaction) {
		return res.status(HttpCode.OK).json({ status: "success", code: HttpCode.OK, loginToken, response: { transaction } })
	}
	throw new CustomError(HttpCode.NOT_FOUND, "Transaction not found")
}

const saveTransaction = async (req, res) => {
	const { id: userId, loginToken } = req.user
	const transaction = await databaseApi.createTransaction({ ...req.body, owner: userId })
	res
		.status(HttpCode.CREATED)
		.json({ status: "success", code: HttpCode.CREATED, loginToken, response: { transaction } })
}

const changeTransaction = async (req, res) => {
	const { id: userId, loginToken } = req.user
	const transaction = databaseApi.updateTransaction(req.params.transactionId, req.body, userId)
	if (transaction) {
		return res.status(HttpCode.OK).json({ status: "success", code: HttpCode.OK, loginToken, response: { transaction } })
	}
	throw new CustomError(HttpCode.NOT_FOUND, "Transaction not found")
}

const deleteTransaction = async (req, res) => {
	const { id: userId, loginToken } = req.user
	const transaction = await databaseApi.removeTransaction(req.params.transactionId, userId)
	if (transaction) {
		return res.status(HttpCode.OK).json({ status: "success", code: HttpCode.OK, loginToken, response: { transaction } })
	}
	throw new CustomError(HttpCode.NOT_FOUND, "Transaction not found")
}

module.exports = { getTransactions, getTransaction, saveTransaction, changeTransaction, deleteTransaction }
