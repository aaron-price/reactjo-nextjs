const fetch = require('isomorphic-unfetch')
import { get_uri } from '../services/get_uri.js'

const login_service = (req, res, next, app) => {
    const LOGIN_URL = `${get_uri({res}).backend}/api/login/`

    const request = fetch(LOGIN_URL, {
        method: 'POST',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            username: req.body.name,
            password: req.body.password
        })
    })
    .then(blob => blob.json())
    .then(data => {
        if(data.token) {
            res.cookie('reactjo_id', data.id, { maxAge: 86400000, signed: true })
            res.cookie('reactjo_name', data.name, { maxAge: 86400000, signed: true })
            res.cookie('reactjo_token', data.token, { maxAge: 86400000, signed: true })
            res.cookie('reactjo_is_staff', data.is_staff, { maxAge: 86400000, signed: true })
            res.cookie('reactjo_is_superuser', data.is_superuser,	{ maxAge: 86400000, signed: true })
            res.cookie('reactjo_is_active', data.is_active, { maxAge: 86400000, signed: true })
            res.current_user = {
                id: data.id,
                name: data.name,
                is_staff: data.is_staff,
                is_superuser: data.is_superuser,
                is_active: data.is_active,
            }
            res.redirect('/')
        } else {
            return Promise.reject('Couldn\'t get an auth token')
        }
    })
    .catch(err => {
        console.error(err)
        app.render(req, res, '/login')
    })

}

module.exports = { login_service }
