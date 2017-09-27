import fetch from 'isomorphic-unfetch'
import Link from 'next/link'
import React from 'react'
import Header from '../components/Head'
import { return_current_user } from '../services/current_user.js'
import { details_user_permission } from '../services/permissions.js'

const form_fields = ['name', 'email']
const User = (props) => (
    <Header
        csrftoken={props.csrftoken}
        current_user={props.current_user}>
        <h1>{props.profile.name}</h1>
        {form_fields.map((f, key) => {
            return f === 'name'
                ? <span key={key}></span>
                : <p key={key}>{f}: {props.profile[f]}</p>
        })}
    </Header>
)

User.getInitialProps = async function(context) {
    const { id } = context.query
    const profile_blob = await fetch(`http://localhost:8000/api/profile/${id}`, {
        method: 'GET',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        }
    })

    let current_user = await return_current_user(context)
    let profile = await profile_blob.json()
    const has_permission = details_user_permission(current_user, profile)

    if (!has_permission) {
        if (context.res) {
            context.res.writeHead(301, {
            Location: '/users'
        })
            context.res.end()
            context.res.finished = true
        } else {
            Router.replace('/users')
        }
    } else {
        return {
            current_user,
            profile,
            csrftoken: !context.res ? '' : context.res.csrftoken
        }
    }
}

export default User
