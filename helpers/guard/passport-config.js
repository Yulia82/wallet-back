const passport = require("passport")
const { Strategy, ExtractJwt } = require("passport-jwt")
const { databaseApi } = require("../../repository")

const { SECRET_KEY } = require("../../config/dotenv-info")

const params = {
	jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
	secretOrKey: SECRET_KEY,
}
passport.use(
	new Strategy(params, async (payload, done) => {
		try {
			const user = await databaseApi.findUserById(payload.id)

			if (!user) return done(new Error("User not found"), false)

			if (!user.token) return done(null, false)

			return done(null, user)
		} catch (err) {
			return done(err, false)
		}
	}),
)
