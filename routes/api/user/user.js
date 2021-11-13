const { validateUser } = require("../../validation")
const express = require("express")
const router = express.Router()
const { userControllers } = require("../../../controllers")
const { guard } = require("../../../helpers/guard")
// const loginLimit = require("../../helpers/rateLimitLogin")

const { wrapperError } = require("../../../helpers/errorHandler")

// router.get("/verify/:token", wrapperError(verifyUser))
// router.post("/verify", repeatEmailForVerifyUser)

router.post("/signup", validateUser, wrapperError(userControllers.registration))
// router.post("/login", loginLimit, login)
// router.get("/logout", guard, logout)

// router.get("/current", guard, getCurrentUser)

module.exports = router
