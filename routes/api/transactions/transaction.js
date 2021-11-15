const express = require("express")
const router = express.Router()
const { transactionControllers } = require("../../../controllers")
const { validateTransaction, validateId } = require("../../validation")
const { guard } = require("../../../helpers/guard")

router.post("/", guard, validateTransaction, transactionControllers.saveTransaction)
router.get("/", () => {})
router.get("/:transactionId", () => {})
router.delete("/:transactionId", guard, validateId, transactionControllers.deleteTransaction)
router.put("/:transactionId", () => {})

module.exports = router
