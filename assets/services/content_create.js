const fetch = require('isomorphic-unfetch')

const create_content_service = (req, res, next, app) => {
    const content_type = req.body.content_type
    const CONTENT_URL = `http://localhost:8000/api/${content_type}/`

    // Body
    let fields = {}
    req.body.fields.forEach(f => fields[f] = req.body[f])
    if ('owner' in fields) { fields.owner = res.current_user.id }

    // Head
    let headers = {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
    }
    if (res.token !== 'false') { headers.Authorization = `token ${res.token}` }

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
