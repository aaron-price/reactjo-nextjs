const fetch = require('isomorphic-unfetch')
const { get_uri } = require('../services/get_uri.js')

const create_content_service = (req, res, next, app) => {
    const content_type = req.body.content_type
    const CONTENT_URL = `${get_uri({res}).backend}/api/${content_type}/`

    // Body
    let fields = {}
    req.body.fields.forEach(f => fields[f] = req.body[f])
    if ('owner' in fields) { fields.owner = res.current_user.id }

    // Head
    let headers = {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
    }

    if (res.token !== 'false' && !!res.token) {
        headers.Authorization = `token ${res.token}`
    }

    const request = fetch(CONTENT_URL, {
        method: 'POST',
        headers,
        body: JSON.stringify(fields)
    })
    .then(blob => blob.json())
    .then(data => {
        res.send(data)
        res.end()
    })
    .catch(err => {
        console.error(err)
        app.render(req, res, '/')
    })

}

module.exports = { create_content_service }
