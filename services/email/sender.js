const sgMail = require("@sendgrid/mail")
const { SEND_GRID_KEY, NODEMAILER_EMAIL, NODEMAILER_PASSWORD, SEND_GRID_EMAIL } = require("../../config/dotenv-config")

const nodeMailer = require("nodemailer")

//* nodemailer може не працювати але сендгрід працює
class CreateSenderSendGrid {
	async send(msg) {
		sgMail.setApiKey(SEND_GRID_KEY)
		return await sgMail.send({ ...msg, from: SEND_GRID_EMAIL })
	}
}

class CreateSenderNodemailer {
	async send(msg) {
		const config = {
			host: "smtp.meta.ua",
			port: 465,
			secure: true,
			auth: {
				user: NODEMAILER_EMAIL,
				pass: NODEMAILER_PASSWORD,
			},
		}

		const transporter = nodeMailer.createTransport(config)

		return await transporter.sendMail({ ...msg, from: NODEMAILER_EMAIL })
	}
}

module.exports = { CreateSenderSendGrid, CreateSenderNodemailer }
