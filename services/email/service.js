const Mailgen = require("mailgen")

//!! тут виправити

class EmailService {
	constructor(env, sender) {
		this.sender = sender
		switch (env.NODE_ENV) {
			case "development":
				// this.link = " https://5285-91-221-219-76.ngrok.io";
				this.link = `http://${env.HOST}:${env.PORT}`
				// this.link = "http://27c7-185-19-6-75.ngrok.io"

				break
			case "production":
				this.link = "https://wallet-coconat.herokuapp.com"

				break
			default:
				this.link = `http://${env.HOST}:${env.PORT}`
				// this.link = "http://27c7-185-19-6-75.ngrok.io"

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
				name: "Wallet",
				link: this.link,
			},
		})

		const email = {
			body: {
				name,
				intro: "Welcome to your Wallet! We're very excited to have you on board.",
				action: {
					instructions: "To get started , please click here:",
					button: {
						color: "#22BC66", // Optional action button color
						text: "Confirm your account",
						// link: `http://127.0.0.1:4040/api/user/verify/${verifyToken}`,
						link: `${this.link}/api/user/verify/${verifyToken}`,
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
			return true
		} catch (err) {
			console.log(err.message)
			return false
		}
	}
}

module.exports = EmailService
