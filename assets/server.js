const express = require('express')
const next = require('next')
const dev = process.env.NODE_ENV !== 'production'
const app = next({ dev })
const handle = app.getRequestHandler()
const bodyParser = require('body-parser')
const expressValidator = require('express-validator')
const morgan = require('morgan')
const helmet = require('helmet')
const csrf = require('csurf')

const { res_csrftoken } = require('./middleware/res_csrftoken.js')
const { create_content_service } = require('./services/content_create.js')
const { delete_content_service } = require('./services/content_delete.js')
const { update_content_service } = require('./services/content_update.js')

app.prepare().then(() => {
		const server = express()
		server.use(bodyParser.json())
		server.use(bodyParser.urlencoded({ extended: false }))
		server.use(helmet())
		server.use(expressValidator())
		server.use(csrf({ cookie: true }))
		server.use(res_csrftoken)

		const content_types = []
		content_types.map(type => {
				// Details page
				server.get(`/${type.singular}/:id`, (req, res) => {
						const actualPage = `/${type}`
						const queryParams = { id: req.params.id }
						app.render(req, res, actualPage, queryParams)
				})
				// List page
				server.get(`/${type.plural}`, (req, res) => {
						const actualPage = `/${type.plural}`
						res.csrf = req.csrfToken()
						return app.render(req, res, actualPage)
				})
				// Create new
				server.post(`/${type.singular}/`, (req, res) => {
						create_content_service(req, res, app, type)
				})
				// Delete
				server.delete(`/${type.singular}/`, (req, res) => {
						delete_content_service(req, res, app, type)
				})
				// Update
				server.put(`/${type.singular}/`, (req, res) => {
						update_content_service(req, res, app, type)
				})
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
