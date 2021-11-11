const EmailService = require("./service");
const { CreateSenderSendGrid, CreateSenderNodemailer } = require("./sender");

module.exports = { EmailService, CreateSenderNodemailer, CreateSenderSendGrid };
