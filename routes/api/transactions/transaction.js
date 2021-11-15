const express = require("express")
const router = express.Router()
const { transactionControllers } = require("../../../controllers")
const { validateTransaction, validateId } = require("../../validation")
const { guard } = require("../../../helpers/guard")

router.post("/", validateTransaction, transactionControllers.saveTransaction)
router.delete("/:id", validateId, transactionControllers.deleteTransaction)

module.exports = router
