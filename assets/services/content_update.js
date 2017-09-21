const fetch = require('isomorphic-unfetch')

const update_content_service = (req, res, app, content_type) => {
    const CONTENT_URL = `http://localhost:8000/api/${content_type}/${req.body.id}/`
    let fields = {}
    req.body.fields.forEach(f => fields[f] = req.body[f])

    // Automatically provide the owner field
    if ('owner' in fields) { fields.owner = res.current_user.id }

    const request = fetch(CONTENT_URL, {
        method: 'PUT',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            'Authorization': `token ${res.token}`
        },
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

module.exports = { update_content_service }
