const Mailgen = require("mailgen")

//!! тут виправити

class EmailService {
	constructor(env, sender) {
		this.sender = sender
		switch (env.NODE_ENV) {
			case "development":
				// this.link = " https://5285-91-221-219-76.ngrok.io";
				this.link = `http://${env.HOST}:${env.PORT}`

				break
			case "production":
				this.link = "link for production"

				break
			default:
				this.link = `http://${env.HOST}:${env.PORT}`

				break
		}
	}

	get getLink() {
		return this.link
	}

	createTemplateEmail(name, verifyToken) {
		const mailGenerator = new Mailgen({
			theme: "default",
			product: {
				name: "Phonebook",
				link: this.link,
			},
		})

		const email = {
			body: {
				name,
				intro: "Welcome to your Phonebook! We're very excited to have you on board.",
				action: {
					instructions: "To get started , please click here:",
					button: {
						color: "#22BC66", // Optional action button color
						text: "Confirm your account",
						link: `${this.link}/api/users/verify/${verifyToken}`,
					},
				},
			},
		}
		return mailGenerator.generate(email)
	}
	async sendVerifyEmail(email, name, verifyToken) {
		const emailHtml = this.createTemplateEmail(name, verifyToken)
		const msg = {
			to: email,
			subject: "Verify your email",
			html: emailHtml,
		}

		try {
			const result = await this.sender.send(msg)
		} catch (err) {
			console.log(err.message)
			return false
		}
	}
}

module.exports = EmailService
