const fetch = require('isomorphic-unfetch')
const { login_service } = require('./login_service.js')

const signup_service = (req, res, app) => {
    const SIGNUP_URL = 'http://localhost:8000/api/profile/'

    const request = fetch(SIGNUP_URL, {
        method: 'POST',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            name: req.body.name,
            email: req.body.email,
            password: req.body.password
        })
    })
    .then(blob => blob.json())
    .then(data => {
            login_service(req, res, app)
    })
    .catch(err => {
      console.error(err)
        app.render(req, res, '/signup')
    })

}

module.exports = { signup_service }
