function get_cookie(cname) {
    let name = cname + '='
    let decodedCookie = decodeURIComponent(document.cookie);
    let ca = decodedCookie.split(';');
    for(let i = 0; i < ca.length; i++) {
	        let c = ca[i];
	        while (c.charAt(0) == ' ') {
			        c = c.substring(1);
			}
	        if (c.indexOf(name) == 0) {
					let signed_cookie = c.substring(name.length, c.length)
					let dot = signed_cookie.indexOf('.')
					return signed_cookie.slice(2, dot)
			}
	}
    return ''
}

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
