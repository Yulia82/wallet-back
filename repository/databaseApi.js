const { UserModel, TransactionModel, TokenModel } = require("../model")

class DatabaseApi {
	//* create new user
	registration = async credentials => {
		const user = new UserModel(credentials)
		return await user.save()
	}

	//* get user by id
	findUserById = id => UserModel.findById(id)

	//* get user by email
	findUserByEmail = email => UserModel.findOne({ email })

	//* update toke for login wait userId and new token or null and refreshToken if we need two tokens
	updateToken = (id, loginToken, refreshToken) =>
		UserModel.findByIdAndUpdate(id, { loginToken, refreshToken }, { new: true })

	updateTokenVerify = verifyToken =>
		UserModel.findOneAndUpdate(
			{ verifyToken },
			{ isVerified: true, verifyToken: null },
			{ new: true },
		)

	//* it is for second send for verify
	refreshVerifyToken = (id, verifyToken) =>
		UserModel.findByIdAndUpdate(id, { verifyToken }, { new: true })

	//* update balance after transactions wait user

	//* if
	updateBalance = async (id, changeBalance, type) => {
		const { balance: oldBalance } = await this.findUserById(id)
		return UserModel.findByIdAndUpdate(
			id,
			{
				balance: type ? oldBalance + changeBalance : oldBalance - changeBalance,
			},
			{ new: true },
		)
	}
	//todo
	//*create transaction
	createTransaction = async body => {
		const result = await TransactionModel.create(body)
		return result
	}
	//* get transaction
	getAllTransaction = async (searchOptions, query) => {
		const results = await TransactionModel.paginate(searchOptions, query)
		return results
	}
	//* get transaction byId
	getTransactionById = async (id, userId) => {
		const results = await TransactionModel.findOne({ _id: id, owner: userId })
		return results
	}
	//* remove transaction
	removeTransaction = async (id, userId) => {
		const result = await TransactionModel.findOneAndRemove({
			_id: id,
			owner: userId,
		})
		return result
	}
	//* update transaction
	updateTransaction = async (id, body, userId) => {
		const result = await TransactionModel.findOneAndUpdate(
			{ _id: id, owner: userId },
			{ ...body },
			{
				new: true,
			},
		)
		return result
	}

	//* get statistics
	getStat = async (searchOptions, query) =>
		await TransactionModel.find(searchOptions)
	//* findRefresh token
	findRefreshToken = id => TokenModel.findOne({ owner: id })
	//* update refreshToken
	updateRefreshToken = (id, refreshToken) =>
		TokenModel.findByIdAndUpdate(id, { refreshToken })
	//* delete refresh token
	removeRefreshToken = id => TokenModel.findByIdAndRemove(id)
}

module.exports = new DatabaseApi()
