import fetch from 'isomorphic-unfetch'
import React from 'react'
import Router from 'next/router'
import withRedux from 'next-redux-wrapper'

import Divider from "material-ui/Divider"
import TextField from "material-ui/TextField"
import RaisedButton from 'material-ui/RaisedButton'

import Header from '../components/Head'
import Signup from '../components/users/Signup'

import { initStore } from '../redux/store'
import { return_current_user } from '../services/current_user.js'

const form_fields = []

class SignupPage extends React.Component {
    constructor(props) {
        super(props)
        let form = { password: '' }
        let errors = { message: '' }
        form_fields.forEach(f => {
            form[f] = ''
            errors[f] = ''
        })
        this.state = {
            current_user: this.props.current_user,
            errors,
            form
        }
        this.update_form = this.update_form.bind(this)
        this.submit_form = this.submit_form.bind(this)
    }
    update_form(field, value) {
        let entry = this.state.form
        entry[field] = value.target.value
        let errors = Object.assign({}, this.state.errors)
        errors[field] = ''
        this.setState({ form: entry, errors })
    }
    submit_form(e) {
        e.preventDefault()
        let body_fields = {
            password: this.state.form.password,
        }
        form_fields.forEach(f => {
            body_fields[f] = this.state.form[f]
        })

        fetch('/signup', {
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
            if (res.status === 200) {
                // If signup successful, redirect to index
                Router.push({pathname: '/', as: '/'})
            } else {
                // Otherwise, send the errors to the necessary fields.
                let errors = Object.assign({}, this.state.errors)
                Object.keys(res.data).forEach(field => {
                    errors[field] = res.data[field].join('. ')
                })
                this.setState({ errors })
            }
        })
        .catch(e => {
            console.error(e)
            let errors = Object.assign({}, this.state.errors, {
                message: 'Sorry, there was an unexpected error.'
            })
            this.setState({ errors })
        })
    }
    render() {
        return (
            <Header current_user={this.props.current_user}>
                <div style={{color: '#F44336'}}>{this.state.errors.message}</div>
                <Signup
                    update_form={this.update_form}
                    submit_form={this.submit_form}
                    errors={this.state.errors}
                    form_fields={form_fields} />
            </Header>
        )
    }
}

SignupPage.getInitialProps = async function(context) {
		return {
				current_user: await return_current_user(context),
		}
}

export default withRedux(initStore, null)(SignupPage)