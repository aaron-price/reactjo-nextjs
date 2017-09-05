import Link from 'next/link'
import 'isomorphic-fetch'
import React, { Component } from 'react'
import LoginForm from '../components/Login.js'

class Index extends Component {
		constructor(props) {
				super(props)
				this.state = {}
		}

		render() {
				return (
						<div>
								<h1>Index Component</h1>
								<LoginForm/>
						</div>
				)
		}
}

export default Index
