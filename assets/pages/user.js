import fetch from 'isomorphic-unfetch'
import Link from 'next/link'
import React from 'react'
import Header from '../components/Head'
import Details from '../components/users/Details'
import Update from '../components/users/Update'

import { return_current_user } from '../services/current_user.js'
import { details_user_permission } from '../services/permissions.js'
import { get_uri } from '../services/get_uri.js'

const fields = ['name', 'email']
class User extends React.Component {
    constructor(props) {
        super(props)
        let form = {}
        fields.forEach(f => form[f] = this.props.profile[f])

        this.state = {
            show_form: false,
            form
        }
        this.show_hide_form = this.show_hide_form.bind(this)
        this.submit_form = this.submit_form.bind(this)
        this.delete_item = this.delete_item.bind(this)
    }
    delete_item(e) {
        e.preventDefault()

        fetch('/user/', {
            method: 'DELETE',
            credentials: 'include',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                id: this.props.post.pk,
            })
        })
        .then(data => {
            Router.push('/users/')
        })
        .catch(e => console.error(e))
    }
    show_hide_form() {
        this.setState(prevState => {
            return { show_form: !prevState.show_form }
        })
    }
    // Take all the data in state.form and update the post with it.
    submit_form(e) {
        e.preventDefault()
        let body_fields = {
            id: this.props.profile.pk,
            fields,
        }
        fields.forEach(f => body_fields[f] = this.state.form[f])

        fetch('/user/', {
            method: 'PUT',
            credentials: 'include',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(body_fields)
        })
        .then(blob => blob.json())
        .then(data => {
            Router.push(
                `/user?id=${data.pk}`,
                `/user/${data.pk}`
            )
        })
        .catch(e => console.error(e))
    }

    render() {
        let form_fields = {}
        fields.forEach(f => form_fields[f] = this.state.form[f])
        return (
            <Header current_user={this.props.current_user}>
                <Details form_fields={form_fields} profile={this.props.profile}/>
                <Update
                    current_user={this.props.current_user}
                    form_fields={form_fields}
                    all_fields={fields}
                    show_form={this.state.show_form}
                    show_hide_form={this.show_hide_form}
                    profile={this.props.profile} />
            </Header>
        )
    }
}

User.getInitialProps = async function(context) {
    const { id } = context.query
    const profile_blob = await fetch(`${get_uri(context).backend}/api/profile/${id}`, {
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
        }
    }
}

export default User
