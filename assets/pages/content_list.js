import fetch from 'isomorphic-unfetch'
import Header from '../components/Head'
import { return_current_user } from '../services/current_user.js'
import React from 'react'
import Router from 'next/router'
import { List } from '../components/plural_lower/List.js'
import { CreateWrapper } from '../components/plural_lower/Create.js'
import { list_singular_lower_permission } from '../services/permissions.js'
import { get_uri } from '../services/get_uri.js'

const fields = []

class plural_upper extends React.Component {
    constructor(props) {
        super(props)
        // Builds the 'Create' form fields.
        let form = {}
        fields.forEach(f => form[f] = '')

        this.state = {
            current_user: this.props.current_user,
            show_form: false,
            form
        }
        this.update_form = this.update_form.bind(this)
        this.submit_form = this.submit_form.bind(this)
        this.show_hide_form = this.show_hide_form.bind(this)
    }

    // Fires on every keystroke in the 'Create' form, updating the state.
    update_form(field, value) {
        let entry = this.state.form
        entry[field] = value.target.value
        this.setState({ form: entry })
    }

    // Hidden by default, toggles the 'Create' form.
    show_hide_form() {
        this.setState(prevState => {
            return { show_form: !prevState.show_form }
        })
    }

    // Take all the data in state.form and create a new singular_upper with it.
    submit_form(e) {
        e.preventDefault()
        let body_fields = {
            content_type: 'singular_lower',
            fields,
        }
        fields.forEach(f => body_fields[f] = this.state.form[f])

        fetch('/singular_lower/', {
            method: 'POST',
            credentials: 'include',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(body_fields)
        })
        .then(blob => blob.json())
        .then(data => {
            // If successful, redirect to the newly created details page
            Router.push(
                `/singular_lower?id=${data.pk}`,
                `/singular_lower/${data.pk}`
            )
        })
        .catch(e => console.error(e))
    }
    render() {
        let form_fields = {}
        fields.forEach(f => form_fields[f] = this.state.form[f])
        return (
            <Header
                current_user={this.props.current_user}>

            <CreateWrapper
                current_user={ this.props.current_user }
                show_form={ this.state.show_form }
                show_hide_form={ this.show_hide_form }
                submit_form={ this.submit_form }
                update_form={ this.update_form }
                form_fields={ form_fields }
                all_fields={ fields } />

            <h1>plural_upper</h1>
            <List
                current_user={this.props.current_user}
                plural_lower={this.props.plural_lower} />

            </Header>
    )}
}

// Gets the current user, list of plural_lower, and checks permission
plural_upper.getInitialProps = async function(context) {
    const res = await fetch(`${get_uri(context).backend}/api/singular_lower/`, {
        method: 'GET',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        }
    })
    const data = await res.json()
    const current_user = await return_current_user(context)
    const has_permission = list_singular_lower_permission(current_user, data)

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
        return {}
    } else {
        return {
            plural_lower: data,
            current_user: await return_current_user(context),
        }
    }
}

export default plural_upper
