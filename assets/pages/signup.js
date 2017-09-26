import Header from '../components/Head'
import { return_current_user } from '../services/current_user.js'
import React from 'react'
import RaisedButton from 'material-ui/RaisedButton'
import Router from 'next/router'
import fetch from 'isomorphic-unfetch'
import TextField from "material-ui/TextField"
import Divider from "material-ui/Divider"

const form_fields = []
class Signup extends React.Component {
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
            _csrf: this.props.csrftoken
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
        const field_styles = { marginLeft: 20 }
        return (
            <Header
                current_user={this.state.current_user}
                csrftoken={this.props.csrftoken}>
                <form method="POST">
                    {form_fields.map((title, key) => {
                        const low = title.toLowerCase()
                        return (
                            <div key={key}>
                                <TextField
                                    floatingLabelText={title}
                                    floatingLabelFixed={true}
                                    style={field_styles}
                                    onChange={e => this.update_form(low, e)}/>
                                <Divider /><br />
                            </div>
                        )
                    })}

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
		return {
        current_user: await return_current_user(context),
        csrftoken: !context.res ? '' : context.res.csrftoken
    }
}

export default Signup
