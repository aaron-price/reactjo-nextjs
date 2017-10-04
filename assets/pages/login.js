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
            dialog: {
                open: false,
                text: ''
            },
            form: {
                name: '',
                password: ''
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
                Router.push({pathname: '/', as: '/'})
            }
            else if (data.status === 422) {
                this.setState({
                    dialog: {
                        open: true,
                        text: data.message
                    }
                })
            }
        })
        .catch(e => {
            this.setState({
                dialog: {
                    open: true,
                    text: e
                }
            })
        })
    }
    handle_close = () => {
        this.setState({dialog: { open: false }});
    }

    render() {
        const actions = [
            <FlatButton
                label="OK"
                primary={true}
                onClick={this.handle_close}
            />,
        ]
        return (
            <Header current_user={this.state.current_user}>
                <Dialog
                    title={this.state.dialog.text}
                    onRequestClose={this.handle_close}
                    open={this.state.dialog.open}
                    actions={actions} />
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
