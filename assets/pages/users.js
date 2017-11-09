import fetch from 'isomorphic-unfetch'
import Link from 'next/link'
import withRedux from 'next-redux-wrapper'
import PropTypes from 'prop-types'

import Header from '../components/Head'
import List from '../components/users/List'

import { initStore } from '../redux/store'
const get_headers = require('../services/get_headers.js').get_headers
import { get_uri } from '../services/get_uri.js'
import {
    details_user_permission,
    list_user_permission } from '../services/permissions.js'
import { return_current_user } from '../services/current_user.js'

const Users = (props) => (
    <Header current_user={props.current_user}>
        <h1>Users</h1>
        <List
            current_user={props.current_user}
            users={props.users} />
    </Header>
)

Users.getInitialProps = async function(context) {
    const current_user = await return_current_user(context)
    const has_permission = list_user_permission(current_user)

    if (!has_permission) {
        if (context.res) {
            context.res.writeHead(301, {
            Location: '/'
        })
            context.res.end()
            context.res.finished = true
        } else {
            Router.replace('/')
        }
    } else {
        const users_blob = await fetch(`${get_uri(context).backend}/api/profile/`, {
            method: 'GET',
            headers: get_headers(context)
        })
        const users = await users_blob.json()
        return {
            current_user,
            users,
        }
    }
}

Users.propTypes = {
    current_user: PropTypes.object,
    users: PropTypes.array,
}

export default withRedux(initStore, null)(Users)
module.exports = { Users }