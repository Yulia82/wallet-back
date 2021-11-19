const HttpCode = require("../constants/httpConstants")
const { userControllers } = require("../../controllers")
const { databaseApi } = require("../../repository")
const {
	JWT_SECRET_KEY,
	JWT_REFRESH_SECRET_KEY,
} = require("../../config/dotenv-config")
const jwt = require("jsonwebtoken")

const guard = async (req, res, next) => {
	let AccessToken = getAccessToken(req)

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

	const RefreshToken = getRefreshToken(req)

	const isRefreshToken = jwt.verify(
		RefreshToken,
		JWT_REFRESH_SECRET_KEY,
		(err, decoded) => {
			if (err) return null

			return decoded
		},
	)

	if (isRefreshToken) {
		const user = await databaseApi.findUserById(isRefreshToken.id)
		if (!user) return sendError(res)

		if (user.loginToken !== AccessToken) return sendError(res)
		req.user = await userControllers.refreshLoginToken(isRefreshToken.id)

		res.cookie("refreshToken", req.user.refreshToken, {
			maxAge: Date.now() + 30 * 60 * 1000,
		})

		return next()
	}
	return sendError(res)
}

function sendError(res) {
	return res.status(HttpCode.UNAUTHORIZED).json({
		status: "error",
		code: HttpCode.UNAUTHORIZED,
		message: "Invalid Authorization",
	})
}

function getAccessToken(req) {
	return req.get("Authorization")?.split(" ")[1]
}

function getRefreshToken(req) {
	return req.get("Cookie").split("=")[1]
}

module.exports = guard
