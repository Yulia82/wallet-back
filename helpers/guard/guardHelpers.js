const HttpCode = require("../constants/httpConstants")
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
	return req.get("Cookie")?.split("=")[1]
}

module.exports = { sendError, getAccessToken, getRefreshToken }
