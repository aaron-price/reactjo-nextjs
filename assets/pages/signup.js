import Header from '../components/Head'
import { return_current_user } from '../services/current_user.js'
import React from 'react'
import RaisedButton from 'material-ui/RaisedButton'
import Router from 'next/router'
import fetch from 'isomorphic-unfetch'
import TextField from "material-ui/TextField"
import Divider from "material-ui/Divider"

class Signup extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            current_user: this.props.current_user,
            form: {
                name: '',
                email: '',
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
        fetch('/signup', {
            method: 'POST',
            credentials: 'include',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                name: this.state.form.name,
                email: this.state.form.email,
                password: this.state.form.password
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
                <form method="POST">
                    <TextField
                        floatingLabelText="Name"
                        floatingLabelFixed={true}
                        style={field_styles}
                        onChange={e => this.update_form('name', e)}/>
                    <Divider />

                    <TextField
                        floatingLabelText="Email"
                        floatingLabelFixed={true}
                        style={field_styles}
                        onChange={e => this.update_form('email', e)}/>
                    <Divider /><br />

                    <TextField
                        floatingLabelText="Password"
                        floatingLabelFixed={true}
                        style={field_styles}
                        type='password'
                        onChange={e => this.update_form('password', e)}/>
                    <Divider /><br /><br />

                    <RaisedButton
                        type="submit"
                        label="Signup"
                        onClick={this.submit_form} /><br/><br/>
                </form>
            </Header>
        )
    }
}

Signup.getInitialProps = async function(context) {
		return { current_user: await return_current_user(context) }
}

export default Signup
