const Joi = require("joi")
Joi.objectId = require("joi-objectid")(Joi)
const {
	validateConstants: { validTransactionConst },
} = require("../../helpers/constants")

const schemaTransaction = Joi.object({
	type: Joi.string().min(validTransactionConst.TYPE_NUMBER).max(validTransactionConst.TYPE_NUMBER).required(),
	category: Joi.string().min(validTransactionConst.MIN_LENGTH).max(validTransactionConst.MAX_LENGTH).required(),
	sum: Joi.number().integer().min(validTransactionConst.MIN_SUM).max(validTransactionConst.MAX_SUM).required(),
	data: Joi.date().max("now"),
	balance: Joi.number().integer().min(validTransactionConst.MIN_SUM).max(validTransactionConst.MAX_SUM).required(),
})

const schemaId = Joi.object({
	contactId: Joi.objectId().required(),
})

module.exports = { schemaTransaction, schemaId }
