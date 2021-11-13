const Joi = require("joi")
Joi.objectId = require("joi-objectid")(Joi)
const { validTransactionConst } = require("../../helpers/constants")

const schemaTransaction = Joi.object({
	type: Joi.string().min(validTransactionConst.TYPE_NUMBER).max(validTransactionConst.TYPE_NUMBER).require(),
	category: Joi.string().min(validTransactionConst.MIN_LENGTH).max(validTransactionConst.MAX_LENGTH).require(),
	sum: Joi.number().integer().min(validTransactionConst.MIN_SUM).max(validTransactionConst.MAX_SUM).require(),
	data: Joi.date().max("now"),
	balance: Joi.number().integer().min(validTransactionConst.MIN_SUM).max(validTransactionConst.MAX_SUM).require(),
})

const schemaId = Joi.object({
	contactId: Joi.objectId().required(),
})

module.exports = { schemaTransaction, schemaId }
