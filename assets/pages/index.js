import Link from 'next/link'
import 'isomorphic-fetch'
import React, { Component } from 'react'
import withRedux from 'next-redux-wrapper'
import PropTypes from 'prop-types'

import Header from '../components/Head'

import { initStore } from '../redux/store'
import { return_current_user } from '../services/current_user.js'

export const index = props => (
    <Header current_user={props.current_user}>
        <h1>Reactjo Index</h1>
        <p>To add a new page, go to /frontent/pages/ and add a new file with a react component. You can use index.js as an example template</p>
        <p>To add a menu item, go to /frontend/components/Navbar.js</p>
        <p>To add a new model, open a terminal and type <code>reactjo c</code></p>
        <p>To adjust permissions, open /frontend/services/permissions.js</p>
    </Header>
)

index.getInitialProps = async function(context) {
    return {
        current_user: await return_current_user(context),
    }
}

index.propTypes = {
    current_user: PropTypes.object
}

export default withRedux(initStore, null)(index)