import fetch from 'isomorphic-unfetch'
import Link from 'next/link'
import React from 'react'
import Header from '../components/Head'

const User = (props) => (
    <Header>
        <h1>User</h1>
        <p>{props.user.id} - {props.user.name}</p>
        <p>{props.user.email}</p>
    </Header>
)
User.getInitialProps = async function(context) {
    const { id } = context.query
    const res = await fetch(`http://localhost:8000/api/profile/${id}`, {
        method: 'GET',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        }
    })
    const data = await res.json()
    return {
        user: data
    }
}

export default User
