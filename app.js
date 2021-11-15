const express = require("express")
const logger = require("morgan")
const cors = require("cors")
const helmet = require("helmet")

const swaggerUi = require("swagger-ui-express")
const swaggerDocument = require("./swagger.json")

const { userRouter, transactionsRouter } = require("./routes")

const app = express()

const formatsLogger = app.get("env") === "development" ? "dev" : "short"

app.use(logger(formatsLogger))
app.use(cors())
app.use(express.json())
app.use("/api/docs", swaggerUi.serve, swaggerUi.setup(swaggerDocument))
app.use("/api/user", userRouter)
app.use("/api/transaction", transactionsRouter)
app.use("/", (req, res, next) => {
	res.send("hello")
})

app.use((req, res) => {
	res.status(404).json({ message: "Not found" })
})

app.use((err, req, res, _next) => {
	const status = err.status || 500
	console.error(err.message)
	res.status(status).json({
		status: err.status ? "fail" : "error",
		code: status,
		message: err.status ? err.message : "Sorry we have some problems",
	})
})

module.exports = app
