const fetch = require('isomorphic-unfetch')

const login_service = (req, res, next, app) => {
    const LOGIN_URL = 'http://localhost:8000/api/login/'

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
            res.cookie('reactjo_id', data.id)
            res.cookie('reactjo_name', data.name)
            res.cookie('reactjo_token', data.token)
            res.cookie('reactjo_is_staff', data.is_staff)
            res.cookie('reactjo_is_superuser', data.is_superuser)
            res.cookie('reactjo_is_active', data.is_active)
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
