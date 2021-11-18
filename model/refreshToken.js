const { Schema, model, SchemaTypes } = require("mongoose")
const bcrypt = require("bcryptjs")
const crypto = require("crypto")

const { SALT_FACTOR } = require("../config/dotenv-config")

const tokenSchema = new Schema({
	owner: {
		type: SchemaTypes.ObjectId,
		ref: "user",
		required: true,
	},
	refreshToken: {
		type: String,
		required: true,
	},
})

const TokenModel = model("refreshToken", tokenSchema)

module.exports = TokenModel
