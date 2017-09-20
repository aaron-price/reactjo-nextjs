async function return_current_user(context) {
		if (context.res) {
				return context.res.current_user
		} else {
				let id = document.cookie.replace(/(?:(?:^|.*;\s*)reactjo_id\s*\=\s*([^;]*).*$)|^.*$/, "$1")
				let name = document.cookie.replace(/(?:(?:^|.*;\s*)reactjo_name\s*\=\s*([^;]*).*$)|^.*$/, "$1")
				let is_staff = document.cookie.replace(/(?:(?:^|.*;\s*)reactjo_is_staff\s*\=\s*([^;]*).*$)|^.*$/, "$1") === 'true'
				let is_superuser = document.cookie.replace(/(?:(?:^|.*;\s*)reactjo_is_superuser\s*\=\s*([^;]*).*$)|^.*$/, "$1") === 'true'
				let is_active = document.cookie.replace(/(?:(?:^|.*;\s*)reactjo_is_active\s*\=\s*([^;]*).*$)|^.*$/, "$1") === 'true'
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
