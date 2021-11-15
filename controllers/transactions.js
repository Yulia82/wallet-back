const { databaseApi } = require("../repository")

const getTransactions = async (req, res, next) => {
	try {
		const userId = req.user._id
		const transactions = await databaseApi.getAllTransaction(userId)
		res.json({ status: "success", code: 200, data: { transactions } })
	} catch (error) {
		next(error)
	}
}

const getTransaction = async (req, res, next) => {
	try {
		const userId = req.user._id
		const transaction = await databaseApi.getTransactionById(req.params.id, userId)
		if (transaction) {
			return res.status(200).json({ status: "success", code: 200, data: { transaction } })
		}
		return res.status(404).json({ status: "error", code: 404, message: "Transaction not found" })
	} catch (error) {
		next(error)
	}
}

const saveTransaction = async (req, res, next) => {
	try {
		const userId = req.user._id
		const transaction = await databaseApi.createTransaction({ ...req.body, owner: userId })
		console.log(transaction)
		res.status(201).json({ status: "success", code: 201, data: { transaction } })
	} catch (error) {
		next(error)
	}
}

const changeTransaction = async (req, res, next) => {
	try {
		const userId = req.user._id
		const transaction = databaseApi.updateTransaction(req.params.id, req.body, userId)
		if (transaction) {
			return res.status(200).json({ status: "success", code: 200, data: { transaction } })
		}
		return res.status(404).json({ status: "error", code: 404, message: "Not found" })
	} catch (error) {
		next(error)
	}
}

const deleteTransaction = async (req, res, next) => {
	try {
		const userId = req.user._id
		const transaction = await databaseApi.removeTransaction(req.params.transactionId, userId)
		if (transaction) {
			return res.status(200).json({ status: "success", code: 200, data: { transaction } })
		}
		return res.status(404).json({ status: "error", code: 404, message: "Not found" })
	} catch (error) {
		next(error)
	}
}

module.exports = { getTransactions, getTransaction, saveTransaction, changeTransaction, deleteTransaction }
