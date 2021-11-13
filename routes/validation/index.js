const { schemaUser, schemaCredentialsUser, schemaResendVerify } = require("./user")
const { schemaTransaction } = require("./transactions")

const validate = async (schema, obj, res, next) => {
	try {
		await schema.validateAsync(obj)
		next()
	} catch (err) {
		console.error(err)
		res.status(400).json({
			status: "error",
			code: 400,
			message: `Field ${err.message.replace(/"/g, "")}`,
		})
	}
}

//* registration
module.exports.validateUser = async (req, res, next) => await validate(schemaUser, req.body, res, next)
//* login
module.exports.validateCredentials = async (req, res, next) =>
	await validate(schemaCredentialsUser, req.body, res, next)
//* if resend verify token
module.exports.validateEmailBeforeVerify = async (req, res, next) =>
	await validate(schemaResendVerify, req.body, res, next)
//* transaction
module.exports.validateTransaction = async (req, res, next) => await validate(schemaTransaction, req.body, res, next)
