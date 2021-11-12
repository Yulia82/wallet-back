const mongoose = require("mongoose")

const { URI_DB } = require("../config/dotenv-config")

const db = mongoose.connect(URI_DB, {
	useNewUrlParser: true,
	useUnifiedTopology: true,
})

mongoose.connection.on("connected", () => {
	console.log("Database connection successful")
})

mongoose.connection.on("error", err => {
	console.log(`Mongoose connection error ${err.message}`)
	process.exit(1)
})

process.on("SIGINT", async () => {
	await mongoose.connection.close()
	console.log("Connection to DB closed")
	process.exit()
})

module.exports = db
