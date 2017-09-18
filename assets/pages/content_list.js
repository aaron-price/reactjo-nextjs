import fetch from 'isomorphic-unfetch'
import Link from 'next/link'
import Header from '../components/Head'
import { return_current_user } from '../services/current_user.js'
import React from 'react'
import Router from 'next/router'
import FlatButton from 'material-ui/FlatButton'
import { create_singular_lower_permission, details_singular_lower_permission } from '../services/permissions.js'

const fields = []
const capitalize = (s) => s.charAt(0).toUpperCase() + s.slice(1)

const CreateWrapper = (props) => {
    if (create_singular_lower_permission(props.current_user)) {
        return (<div>{
            props.show_form
            ? (
                <div>
                <FlatButton
                   label="Hide Form"
                   primary={true}
                   onClick={() => this.show_hide_form()}/>
                <br />

                <CreateForm
                    submit_form={this.submit_form}
                    update_form={this.update_form}
                    form_fields={form_fields}
                />
                </div>
            )
            : (
              <div>
               <FlatButton
                  label="Create singular_upper"
                  primary={true}
                  onClick={() => this.show_hide_form()}/>
              </div>
            )
        }</div>)
    } else {
        return <span></span>
    }
}

const CreateForm = (props) => (
    <div>
        <h4>Create a new singular_upper</h4>
        <form
            onSubmit={props.submit_form}
            method="POST">

            { fields.map((f, key) => {
                return (
                    <div key={key}>
                        <label id={f} htmlFor={f}>{capitalize(f)}: &nbsp; </label>
                        <input
                            onChange={(e) => props.update_form(f, e)}
                            type="text"
                            name={f}
                            value={props.form_fields[f]}
                            required>
                        </input><br/><br/>
                    </div>
            )})}

            <input type="submit" value="Create singular_upper">
            </input><br/><br/>
        </form>
    </div>
)
const singular_upperListItem = (props) => {
    if (details_post_permission(props.current_user, props.singular_lower)) {
        return (
            <li>
                <Link
                    as={`/post/${props.singular_lower.pk}`}
                    href={`/post/?id=${props.singular_lower.pk}`}>
                    <a>{props.singular_lower.string_method}</a>
                </Link>
            </li>
        )
    } else {
        return <li>{props.singular_lower.string_method}</li>
    }
}

const plural_upperList = (props) => {
        return (
            <ul>
                {props.plural_lower.map((singular_lower, key) => {
                    return (
                        <singular_upperListItem
                            current_user={props.current_user}
                            singular_lower={singular_lower}
                            key={key}
                        />
                )})}
            </ul>
        )
}

class plural_upper extends React.Component {
    constructor(props) {
        super(props)
        let form = {}
        fields.forEach(f => form[f] = '')

        this.state = {
            current_user: this.props.current_user,
            show_form: false,
            form
        }
        this.update_form = this.update_form.bind(this)
        this.submit_form = this.submit_form.bind(this)
        this.show_hide_form = this.show_hide_form.bind(this)
    }
    update_form(field, value) {
        let entry = this.state.form
        entry[field] = value.target.value
        this.setState({ form: entry })
    }
    show_hide_form() {
        this.setState(prevState => {
            return { show_form: !prevState.show_form }
        })
    }
    submit_form(e) {
        e.preventDefault()
        let body_fields = { content_type: 'singular_lower', fields }
        fields.forEach(f => body_fields[f] = this.state.form[f])

        fetch('/singular_lower', {
            method: 'POST',
            credentials: 'include',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(body_fields)
        })
        .then(blob => blob.json())
        .then(data => {
            Router.push({
                pathname: '/singular_lower',
                query: { id: data.pk },
                as: `/singular_lower/${data.pk}`
            })
        })
        .catch(e => console.error(e))
    }
    render() {
        let form_fields = {}
        fields.forEach(f => form_fields[f] = this.state.form[f])
        return (
            <Header current_user={this.props.current_user}>
            <CreateWrapper
                current_user={this.props.current_user}
                show_form={this.state.show_form} />
                <h1>plural_upper</h1>
                    <plural_upperList plural_lower={this.props.plural_lower} />
            </Header>
    )}
}
plural_upper.getInitialProps = async function(context) {
    const res = await fetch('http://localhost:8000/api/singular_lower/', {
        method: 'GET',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        }
    })
    const data = await res.json()
    return {
        plural_lower: data,
        current_user: await return_current_user(context)
    }
}

export default plural_upper
