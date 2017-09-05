import Link from 'next/link'
import 'isomorphic-fetch'
import React, { Component } from 'react'
import LoginForm from '../components/Login.js'
import Layout from '../components/Layout.js'

class Index extends Component {
		constructor(props) {
				super(props)
				this.state = {}
		}

		render() {
				return (
						<Layout>
								<h1>Index Component</h1>
								<LoginForm/>
						</Layout>
				)
		}
}

export default Index
