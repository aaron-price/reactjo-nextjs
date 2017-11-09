import fetch from 'isomorphic-unfetch'
import React from 'react'
import Router from 'next/router'
import withRedux from 'next-redux-wrapper'

import { CreateWrapper } from '../components/plural_lower/Create.js'
import Header from '../components/Head'
import { List } from '../components/plural_lower/List.js'

import { initStore } from '../redux/store'
import { list_singular_lower_permission } from '../services/permissions.js'
const get_headers = require('../services/get_headers.js').get_headers
import { get_uri } from '../services/get_uri.js'
import { return_current_user } from '../services/current_user.js'

const fields = []

class plural_upper extends React.Component {
    constructor(props) {
        super(props)
        // Builds the 'Create' form fields.
        let form = {}
        let errors = { message: '' }
        fields.forEach(f => {
            form[f] = ''
            errors[f] = ''
        })

        this.state = {
            current_user: this.props.current_user,
            show_form: false,
            errors,
            form
        }
        this.update_form = this.update_form.bind(this)
        this.submit_form = this.submit_form.bind(this)
        this.show_hide_form = this.show_hide_form.bind(this)
    }

    // Fires on every keystroke in the 'Create' form, updating the state.
    update_form(field, value) {
        let form = this.state.form
        form[field] = value.target.value
        let errors = Object.assign(this.state.errors)
        errors[field] = ''
        this.setState({ form, errors })
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
        .then(res => {
            if (res.status === 200){
                Router.push(
                  `/singular_lower?id=${res.data.pk}`,
                  `/singular_lower/${res.data.pk}`
                )
            } else {
                let field_errors = {}
                Object.keys(res.data).forEach(field => {
                    field_errors[field] = res.data[field].join('. ')
                })
                let errors = Object.assign({}, this.state.errors, field_errors)
                this.setState({ errors })
            }

        })
        .catch(e => {
            console.error(e)
            let errors = Object.assign({}, this.state.errors, {
                message: 'Sorry, we had trouble communicating with the database.'
            })
            this.setState({ errors })
        })
    }
    render() {
        let form_fields = {}
        fields.forEach(f => form_fields[f] = this.state.form[f])
        return (
            <Header current_user={this.props.current_user}>
            <div style={{color: '#F44336'}}>{this.state.errors.message}</div>
            <CreateWrapper
                current_user={ this.props.current_user }
                show_form={ this.state.show_form }
                show_hide_form={ this.show_hide_form }
                submit_form={ this.submit_form }
                update_form={ this.update_form }
                form_fields={ form_fields }
                errors={ this.state.errors }
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
        headers: get_headers(context)
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

export default withRedux(initStore, null)(plural_upper)