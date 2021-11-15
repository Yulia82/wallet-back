const express = require("express")
const router = express.Router()
const { transactionControllers } = require("../../../controllers")
const { validateTransaction, validateId } = require("../../validation")
const { guard } = require("../../../helpers/guard")

router.post("/", guard, validateTransaction, transactionControllers.saveTransaction)
router.get("/", guard, transactionControllers.getTransactions)
router.get("/:transactionId", guard, validateId, transactionControllers.getTransaction)
router.delete("/:transactionId", guard, validateId, transactionControllers.deleteTransaction)
router.put("/:transactionId", () => {})

module.exports = router
