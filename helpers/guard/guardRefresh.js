const { databaseApi } = require("../../repository")
const { JWT_REFRESH_SECRET_KEY } = require("../../config/dotenv-config")
const jwt = require("jsonwebtoken")
const { getAccessToken, getRefreshToken, sendError } = require("./guardHelpers")

const guardRefresh = async (req, res, next) => {
	const RefreshToken = getRefreshToken(req)
	// console.lo;
	console.log(RefreshToken)
	const isRefreshToken = jwt.verify(
		RefreshToken,
		JWT_REFRESH_SECRET_KEY,
		(err, decoded) => {
			if (err) return null

			return decoded
		},
	)
	console.log("isRefreshToken", isRefreshToken)

	if (isRefreshToken) {
		const user = await databaseApi.findUserById(isRefreshToken.id)
		let AccessToken = getAccessToken(req)
		console.log(user, AccessToken)
		if (!user) return sendError(res)

		if (user.loginToken !== AccessToken) {
			return sendError(res)
		}
		req.user = user

		return next()
	}

	return sendError(res)
}

module.exports = guardRefresh
