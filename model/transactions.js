const { Schema, model } = require("mongoose")

const transactionSchema = new Schema(
	{
		type: { type: String, required: true },
		category: { type: String, required: true },
		sum: { type: Number, required: true },
		data: { type: String, required: true },
		balance: { type: Number },
	},
	{
		versionKey: false,
		timestamps: true, //! Добавил время для созданной транзакции
		toJSON: {
			virtuals: true,
			transform: function (doc, ret) {
				delete ret._id //! удалил поле _id для front
				return ret
			},
		},
		toObject: { virtuals: true },
	},
)

const Transaction = model("transactions", transactionSchema)

module.exports = { Transaction }
