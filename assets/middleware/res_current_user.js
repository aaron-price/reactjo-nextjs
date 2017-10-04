// This middleware simply adds a res.current_user object with id and name.
function current_user(req, res, next) {
		let src = req.signedCookies

		let id 					 = src.id ? src.id : null
		let name 				 = src.name ? src.name : null
		let is_staff     = src.is_staff ? src.is_staff === 'true' : false
		let is_superuser = src.is_superuser ? src.is_superuser === 'true' : false
		let is_active    = src.is_active ? src.is_active === 'true' : false
		let token 			 = src.token ? src.token : 'false'

		// If one is null, they both should be.
		if (!name || !id) {
				name = null
				id = null
		}

		if (!is_staff || is_staff === '') { is_staff = false }
		if (!is_superuser || is_superuser === '') { is_superuser = false }
		if (!is_active || is_active === '') { is_active = false }

		res.current_user = { id, name, is_staff, is_superuser, is_active }

		if (!token) { token = 'false' }
		res.token = token
		next()
}
module.exports = { current_user }
