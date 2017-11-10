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
        <p>To add a new page, add a new .js file in /frontend/pages.<br />
            You can use index.js as an example template.<br />
            Try to keep all the state and logic in the page file, and all the visual markup in a separate /components/ file.<br />
            A new route is automatically created for every page</p>
        <p>To add new custom routes, see /frontend/server.js</p>
        <p>Add menu items in /frontend/components/Navbar.js</p>
        <p>To add new content types, open a terminal and type <code>reactjo c</code> or <code>reactjo content</code></p>
        <p>To adjust permissions, see /frontend/services/permissions.js</p>
        <p>For an example of working with redux in reactjo, see <a href='/redux_demo'>/pages/redux_demo</a></p>
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