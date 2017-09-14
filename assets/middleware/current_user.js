function current_user(req, res, next) {
		const cookie = req.cookies.reactjo_app ? req.cookies.reactjo_app : null
		user = cookie
				? {name: cookie.name, id: cookie.id}
				: {name: null, id: null}
		res.current_user = user
		next()
}
module.exports = { current_user }
