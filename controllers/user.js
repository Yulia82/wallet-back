const { databaseApi } = require("../repository")
const { CustomError } = require("../helpers/errorHandler")
const jwt = require("jsonwebtoken")
const path = require("path")
const { JWT_SECRET_KEY } = require("../config/dotenv-config")
const { HttpCode, errorConstants } = require("../helpers/constants")

const { EmailService, CreateSenderNodemailer, CreateSenderSendGrid } = require("../services/email")

const {
	OK,
	CREATED,
	ACCEPTED,
	NO_CONTENT,
	BAD_REQUEST,
	UNAUTHORIZED,
	FORBIDDEN,
	NOT_FOUND,
	CONFLICT,
	INTERNAL_SERVER_ERROR,
} = HttpCode

const registration = async (req, res, next) => {
	const { name, email, password } = req.body
	const user = await databaseApi.findUserByEmail(email)

	if (user) {
		throw new CustomError(CONFLICT, "Email is use", errorConstants.EXIST_USER_ERROR)
	}

	const newUser = await databaseApi.registration({
		name,
		email,
		password,
	})

	const emailServise = new EmailService(process.env.NODE_ENV, new CreateSenderSendGrid())

	const statusEmail = await emailServise.sendVerifyEmail(newUser.email, newUser.name, newUser.verifyToken)

	return res.status(CREATED).json({
		status: "success",
		code: CREATED,
		data: {
			id: newUser.id,
			name: newUser.name,
			email: newUser.email,
			successEmail: statusEmail,
			message: "Check your email and complete registration",
		},
	})
}

// const login = async (req, res, next) => {
// 	const { email, password } = req.body
// 	const user = await Users.findByEmail(email)
// 	const isValidPassword = await user?.isValidPassword(password)

// 	if (!user || !isValidPassword || !user?.isVerified) {
// 		return res.status(UNAUTHORIZED).json({
// 			status: "error",
// 			code: UNAUTHORIZED,
// 			message: "Invalid login or password",
// 		})
// 	}
// 	const id = user._id
// 	const payload = { id }
// 	const token = jwt.sign(payload, SECRET_KEY, { expiresIn: "1h" })
// 	await Users.updateToken(id, token)

// 	return res.status(OK).json({
// 		status: "success",
// 		code: OK,
// 		data: {
// 			token,
// 		},
// 	})
// }

// const logout = async (req, res, next) => {
// 	const id = req.user._id
// 	await Users.updateToken(id, null)
// 	return res.status(NO_CONTENT).json()
// }

// const getCurrentUser = async (req, res, next) => {
// 	const { email, subscription } = req.user
// 	return res.status(OK).json({
// 		status: "success",
// 		code: OK,
// 		data: { email, subscription },
// 	})
// }

const verifyUser = async (req, res, next) => {
	const user = await databaseApi.findUserByVerifyToken(req.params.token)
	if (user) {
		await databaseApi.updateTokenVerify(user._id, true, null)
		return res.status(OK).json({
			status: "success",
			code: OK,
			data: {
				message: "Success",
			},
		})
	}
	throw new CustomError(BAD_REQUEST, "Invalid token", errorConstants.BAD_REQUEST)
}

const repeatEmailForVerifyUser = async (req, res, next) => {
	const { email } = req.body
	const user = await databaseApi.findUserByEmail(email)

	if (user) {
		const { email, name, verifyToken } = user
		const emailServise = new EmailService(process.env.NODE_ENV, new CreateSenderNodemailer())

		const statusEmail = await emailServise.sendVerifyEmail(email, name, verifyToken)
	}

	return res.status(OK).json({
		status: "success",
		code: OK,
		data: {
			message: "Success",
		},
	})
}

module.exports = {
	registration,
	// login,
	// logout,
	// getCurrentUser,
	verifyUser,
	repeatEmailForVerifyUser,
}
