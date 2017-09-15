import fetch from 'isomorphic-unfetch'
import React from 'react'
import Header from '../components/Head'
import { return_current_user } from '../services/current_user.js'
import FlatButton from 'material-ui/FlatButton'
import Router from 'next/router'

const fields = []
const capitalize = (s) => s.charAt(0).toUpperCase() + s.slice(1)

const Details = (props) => (
    <div>
        <h1>{props.singular_lower.string_method}</h1>
        <ul>
            {Object.keys(props.singular_lower).map((field, key) => {
                return <li key={key}>{field}: {props.singular_lower[field]}</li>
            })}
        </ul>
    </div>
)

const UpdateForm = (props) => (
    <div>
        <h4>Edit</h4>
        <form
            onSubmit={props.submit_form}
            method="PUT">

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

            <input type="submit" value="Update singular_upper">
            </input><br/><br/>
        </form>
    </div>
)

const DeleteButton = (props) => (
    <div>
        <FlatButton
           label="Delete singular_upper"
           secondary={true}
           onClick={(e) => props.delete_item(e)}/>
        <br />
    </div>
)
class singular_upper extends React.Component {
    constructor(props) {
        super(props)
        let form = {}
        fields.forEach(f => form[f] = this.props.singular_lower[f])

        this.state = {
            current_user: this.props.current_user,
            show_form: false,
            form
        }
        this.delete_item = this.delete_item.bind(this)
        this.submit_form = this.submit_form.bind(this)
        this.update_form = this.update_form.bind(this)
        this.show_hide_form = this.show_hide_form.bind(this)
    }
    delete_item(e) {
        e.preventDefault()

        fetch('/singular_lower', {
            method: 'DELETE',
            credentials: 'include',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ id: this.props.singular_lower.pk })
        })
        .then(data => {
            Router.push({
                pathname: '/plural_lower/',
                as: `/plural_lower/`
            })
        })
        .catch(e => console.error(e))
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
        let body_fields = { id: this.props.singular_lower.pk, fields }
        fields.forEach(f => body_fields[f] = this.state.form[f])

        fetch('/singular_lower', {
            method: 'PUT',
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
            <Header current_user={this.state.current_user}>
                {
                    this.state.show_form ? (
                        <div>
                            <FlatButton
                               label="Hide Form"
                               primary={true}
                               onClick={() => this.show_hide_form()}/>
                            <br /><br />
                            <UpdateForm
                                submit_form={this.submit_form}
                                update_form={this.update_form}
                                form_fields={form_fields} />
                        </div>
                    ) : (
                      <div>
                          <FlatButton
                             label="Update singular_upper"
                             primary={true}
                             onClick={() => this.show_hide_form()}/>
                          <br /><br />
                      </div>
                    )
                }
                <DeleteButton delete_item={this.delete_item}/>
                <Details singular_lower={this.props.singular_lower}/>
            </Header>
        )
    }
}

singular_upper.getInitialProps = async function(context) {
    const { id } = context.query
    const res = await fetch(`http://localhost:8000/api/singular_lower/${id}`, {
        method: 'GET',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        }
    })
    const data = await res.json()
    return {
        singular_lower: data,
        current_user: await return_current_user(context)
    }
}
export default singular_upper
