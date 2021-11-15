const express = require("express")
const router = express.Router()
const { transactionControllers } = require("../../../controllers")
const { validateTransaction } = require("../../validation")
const { guard } = require("../../../helpers/guard")

router.post("/create", validateTransaction, transactionControllers.saveTransaction)

module.exports = router
