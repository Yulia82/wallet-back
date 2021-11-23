const {
	validateUser,
	validateCredentials,
	validateEmailBeforeVerify,
} = require("../../validation")
const express = require("express")
const router = express.Router()
const { userControllers } = require("../../../controllers")

const { guard, guardRefresh } = require("../../../helpers/guard")
// const loginLimit = require("../../helpers/rateLimitLogin")
const { databaseApi } = require("../../../repository")

const { wrapperError } = require("../../../helpers/errorHandler")
router.get(
	"/test",
	guard,
	wrapperError(async (req, res) => {
		const id = "61962fbf6457f177d95129ec"
		const response = await databaseApi.getAllTransaction({ id })
		res.status(200).json({
			response,
		})
	}),
)

router.post(
	"/verify",
	validateEmailBeforeVerify,
	wrapperError(userControllers.repeatEmailForVerifyUser),
)
router.get("/verify/:token", wrapperError(userControllers.verifyUser))

router.post("/signup", validateUser, wrapperError(userControllers.registration))
router.post("/login", validateCredentials, wrapperError(userControllers.login))
router.get("/logout", guard, userControllers.logout)

router.get("/current", guard, userControllers.getCurrentUser)
router.get("/refresh", guardRefresh, userControllers.refreshLoginToken)

module.exports = router
