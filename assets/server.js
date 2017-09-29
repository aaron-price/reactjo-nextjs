require('dotenv').config()
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
const { create_content_service } = require('./services/content_create.js')
const { delete_content_service } = require('./services/content_delete.js')
const { update_content_service } = require('./services/content_update.js')

app.prepare().then(() => {
		const server = express()
		server.use(bodyParser.json())
		server.use(bodyParser.urlencoded({ extended: false }))
		server.use(helmet())
		server.use(expressValidator())
		server.use(set_uri)

		const content_types = []
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
				server.put(`/${type}/`, (req, res) => {
						update_content_service(req, res, app, type)
				})
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
