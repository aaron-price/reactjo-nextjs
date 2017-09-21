import fetch from 'isomorphic-unfetch'
import Link from 'next/link'
import React from 'react'
import Header from '../components/Head'
import { return_current_user } from '../services/current_user.js'

const fields = []
const User = (props) => (
    <Header current_user={props.current_user}>
        <h1>{props.profile.id} - {props.profile.name}</h1>
        {fields.map((f, key) => {
            return f === 'name'
                ? <span></span> 
                : <p key={key}>{props.profile[f]}</p>
            }
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

		return {
        current_user: await return_current_user(context),
        profile: await profile_blob.json()
    }
}

export default User
