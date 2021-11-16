const express = require("express")
const router = express.Router()
const { transactionControllers } = require("../../../controllers")
const { validateTransaction, validateId } = require("../../validation")
const { guard } = require("../../../helpers/guard")
const { wrapperError } = require("../../../helpers/errorHandler")

router.post("/", guard, validateTransaction, wrapperError(transactionControllers.saveTransaction))
router.get("/", guard, wrapperError(transactionControllers.getTransactions))
router.get("/:transactionId", guard, validateId, wrapperError(transactionControllers.getTransaction))
router.delete("/:transactionId", guard, validateId, wrapperError(transactionControllers.deleteTransaction))
router.put(
	"/:transactionId",
	guard,
	[(validateId, validateTransaction)],
	wrapperError(transactionControllers.changeTransaction),
)

module.exports = router
