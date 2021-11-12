const { Schema, model } = require("mongoose")
const bcrypt = require("bcryptjs")
const crypto = require("crypto")

const { SALT_FACTOR } = require("../config/dotenv-config")

const userSchema = new Schema(
	{
		name: {
			type: String,
			default: "Noname",
		},
		password: {
			type: String,
			required: [true, "Password is required"],
		},
		email: {
			type: String,
			required: [true, "Email is required"],
			unique: true,
		},
		loginToken: {
			type: String,
			default: null,
		},
		refreshToken: {
			type: String,
			default: null,
		},
		isVerified: { type: Boolean, default: false },
		verifyToken: {
			type: String,
			default: crypto.randomUUID(),
		},
		balance: {
			type: Number,
			default: 0,
		},
	},
	{
		timestamps: true,
		toJSON: {
			virtuals: true,
			transform: function (doc, ret) {
				delete ret.__v
				delete ret.email
				delete ret.password
				delete ret._id
				return ret
			},
		},
		toObject: { virtuals: true },
	},
)

userSchema.pre("save", async function (next) {
	if (this.isModified("password")) {
		const salt = await bcrypt.genSalt(Number(SALT_FACTOR))
		this.password = await bcrypt.hash(this.password, salt)
	}
	next()
})

userSchema.methods.isValidPassword = async function (password) {
	return bcrypt.compare(password, this.password)
}

const UserModel = new model("user", userSchema)

module.exports = UserModel
