import React from 'react'
import Router from 'next/router'
import fetch from 'isomorphic-unfetch'

import Dialog from 'material-ui/Dialog'
import Divider from 'material-ui/Divider'
import FlatButton from 'material-ui/FlatButton'
import RaisedButton from 'material-ui/RaisedButton'
import TextField from 'material-ui/TextField'

import Header from '../components/Head'
import Login from '../components/users/Login'
import { return_current_user } from '../services/current_user.js'
import { get_uri } from '../services/get_uri.js'

class LoginPage extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            current_user: this.props.current_user,
            form: {
                name: '',
                password: ''
            },
            errors: {
                name: '',
                password: '',
                message: ''
            }
        }
        this.update_form = this.update_form.bind(this)
        this.submit_form = this.submit_form.bind(this)
    }
    update_form(field, value) {
        let entry = this.state.form
        entry[field] = value.target.value
        this.setState({ form: entry })
    }
    submit_form(e) {
        e.preventDefault()
        fetch('/login', {
            method: 'POST',
            credentials: 'include',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                name: this.state.form.name,
                password: this.state.form.password,
            })
        })
        .then(blob => blob.json())
        .then(data => {
            if (data.status === 200) {
                // If login successful, redirect to index page
                Router.push({pathname: '/', as: '/'})
            }
            else if (data.status === 422) {
              // Otherwise, send the errors to the necessary fields.
              let errors = Object.assign({}, this.state.errors)
              Object.keys(data.data).forEach(field => {
                  errors[field] = data.data[field].join('. ')
              })
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
        return (
            <Header current_user={this.state.current_user}>
                <div style={{color: '#F44336'}}>{this.state.errors.message}</div>
                <Login
                    update_form={this.update_form}
                    submit_form={this.submit_form} />
            </Header>
        )
    }
}

LoginPage.getInitialProps = async function(context) {
    return {
        current_user: await return_current_user(context),
    }
}

export default LoginPage
