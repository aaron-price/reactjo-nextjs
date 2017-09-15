import Link from 'next/link'
import 'isomorphic-fetch'
import React, { Component } from 'react'
import Header from '../components/Head'
import { return_current_user } from '../services/current_user.js'

const index = props => (
		<Header current_user={props.current_user}>
				<h1>Index Component</h1>
		</Header>
)

index.getInitialProps = async function(context) {
		return { current_user: await return_current_user(context) }
}
export default index
