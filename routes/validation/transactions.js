const { valid } = require("joi")
const Joi = require("joi")
Joi.objectId = require("joi-objectid")(Joi)
const {
	validateConstants: { validTransactionConst },
	categoriesConstants: { categoryIncrement, categoryDecrement },
} = require("../../helpers/constants")

const schemaTransaction = Joi.object({
	type: Joi.boolean().required(),
	category: Joi.string()
		.valid(...Object.keys(categoryIncrement), ...Object.keys(categoryDecrement))
		.required(),
	sum: Joi.number()
		.integer()
		.min(validTransactionConst.MIN_SUM)
		.max(validTransactionConst.MAX_SUM)
		.required(),
	date: Joi.date().max("now"),
})

const schemaId = Joi.object({
	transactionId: Joi.objectId().required(),
})

module.exports = { schemaTransaction, schemaId }
