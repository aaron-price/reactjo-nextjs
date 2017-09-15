import fetch from 'isomorphic-unfetch'
import Link from 'next/link'
import React from 'react'
import Header from '../components/Head'
import { return_current_user } from '../services/current_user.js'

const title_upper = (props) => (
    <Header current_user={props.current_user}>
        <h1>{props.title_lower.string_method}</h1>
        <ul>
            {Object.keys(props.title_lower).map((field, key) => {
                return <li key={key}>{field}: {props.title_lower[field]}</li>
            })}
        </ul>
    </Header>
)
title_upper.getInitialProps = async function(context) {
    const { id } = context.query
    const res = await fetch(`http://localhost:8000/api/title_lower/${id}`, {
        method: 'GET',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        }
    })
    const data = await res.json()
    return {
        title_lower: data,
        current_user: await return_current_user(context)
    }
}
export default title_upper
