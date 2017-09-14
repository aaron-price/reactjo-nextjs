const fetch = require('isomorphic-unfetch')

const login_service = (req, res, app) => {
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

            app.render(req, res, '/user', {id: data.id})
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
