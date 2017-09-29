const fetch = require('isomorphic-unfetch')
const { login_service } = require('./login_service.js')
import { get_uri } from '../services/get_uri.js'

const signup_service = (req, res, next, app) => {
    const SIGNUP_URL = `${get_uri({res}).backend}/api/profile/`
    let fields = []
    let body_fields = { password: req.body.password }
    fields.forEach(f => {
        body_fields[f] = req.body[f]
    })
    fetch(SIGNUP_URL, {
        method: 'POST',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(body_fields)
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
