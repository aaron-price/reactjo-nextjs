const cookieParser = require('cookie-parser')
const express = require('express')
const next = require('next')
const dev = process.env.NODE_ENV !== 'production'
const app = next({ dev })
const handle = app.getRequestHandler()
const bodyParser = require('body-parser')
const expressValidator = require('express-validator')
const { login_service } = require('./services/login_service.js')
const { signup_service } = require('./services/signup_service.js')
const morgan = require('morgan')
const current_user = require('./middleware/current_user.js')

app.prepare().then(() => {
		const server = express()
		server.use(cookieParser())

		server.use(bodyParser.json())
		server.use(bodyParser.urlencoded({ extended: false }))
		server.use(expressValidator())

		server.get('/user/:id', (req, res) => {
				const actualPage = '/user'
				const queryParams = { id: req.params.id }
				app.render(req, res, actualPage, queryParams)
		})

		server.post('/login', (req, res) => {
				login_service(req, res, app)
		})
		server.post('/signup', (req, res) => {
				signup_service(req, res, app)
		})
		server.post('/logout', (req, res) => {
				res.clearCookie('reactjo_app')
				res.redirect('/')
		})

		server.get('*', (req, res) => {
				return handle(req, res)
		})
		server.listen(3000, (err) => {
				if (err) throw err
				console.log('> Ready on http://localhost:3000')
		})
})
.catch((ex) => {
		console.log(ex.stack)
		process.exit(1)
})
