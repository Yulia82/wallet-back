const {} = require("./user")
const {} = require("./transactions")

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
module.exports = {}
