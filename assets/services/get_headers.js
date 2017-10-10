const get_cookie = require('./get_cookie.js').get_cookie

// Returns a simple headers object. Includes an auth token if one exists.
function get_headers(ctx) {
    let headers = {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
    }

    // If server side
    if (ctx.res) {
        let cookie = ctx.res.token
        if (['', 'false'].indexOf(cookie) === -1) {
            headers.Authorization = 'token ' + ctx.res.token
        }

    // If client side
    } else {
        let cookie = get_cookie('token')
        if (['', 'false'].indexOf(cookie) === -1) {
            headers.Authorization = 'token ' + cookie
        }
    }

    return headers
}
module.exports = { get_headers }
