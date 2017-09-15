import fetch from 'isomorphic-unfetch'
import Link from 'next/link'
import React from 'react'
import Header from '../components/Head'
import { return_current_user } from '../services/current_user.js'
import FlatButton from 'material-ui/FlatButton'
import Router from 'next/router'

const Details = (props) => (
    <div>
        <h1>{props.singular_lower.body}</h1>
        <ul>
            {Object.keys(props.singular_lower).map((field, key) => {
                return <li key={key}>{field}: {props.singular_lower[field]}</li>
            })}
        </ul>
    </div>
)

const UpdateForm = (props) => (
    <div>
        Update
    </div>
)

const DeleteButton = (props) => (
    <div>
        <FlatButton
           label="Delete singular_upper"
           secondary={true}
           onClick={(e) => props.delete_item(e)}/>
        <br />
    </div>
)
class singular_upper extends React.Component {
    constructor(props) {
        super(props)
        this.delete_item = this.delete_item.bind(this)
    }
    delete_item(e) {
        e.preventDefault()

        fetch('/singular_lower', {
            method: 'DELETE',
            credentials: 'include',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ id: this.props.singular_lower.pk })
        })
        .then(data => {
            Router.push({
                pathname: '/plural_lower/',
                as: `/plural_lower/`
            })
        })
        .catch(e => console.error(e))
    }
    render() {
        return (
            <Header current_user={this.props.current_user}>
                <UpdateForm />
                <DeleteButton delete_item={this.delete_item}/>
                <Details tweet={this.props.singular_lower}/>
            </Header>
        )
    }
}

singular_upper.getInitialProps = async function(context) {
    const { id } = context.query
    const res = await fetch(`http://localhost:8000/api/singular_lower/${id}`, {
        method: 'GET',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        }
    })
    const data = await res.json()
    return {
        singular_lower: data,
        current_user: await return_current_user(context)
    }
}
export default singular_upper
