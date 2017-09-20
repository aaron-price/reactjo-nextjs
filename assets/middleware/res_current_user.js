// This middleware simply adds a res.current_user object with id and name.
function current_user(req, res, next) {
		let id = req.cookies.reactjo_id
		let name = req.cookies.reactjo_name
		let is_staff = req.cookies.reactjo_is_staff === 'true'
		let is_superuser = req.cookies.reactjo_is_superuser === 'true'
		let is_active = req.cookies.reactjo_is_active === 'true'

		// If one is null, they both should be.
		if (!name || !id) {
				name = null
				id = null
		}
		if (!is_staff || is_staff === '') { is_staff = false }
		if (!is_superuser || is_superuser === '') { is_superuser = false }
		if (!is_active || is_active === '') { is_active = false }

		res.current_user = { id, name, is_staff, is_superuser, is_active }
		next()
}
module.exports = { current_user }
