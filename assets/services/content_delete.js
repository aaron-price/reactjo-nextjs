const fetch = require('isomorphic-unfetch')
const get_headers = require('./get_headers.js').get_headers
const { get_uri } = require('../services/get_uri.js')
const { logout_service } = require('../services/logout_service.js')

const delete_content_service = (req, res, app, content_type) => {
    const type = content_type === 'user' ? 'profile' : content_type
    const CONTENT_URL = `${get_uri({res}).backend}/api/${type}/${req.body.id}`

    // Request
    const request = fetch(CONTENT_URL, {
        method: 'DELETE',
        headers: get_headers({ res })
    })
    .then(data => {
        if (content_type === 'user') {
            logout_service(req, res, app)
        } else {
            res.end()
        }
    })
    .catch(err => {
        console.error(err)
        app.render(req, res, '/')
    })

}

module.exports = { delete_content_service }
