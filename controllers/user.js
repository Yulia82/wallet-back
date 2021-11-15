const crypto = require("crypto")
const { databaseApi } = require("../repository")
const { CustomError } = require("../helpers/errorHandler")
const jwt = require("jsonwebtoken")
const path = require("path")
const ENV = require("../config/dotenv-config")
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

	const emailServise = new EmailService(ENV, new CreateSenderSendGrid())

	const statusEmail = await emailServise.sendVerifyEmail(newUser.email, newUser.name, newUser.verifyToken)

	return res.status(CREATED).json({
		status: "success",
		code: CREATED,
		data: {
			name: newUser.name,
			email: newUser.email,
			successEmail: statusEmail,
			message: "Check your email and complete registration",
		},
	})
}

const login = async (req, res, next) => {
	const { email, password } = req.body
	const user = await databaseApi.findUserByEmail(email)
	const isValidPassword = await user?.isValidPassword(password)

	if (!user || !isValidPassword || !user?.isVerified) {
		throw new CustomError(UNAUTHORIZED, "Invalid login or password", errorConstants.CREDENTIALS_ERROR)
	}

	const id = user._id
	const payload = { id }
	const loginToken = jwt.sign(payload, ENV.JWT_SECRET_KEY, { expiresIn: "5m" })
	const refreshToken = jwt.sign(payload, ENV.JWT_SECRET_KEY, { expiresIn: "2h" })
	await databaseApi.updateToken(id, loginToken, refreshToken)

	return res.status(OK).json({
		status: "success",
		code: OK,
		data: {
			loginToken,
			refreshToken,
		},
	})
}

const logout = async (req, res, next) => {
	const id = req.user._id
	await databaseApi.updateToken(id, null, null)
	return res.status(NO_CONTENT).json()
}

// const getCurrentUser = async (req, res, next) => {
// 	const { email, subscription } = req.user
// 	return res.status(OK).json({
// 		status: "success",
// 		code: OK,
// 		data: { email, subscription },
// 	})
// }

const verifyUser = async (req, res, next) => {
	const user = await databaseApi.updateTokenVerify(req.params.token)
	if (!user) {
		throw new CustomError(BAD_REQUEST, "Invalid token", errorConstants.BAD_REQUEST)
	}

	await databaseApi.updateTokenVerify(user._id, true, null)

	return res.status(OK).json({
		status: "success",
		code: OK,
		data: {
			message: "Success",
		},
	})
}
// 	const user = await databaseApi.findUserByVerifyToken(req.params.token)
// 	if (user) {
// 		await databaseApi.updateTokenVerify(user._id, true, null)
// 		return res.status(OK).json({
// 			status: "success",
// 			code: OK,
// 			data: {
// 				message: "Success",
// 			},
// 		})
// 	}
// 	throw new CustomError(BAD_REQUEST, "Invalid token", errorConstants.BAD_REQUEST)
// }

const repeatEmailForVerifyUser = async (req, res, next) => {
	const { email } = req.body
	const user = await databaseApi.findUserByEmail(email)

	if (!user) {
		throw new CustomError(BAD_REQUEST, "User is not Exist", errorConstants.BAD_REQUEST)
	}

	const { id, name } = user
	const response = await databaseApi.refreshVerifyToken(id, crypto.randomUUID())

	const emailService = new EmailService(ENV, new CreateSenderNodemailer())

	const statusEmail = await emailService.sendVerifyEmail(email, name, response.verifyToken)

	return res.status(OK).json({
		status: "success",
		code: OK,
		data: {
			name,
			email,
			successEmail: statusEmail,
			message: "Check your email and complete registration",
		},
	})
}

module.exports = {
	registration,
	login,
	logout,
	// getCurrentUser,
	verifyUser,
	repeatEmailForVerifyUser,
}
