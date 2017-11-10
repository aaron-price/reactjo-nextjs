import fetch from 'isomorphic-unfetch'
import Router from 'next/router'
import React from 'react'
import withRedux from 'next-redux-wrapper'
import PropTypes from 'prop-types'

import Delete from '../components/plural_lower/Delete.js'
import Details from '../components/plural_lower/Details.js'
import Header from '../components/Head'
import UpdateFormWrapper from '../components/plural_lower/Update.js'
import { initStore } from '../redux/store'

import {
    details_singular_lower_permission,
    update_singular_lower_permission,
    delete_singular_lower_permission,
    details_user_permission,
    update_user_permission,
    delete_user_permission,
} from '../services/permissions.js'
const get_headers = require('../services/get_headers.js').get_headers
import { get_uri } from '../services/get_uri.js'
import { return_current_user } from '../services/current_user.js'

const fields = []

export class singular_upper extends React.Component {
    constructor(props) {
        super(props)
        let form = {}
        let errors = {}
        fields.forEach(f => {
            form[f] = this.props.singular_lower[f]
            errors[f] = ''
        })

        this.state = {
            current_user: this.props.current_user,
            show_form: false,
            errors,
            form
        }
        this.delete_item = this.delete_item.bind(this)
        this.submit_form = this.submit_form.bind(this)
        this.update_form = this.update_form.bind(this)
        this.show_hide_form = this.show_hide_form.bind(this)
    }
    delete_item(e) {
        e.preventDefault()

        fetch('/singular_lower/', {
            method: 'DELETE',
            credentials: 'include',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                id: this.props.singular_lower.pk,
            })
        })
        .then(data => {
            Router.push('/plural_lower/')
        })
        .catch(e => console.error(e))
    }

    // Fires on every keystroke in the 'Update' form, updating the state.
    update_form(field, value) {
        let entry = this.state.form
        entry[field] = value.target.value
        let errors = Object.assign({}, this.state.errors)
        errors[field] = ''
        this.setState({ form: entry, errors })
    }

    // Hidden by default, toggles the 'Update' form.
    show_hide_form() {
        this.setState(prevState => {
            return { show_form: !prevState.show_form }
        })
    }

    // Take all the data in state.form and update the singular_lower with it.
    submit_form(e) {
        e.preventDefault()
        let body_fields = {
            id: this.props.singular_lower.pk,
            fields,
        }
        fields.forEach(f => body_fields[f] = this.state.form[f])

        fetch('/singular_lower/', {
            method: 'PATCH',
            credentials: 'include',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(body_fields)
        })
        .then(blob => blob.json())
        .then(data => {
            if (data.status === 200){
                Router.push(
                    `/singular_lower?id=${data.data.pk}`,
                    `/singular_lower/${data.data.pk}`
                )
            } else {
                let field_errors = {}
                Object.keys(data.data).forEach(field => {
                    field_errors[field] = data.data[field].join('. ')
                })
                let errors = Object.assign({}, this.state.errors, field_errors)
                this.setState({ errors })
            }

        })
        .catch(e => console.error(e))
    }
    render() {
        let form_fields = {}
        fields.forEach(f => form_fields[f] = this.state.form[f])
        return (
            <Header current_user={ this.state.current_user }>

                <span>{this.props.permissions.details && (
                    <Details
                        singular_lower={ this.props.singular_lower }
                        permissions={this.props.permissions} />
                )}</span>

                <span>{this.props.permissions.update && (
                    <UpdateFormWrapper
                        show_form={ this.state.show_form }
                        submit_form={ this.submit_form }
                        update_form={ this.update_form }
                        form_fields={ form_fields }
                        all_fields={ fields }
                        errors={ this.state.errors }
                        singular_lower={ this.props.singular_lower }
                        current_user={ this.state.current_user }
                        show_hide_form={ this.show_hide_form } />
                )}</span>

                <span>{this.props.permissions.delete && (
                    <Delete
                        current_user={ this.state.current_user }
                        delete_item={ this.delete_item }
                        singular_lower={ this.props.singular_lower } />
                )}</span>

            </Header>
        )
    }
}

// Gets the current user, the singular_lower, and checks permission
singular_upper.getInitialProps = async function(context) {
    // Get the singular_lower object
    const { id } = context.query
    const res = await fetch(`${get_uri(context).backend}/api/singular_lower/${id}`, {
        method: 'GET',
        headers: get_headers(context)
    })
    const data = await res.json()

    // Get the current user
    const current_user = await return_current_user(context)

    // Build the permissions object
    let permissions = {
        details: details_singular_lower_permission(current_user, data),
        update: update_singular_lower_permission(current_user, data),
        delete: delete_singular_lower_permission(current_user, data)
    }
    // The page is broken into details, update, and delete. User must have
    // permission to access at least one of them.
    const has_permission = (
        permissions.details ||
        permissions.update ||
        permissions.delete
    )
    permissions.object = has_permission

    // Permission to view the owner's profile. If true, owner name is a link.
    let owner = { owner: data.owner }
    permissions.owner = (
        details_user_permission(current_user, owner) ||
        update_user_permission(current_user, owner) ||
        delete_user_permission(current_user, owner)
    )

    // If user can view the page, bounce back to the list page.
    if (!has_permission) {
        if (context.res) {
            context.res.writeHead(301, {
            Location: '/plural_lower'
        })
            context.res.end()
            context.res.finished = true
        } else {
            Router.replace('/plural_lower')
        }
    } else {
        return {
            singular_lower: data,
            current_user: current_user,
            permissions
        }
    }
}
singular_upper.propTypes = {
    singular_lower: PropTypes.object,
    current_user: PropTypes.object,
    permissions: PropTypes.object,
}

export default withRedux(initStore, null)(singular_upper)