import Link from 'next/link'
import 'isomorphic-fetch'
import React, { Component } from 'react'

import Header from '../components/Head'

const index = props => (
		<Header>
				<h1>Reactjo Index</h1>
				<p>To add a new page, go to /frontent/pages/ and add a new file with a react component. You can use index.js as an example template</p>
				<p>To add a menu item, Open /frontend/components/Navbar.js</p>
				<p>To add a new model, open a terminal and type <code>reactjo c</code></p>
				<p>To adjust permissions, open /frontend/services/permissions.js</p>
		</Header>
)

export default index
