// This middleware simply adds a res.csrftoken object based on csurf
function res_csrftoken(req, res, next) {
		res.csrftoken = req.csrfToken()
		next()
}
module.exports = { res_csrftoken }
