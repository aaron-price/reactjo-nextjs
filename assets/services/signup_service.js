const fetch = require('isomorphic-unfetch')
const { login_service } = require('./login_service.js')

const signup_service = (req, res, next, app) => {
    const SIGNUP_URL = 'http://localhost:8000/api/profile/'

    fetch(SIGNUP_URL, {
        method: 'POST',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            fieldspassword: req.body.password
        })
    })
    .then(blob => blob.json())
    .then(data => {
        login_service(req, res, next, app)
    })
    .catch(err => {
      console.error(err)
        app.render(req, res, '/signup')
    })

}

module.exports = { signup_service }
