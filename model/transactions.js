const { Schema, model, SchemaTypes } = require("mongoose")

const mongoosePaginate = require("mongoose-paginate-v2")

const transactionSchema = new Schema(
	{
		type: { type: String, required: true },
		category: { type: String, required: true },
		sum: { type: Number, required: true },
		date: { type: String, required: false },
		balance: { type: Number },
		owner: { type: SchemaTypes.ObjectId, ref: "user" }, //! Связь транзакций с юзером.
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

transactionSchema.plugin(mongoosePaginate)

const TransactionModel = model("transaction", transactionSchema)

module.exports = TransactionModel
