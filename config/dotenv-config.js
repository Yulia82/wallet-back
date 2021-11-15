require("dotenv").config()
console.log("process.env.HOSTprocess.env.HOSTprocess.env.HOST", process.env)
module.exports = { PORT: 4040, ...process.env }
