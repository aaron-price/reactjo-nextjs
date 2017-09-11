import fetch from 'isomorphic-unfetch'
import Link from 'next/link'
import React from 'react'
import Header from '../components/Head'

const title_upper = (props) => (
    <Header>
        <h1>{props.title_lower.string_method}</h1>
        <ul>
            {props.title_lower.fields.map((field, key) => {
                return <li key={key}>{field.title}</li>
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
        title_lower: data
    }
}

export default title_upper
