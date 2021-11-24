const jwt = require("jsonwebtoken")
const {
	JWT_SECRET_KEY,
	JWT_REFRESH_SECRET_KEY,
} = require("../../config/dotenv-config")

class TokenService {
	constructor({ id, name }) {
		this.payload = { id, name }
	}
	createTokens() {
		const loginToken = jwt.sign(this.payload, JWT_SECRET_KEY, {
			expiresIn: "10m",
		})

		const refreshToken = jwt.sign(this.payload, JWT_REFRESH_SECRET_KEY, {
			expiresIn: "20m",
		})
		return { loginToken, refreshToken }
	}
}

module.exports = TokenService
