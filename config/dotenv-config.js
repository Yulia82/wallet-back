require("dotenv").config()
console.log(11111111, process)
module.exports = { PORT: 4040, ...process.env }
