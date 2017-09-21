const fetch = require('isomorphic-unfetch')

const delete_content_service = (req, res, app, content_type) => {
    const CONTENT_URL = `http://localhost:8000/api/${content_type}/${req.body.id}`

    const request = fetch(CONTENT_URL, {
        method: 'DELETE',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            'Authorization': `token ${res.token}`
        }
    })
    .then(data => res.end())
    .catch(err => {
        console.error(err)
        app.render(req, res, '/')
    })

}

module.exports = { delete_content_service }
