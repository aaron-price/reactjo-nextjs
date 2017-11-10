import fetch from 'isomorphic-unfetch'
import Link from 'next/link'
import React from 'react'
import Router from 'next/router'
import withRedux from 'next-redux-wrapper'
import PropTypes from 'prop-types'

import Header from '../components/Head'
import { Details } from '../components/users/Details'
import { Update } from '../components/users/Update'
import { Delete } from '../components/users/Delete'

import { initStore } from '../redux/store'
const get_headers = require('../services/get_headers.js').get_headers
import { get_uri } from '../services/get_uri.js'
import {
    details_user_permission,
    update_user_permission,
    delete_user_permission } from '../services/permissions.js'
import { return_current_user } from '../services/current_user.js'

const fields = []

export class User extends React.Component {
    constructor(props) {
        super(props)
        let form = {}
        let errors = {}
        fields.forEach(f => {
            form[f] = this.props.profile[f]
            errors[f] = ''
        })
        this.state = {
            show_form: false,
            errors,
            form
        }
        this.show_hide_form = this.show_hide_form.bind(this)
        this.submit_form = this.submit_form.bind(this)
        this.delete_item = this.delete_item.bind(this)
        this.update_form = this.update_form.bind(this)
    }
    // Fires on every keystroke in the 'Update' form, updating the state.
    update_form(field, value) {
        let entry = this.state.form
        entry[field] = value.target.value
        let errors = Object.assign({}, this.state.errors)
        errors[field] = ''
        this.setState({ form: entry, errors })
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
                id: this.props.profile.id,
            })
        })
        .then(data => {
            Router.push('/')
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
            id: this.props.profile.id,
            is_staff: this.props.profile.is_staff,
            is_superuser: this.props.profile.is_superuser,
            is_active: this.props.profile.is_active,
            fields,
        }
        fields.forEach(f => body_fields[f] = this.state.form[f])

        fetch('/user/', {
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
                    `/user?id=${data.data.id}`,
                    `/user/${data.data.id}`
                )
            } else {
                let field_errors = {}
                console.log('DATA: ', data)
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
            <Header current_user={this.props.current_user}>

                <span>{
                    this.props.permission.details && (
                        <Details
                            form_fields={form_fields}
                            profile={this.props.profile} />
                    )
                }</span>

                <span>{
                    this.props.permission.update && (
                        <Update
                            current_user={this.props.current_user}
                            update_form={this.update_form}
                            submit_form={this.submit_form}
                            form_fields={form_fields}
                            all_fields={fields}
                            errors={this.state.errors}
                            show_form={this.state.show_form}
                            show_hide_form={this.show_hide_form}
                            profile={this.props.profile} />
                    )
                }</span>

                <span>{
                    this.props.permission.delete && (
                        <Delete delete_item={this.delete_item} />
                    )
                }</span>

            </Header>
        )
    }
}

User.getInitialProps = async function(context) {
    const { id } = context.query
    const profile_blob = await fetch(`${get_uri(context).backend}/api/profile/${id}`, {
        method: 'GET',
        headers: get_headers(context)
    })

    const current_user = await return_current_user(context)
    const profile = await profile_blob.json()
    const permission = {
        details: details_user_permission(current_user, { owner: profile.id }),
        update: update_user_permission(current_user, { owner: profile.id }),
        delete: delete_user_permission(current_user, { owner: profile.id }),
    }

    if (!!permission.details || !!permission.update || !!permission.delete) {
        return {
            current_user,
            profile,
            permission,
        }
    } else {
        if (context.res) {
            context.res.writeHead(301, {
            Location: '/users'
        })
            context.res.end()
            context.res.finish2ed = true
        } else {
            Router.replace('/users')
        }
    }
}

User.propTypes = {
    current_user: PropTypes.object,
    profile: PropTypes.object,
    permission: PropTypes.object,
}

export default withRedux(initStore, null)(User)
