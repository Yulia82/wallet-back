const { UserModel } = require("../model")

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
	updateToken = (id, loginToken, newRefreshToken) =>
		UserModel.findByIdAndUpdate(id, { loginToken, refreshToken: (newRefreshToken = null) }, { new: true })

	updateTokenVerify = verifyToken =>
		UserModel.findOneAndUpdate({ verifyToken }, { isVerified: true, verifyToken: null }, { new: true })

	//* it is for second send for verify
	refreshVerifyToken = (id, verifyToken) => UserModel.findByIdAndUpdate(id, { verifyToken }, { new: true })

	//* update balance after transactions wait user

	//* if positive
	incrementBalance = async (id, newBalance) => {
		const { balance: oldBalance } = await this.findUserById(id)
		return UserModel.findByIdAndUpdate(id, { balance: oldBalance + newBalance }, { new: true })
	}

	//* if negative
	decrementBalance = async (id, newBalance) => {
		const { balance: oldBalance } = await this.findUserById(id)
		return UserModel.findByIdAndUpdate(id, { balance: oldBalance - newBalance }, { new: true })
	}

	//! it can be another
	//* if positive
	// incrementBalance = async (id, balance) => UserModel.findByIdAndUpdate(id,{balance},{new: true})

	//* if negative
	//   incrementBalance = async (id, balance) => UserModel.findByIdAndUpdate(id,{balance},{new: true})
}

module.exports = new DatabaseApi()
