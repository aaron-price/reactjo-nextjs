const fetch = require('isomorphic-unfetch')

const create_content_service = (req, res, next, app) => {
    const content_type = req.body.content_type
    const CONTENT_URL = `http://localhost:8000/api/${content_type}/`
    let fields = {}
    req.body.fields.forEach(f => fields[f] = req.body[f])

    const request = fetch(CONTENT_URL, {
        method: 'POST',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
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

module.exports = { create_content_service }
