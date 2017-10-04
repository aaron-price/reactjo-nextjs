import React from 'react'
import RaisedButton from 'material-ui/RaisedButton'
import Router from 'next/router'
import fetch from 'isomorphic-unfetch'
import TextField from "material-ui/TextField"
import Divider from "material-ui/Divider"

import Signup from '../components/users/Signup'
import Header from '../components/Head'
import { return_current_user } from '../services/current_user.js'

const form_fields = []

class SignupPage extends React.Component {
    constructor(props) {
        super(props)
        let form = { password: '' }
        form_fields.forEach(f => {
          form[f] = ''
        })
        this.state = {
            current_user: this.props.current_user,
            form
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
        .then(data => {
            Router.push({pathname: '/', as: '/'})
        })
        .catch(e => console.error(e))
    }
    render() {
        return (
            <Header current_user={this.props.current_user}>
                <Signup
                    update_form={this.update_form}
                    submit_form={this.submit_form}
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

export default SignupPage
