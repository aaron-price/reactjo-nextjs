require('dotenv').config()
const cookieParser = require('cookie-parser')
const express = require('express')
const next = require('next')
const dev = process.env.NODE_ENV !== 'production'
const port = process.env.PORT || 3000
const app = next({ dir: '.', dev })
const handle = app.getRequestHandler()
const bodyParser = require('body-parser')
const expressValidator = require('express-validator')
const morgan = require('morgan')
const helmet = require('helmet')

const { set_uri } = require('./middleware/set_uri.js')
const { current_user } = require('./middleware/res_current_user.js')
const { login_service } = require('./services/login_service.js')
const { logout_service } = require('./services/logout_service.js')
const { signup_service } = require('./services/signup_service.js')
const { create_content_service } = require('./services/content_create.js')
const { delete_content_service } = require('./services/content_delete.js')
const { update_content_service } = require('./services/content_update.js')

app.prepare().then(() => {
    const server = express()
    server.use(cookieParser(random_string))
    server.use(helmet())

    server.use(bodyParser.json())
    server.use(bodyParser.urlencoded({ extended: false }))
    server.use(expressValidator())
    server.use(set_uri)
    server.use(current_user)

    const content_types = [
        'user',
    ]
    content_types.map(type => {
        // Details page
        server.get(`/${type}/:id`, (req, res) => {
            const actualPage = `/${type}`
            const queryParams = { id: req.params.id }
            app.render(req, res, actualPage, queryParams)
        })
        // Create new
        server.post(`/${type}/`, (req, res) => {
            create_content_service(req, res, app, type)
        })
        // Delete
        server.delete(`/${type}/`, (req, res) => {
            delete_content_service(req, res, app, type)
        })
        // Update
        server.patch(`/${type}/`, (req, res) => {
            update_content_service(req, res, app, type)
        })
    })

    server.post('/login', (req, res, next) => {
        login_service(req, res, next, app)
    })
    server.post('/signup', (req, res) => {
        signup_service(req, res, next, app)
    })

    server.post('/logout', (req, res) => {
        logout_service(req, res, app)
    })

    server.get('*', (req, res) => {
        return handle(req, res)
    })
    server.listen(port, (err) => {
        if (err) throw err
        console.log(`> Ready on http://localhost:${port}`)
    })
})
.catch((ex) => {
    console.log(ex.stack)
    process.exit(1)
})
