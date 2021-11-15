const passport = require("passport")

require("./passport-config")
const HttpCode = require("../constants/httpConstants")

const guard = (req, res, next) => {
	passport.authenticate("jwt", { session: false }, (error, user) => {
		const token = req.get("Authorization")?.split(" ")[1]
		if (!user || error || token !== user.loginToken) {
			return res.status(HttpCode.UNAUTHORIZED).json({
				status: "error",
				code: HttpCode.UNAUTHORIZED,
				message: "Invalid login or password",
			})
		}
		req.user = user
		return next()
	})(req, res, next)
}

module.exports = guard
