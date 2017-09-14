async function return_current_user(context) {
		if (context.res) {
				return context.res.current_user
		} else {
				let id = document.cookie.replace(/(?:(?:^|.*;\s*)reactjo_id\s*\=\s*([^;]*).*$)|^.*$/, "$1")
				let name = document.cookie.replace(/(?:(?:^|.*;\s*)reactjo_name\s*\=\s*([^;]*).*$)|^.*$/, "$1")
				if (id === '' || name === '') {
						id = null
						name = null
				}
				return { id, name }
		}
}

module.exports = { return_current_user }
