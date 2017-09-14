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
const { current_user } = require('./middleware/res_current_user.js')

app.prepare().then(() => {
		const server = express()
		server.use(cookieParser(random_string))

		server.use(bodyParser.json())
		server.use(bodyParser.urlencoded({ extended: false }))
		server.use(expressValidator())
		server.use(current_user)

		server.get('/user/:id', (req, res) => {
				const actualPage = '/user'
				const queryParams = { id: req.params.id }
				app.render(req, res, actualPage, queryParams)
		})

		server.post('/login', (req, res, next) => {
				login_service(req, res, next, app)
		})
		server.post('/signup', (req, res) => {
				signup_service(req, res, next, app)
		})

		server.post('/logout', (req, res) => {
				res.clearCookie('reactjo_app')
				res.clearCookie('reactjo_id')
				res.clearCookie('reactjo_name')
				// res.redirect('/')
				app.render(req, res, '/')
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
