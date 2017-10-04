const fetch = require('isomorphic-unfetch')
const { get_uri } = require('../services/get_uri.js')
const { logout_service } = require('../services/logout_service.js')

const delete_content_service = (req, res, app, content_type) => {
    const type = content_type === 'user' ? 'profile' : content_type
    const CONTENT_URL = `${get_uri({res}).backend}/api/${type}/${req.body.id}`

    // Head
    let headers = {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
    }

    if (res.token !== 'false' && !!res.token) {
        headers.Authorization = `token ${res.token}`
    }

    // Request
    const request = fetch(CONTENT_URL, {
        method: 'DELETE',
        headers
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
