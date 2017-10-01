import Header from '../components/Head'
import Login from '../components/users/Login'
import { return_current_user } from '../services/current_user.js'
import React from 'react'
import RaisedButton from 'material-ui/RaisedButton'
import Router from 'next/router'
import fetch from 'isomorphic-unfetch'
import Divider from "material-ui/Divider"
import TextField from "material-ui/TextField"
import { get_uri } from '../services/get_uri.js'

class Login extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            current_user: this.props.current_user,
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
        .then(data => {
            Router.push({pathname: '/', as: '/'})
        })
        .catch(e => console.error(e))
    }
    render() {
        const field_styles = { marginLeft: 20 }
        return (
            <Header current_user={this.state.current_user}>
                <Login
                    update_form={this.update_form}
                    submit_form={submit_form} />
            </Header>
        )
    }
}

Login.getInitialProps = async function(context) {
    return {
        current_user: await return_current_user(context),
    }
}

export default Login
