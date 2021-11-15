require("dotenv").config()
console.log("HOST змінено на локалхост бо при деплої були проблеми ")
module.exports = { PORT: 4040, ...process.env }
