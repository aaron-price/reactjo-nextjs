const get_cookie = require('./get_cookie.js').get_cookie

async function return_current_user(context) {
		if (context.res) {
				return context.res.current_user
		} else {
				let id = get_cookie('id')
				let name =  get_cookie('name')
				let is_staff =  get_cookie('is_staff')
				let is_superuser =  get_cookie('is_superuser')
				let is_active =  get_cookie('is_active')
				if (id === '' || name === '') {
						id = null
						name = null
				}
				if (!is_staff || is_staff === '' || is_staff === 'false') { is_staff = false }
				if (!is_superuser || is_superuser === '' || is_superuser === 'false') { is_superuser = false }
				if (!is_active || is_active === '' || is_active === 'false') { is_active = false }

				return { id, name, is_staff, is_superuser, is_active }
		}
}
module.exports = { return_current_user }
