const get_cookie = require('./get_cookie.js').get_cookie

async function return_current_user(context) {
		if (context.res) {
				return context.res.current_user
		} else {
				let id = get_cookie('reactjo_id')
				let name =  get_cookie('reactjo_name')
				let is_staff =  get_cookie('reactjo_is_staff')
				let is_superuser =  get_cookie('reactjo_is_superuser')
				let is_active =  get_cookie('reactjo_is_active')
				if (id === '' || name === '') {
						id = null
						name = null
				}
				if (!is_staff || is_staff === '') { is_staff = false }
				if (!is_superuser || is_superuser === '') { is_superuser = false }
				if (!is_active || is_active === '') { is_active = false }

				return { id, name, is_staff, is_superuser, is_active }
		}
}
module.exports = { return_current_user }
