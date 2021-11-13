const { errorConstants } = require("../constants")

const wrapperError = fn => async (req, res, next) => {
	try {
		const result = await fn(req, res, next)
		return result
	} catch (e) {
		switch (e.name) {
			case errorConstants.CUSTOM_ERROR:
				res.status(e.status).json({
					status: "error",
					code: e.status,
					message: error.message,
				})
				break

			case errorConstants.EXIST_USER_ERROR:
				res.status(e.status).json({
					Status: "error",
					code: e.status,
					response: {
						message: e.message,
					},
				})
				break
			case errorConstants.CREDENTIALS_ERROR:
				res.status(e.status).json({
					status: "error",
					code: e.status,
					message: e.message,
				})
				break

			default:
				next(e)
				break
		}
	}
}

module.exports = wrapperError
