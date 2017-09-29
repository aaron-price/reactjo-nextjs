const get_cookie = require('./get_cookie.js').get_cookie

function get_uri(context = false) {
    if(!!process.env.FRONTEND_URI && !!context) {
        context.res.cookie('FRONTEND_URI', process.env.FRONTEND_URI, { signed: true })
        context.res.cookie('BACKEND_URI', process.env.BACKEND_URI, { signed: true })
        return {
            frontend: process.env.FRONTEND_URI,
            backend: process.env.BACKEND_URI
        }
    } else {
        return {
            frontend: get_cookie('FRONTEND_URI'),
            backend: get_cookie('BACKEND_URI')
        }
    }
}
module.exports = { get_uri }
