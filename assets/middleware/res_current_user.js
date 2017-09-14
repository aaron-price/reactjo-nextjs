// This middleware simply adds a res.current_user object with id and name.
function current_user(req, res, next) {
		let id = req.cookies.reactjo_id
		let name = req.cookies.reactjo_name

		// If one is null, they both should be.
		if (!name || !id) {
				name = null
				id = null
		}
		res.current_user = { id, name }
		next()
}
module.exports = { current_user }
