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
            console.log(data)
            res.cookie('reactjo_app' , data.token)
            res.status(200)
            app.render(req, res, '/profile')
        } else {
            res.status(400)
            app.render(req, res, '/')
        }
    })
    .catch(err => {
        console.log(err)
        res.status(200)
        app.render(req, res, '/') // Should change this in the future
    })
}

module.exports = { login_service }
