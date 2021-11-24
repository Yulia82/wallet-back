const { databaseApi } = require("../../repository")
const { JWT_SECRET_KEY } = require("../../config/dotenv-config")
const jwt = require("jsonwebtoken")
const { sendError, getAccessToken } = require("./guardHelpers")

const guard = async (req, res, next) => {
	console.log("Cookies: ", req.headers.cookie)
	let AccessToken = getAccessToken(req)
	console.log("AccessToken", AccessToken)
	if (!AccessToken) return sendError(res)

	const isAccessToken = jwt.verify(
		AccessToken,
		JWT_SECRET_KEY,
		(err, decoded) => {
			if (err) return null
			return decoded
		},
	)

	if (isAccessToken) {
		const user = await databaseApi.findUserById(isAccessToken.id)
		if (!user) return sendError(res)
		req.user = user

		return next()
	}
	return sendErrorBedAccess(res)
}

function sendErrorBedAccess(res) {
	return res.status(423).json({
		status: "error",
		code: 423,
		message: "Invalid Authorization",
	})
}

module.exports = guard
