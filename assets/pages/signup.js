import Header from '../components/Head'
import { return_current_user } from '../services/current_user.js'
import React from 'react'
import RaisedButton from 'material-ui/RaisedButton'
import Router from 'next/router'
import fetch from 'isomorphic-unfetch'

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
        return (
            <Header current_user={this.state.current_user}>
                <h4>Signup</h4>
                <form method="POST">

                    <label id="name" htmlFor="name">Name: &nbsp; </label>
                    <input
                        onChange={(e) => this.update_form('name', e)}
                        type="text"
                        name="name"
                        value={this.state.form.name}
                        required>
                    </input><br/><br/>

                    <label id="email" htmlFor="email">Email: &nbsp; </label>
                    <input
                        onChange={(e) => this.update_form('email', e)}
                        type="email"
                        name="email"
                        value={this.state.form.email}
                        required>
                    </input><br/><br/>

                    <label id="password" htmlFor="password">Password: &nbsp;</label>
                    <input
                        onChange={(e) => this.update_form('password', e)}
                        type="password"
                        name="password"
                        value={this.state.form.password}
                        required>
                    </input><br/><br/>

                    <input type="submit" value="Signup" onClick={this.submit_form}>
                    </input><br/><br/>
                </form>
            </Header>
        )
    }
}

Signup.getInitialProps = async function(context) {
		return { current_user: await return_current_user(context) }
}

export default Signup
