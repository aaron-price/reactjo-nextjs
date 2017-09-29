function normal_cookie(signed_cookie) {
    let dot = signed_cookie.indexOf('.')
    return signed_cookie.slice(2, dot)
}

// Some URIs end with a .com which conflicts with the signed_cookie syntax
function URI_cookie(signed_cookie) {
    // If you have a uri with a different TLD, add it here
    // Keep array as small as possible to protect against false positives
    let tlds = ['.com']
    for(let i = 0; i < tlds.length; i++) {
        let tld = tlds[i]
        let end = signed_cookie.indexOf(tld)
        if (end !== -1) {
            return signed_cookie.slice(2, end + tld.length)
        }
    }

    // If none were found
    return normal_cookie(signed_cookie)
}

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

          if (cname.indexOf('URI') === -1) {
              return normal_cookie(signed_cookie)
          } else {
              return URI_cookie(signed_cookie)
          }

					let dot = signed_cookie.indexOf('.')
					return signed_cookie.slice(2, dot)
			}
	}
    return ''
}

module.exports = { get_cookie }
