import Link from 'next/link'
import 'isomorphic-fetch'
import React, { Component } from 'react'
import Header from '../components/Head'

class Index extends Component {
		constructor(props) {
				super(props)
				this.state = {}
		}

		render() {
				return (
						<Header user={this.props.user}>
								<h1>Index Component</h1>
						</Header>
				)
		}
}
Index.getInitialProps = async function(context) {
    return { user } = context.res.current_user
}
export default Index
