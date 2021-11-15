const express = require("express")
const router = express.Router()
const { transactionControllers } = require("../../../controllers")
const { validateTransaction, validateId } = require("../../validation")
const { guard } = require("../../../helpers/guard")

router.post("/", guard, validateTransaction, transactionControllers.saveTransaction)
router.get("/", () => {})
router.get("/:id", () => {})
router.delete("/:id", validateId, transactionControllers.deleteTransaction)
router.put("/:id", () => {})

module.exports = router
