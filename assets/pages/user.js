import fetch from 'isomorphic-unfetch'
import Link from 'next/link'
import React from 'react'
import Header from '../components/Head'
import { return_current_user } from '../services/current_user.js'

const User = (props) => (
    <Header current_user={props.current_user}>
        <h1>User</h1>
        <p>{props.current_user.id} - {props.current_user.name}</p>
        <p>{props.current_user.email}</p>
    </Header>
)

User.getInitialProps = async function(context) {
		return { current_user: await return_current_user(context)}
}

export default User
