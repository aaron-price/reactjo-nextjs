// Creates cookies with the process.env URIs, so client side ajax works
function set_uri(req, res, next) {
    res.cookie('FRONTEND_URI', process.env.FRONTEND_URI, { signed: true })
    res.cookie('BACKEND_URI', process.env.BACKEND_URI, { signed: true })
		next()
}
module.exports = { set_uri }
