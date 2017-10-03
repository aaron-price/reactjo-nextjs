const fetch = require('isomorphic-unfetch')
const { get_uri } = require('../services/get_uri.js')

const update_content_service = (req, res, app, content_type) => {
    const type = content_type === 'user' ? 'profile' : content_type
    const CONTENT_URL = `${get_uri({res}).backend}/api/${type}/${req.body.id}/`

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
    // Request
    const request = fetch(CONTENT_URL, {
        method: 'PUT',
        headers,
        body: JSON.stringify(fields)
    })
    .then(blob => blob.json())
    .then(data => {
        if (content_type === 'user') {
            res.cookie('myapp_id', data.id, { maxAge: 86400000, signed: true })
            res.cookie('myapp_name', data.name, { maxAge: 86400000, signed: true })
            res.cookie('myapp_is_staff', data.is_staff, { maxAge: 86400000, signed: true })
            res.cookie('myapp_is_superuser', data.is_superuser,	{ maxAge: 86400000, signed: true })
            res.cookie('myapp_is_active', data.is_active, { maxAge: 86400000, signed: true })
            res.current_user = {
                id: data.id,
                name: data.name,
                is_staff: data.is_staff,
                is_superuser: data.is_superuser,
                is_active: data.is_active,
            }
        }
        res.send(data)
        res.end()
    })
    .catch(err => {
        console.error(err)
        app.render(req, res, '/')
    })

}

module.exports = { update_content_service }
