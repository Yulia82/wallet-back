require("dotenv").config()
console.log("process.env.HOSTprocess.env.HOSTprocess.env.HOST", process.env.HOST)
module.exports = { HOST: "127.0.0.1", PORT: 4040, ...process.env }
