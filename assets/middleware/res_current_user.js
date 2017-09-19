// This middleware simply adds a res.current_user object with id and name.
function current_user(req, res, next) {
		let id = req.cookies.reactjo_id
		let name = req.cookies.reactjo_name
		let is_staff = req.cookies.reactjo_is_staff
		let is_superuser = req.cookies.reactjo_is_superuser
		let is_active = req.cookies.reactjo_is_active

		// If one is null, they both should be.
		if (!name || !id) {
				name = null
				id = null
		}
		if (!staff || staff === '') { staff = false }
		if (!superuser || superuser === '') { superuser = false }
		if (!active || active === '') { active = false }

		res.current_user = { id, name, staff, superuser, active }
		next()
}
module.exports = { current_user }
