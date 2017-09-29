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

module.exports = { get_cookie }
