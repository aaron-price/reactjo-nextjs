const fetch = require('isomorphic-unfetch')
import { get_uri } from '../services/get_uri.js'

const delete_content_service = (req, res, app, content_type) => {
    const CONTENT_URL = `${get_uri({res}).backend}/api/${content_type}/${req.body.id}`

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
    .then(data => res.end())
    .catch(err => {
        console.error(err)
        app.render(req, res, '/')
    })

}

module.exports = { delete_content_service }
