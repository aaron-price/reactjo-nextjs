import Divider from 'material-ui/Divider'
import FlatButton from 'material-ui/FlatButton'
import RaisedButton from 'material-ui/RaisedButton'
import TextField from 'material-ui/TextField'

import { update_user_permission } from '../../services/permissions.js'

const capitalize = (s) => s.charAt(0).toUpperCase() + s.slice(1)

// Update Form wrapper, with hide/show buttons
export default (props) => {
    if (props.show_form) {
        return (
            <div>
                <FlatButton
                   label="Hide Form"
                   secondary={true}
                   onClick={() => props.show_hide_form()}/>
                <br /><br />
                <UpdateForm
                    submit_form={props.submit_form}
                    update_form={props.update_form}
                    form_fields={props.form_fields}
                    all_fields={props.all_fields}
                    profile={props.profile}
                    current_user={props.current_user} />
            </div>
        )
    } else {
        // 'show form' button
        return (
            <div>
                <FlatButton
                   label="Update Profile"
                   primary={true}
                   onClick={() => props.show_hide_form()}/>
                <br /><br />
            </div>
        )
    }
}

const field_styles = { marginLeft: 20 }
// The actual form inputs
const UpdateForm = (props) => (
    <div>
        <h4>Edit</h4>
        <form
            onSubmit={props.submit_form}
            method="PUT">

            { props.all_fields.map((f, key) => {
                if (f === 'owner') { return <span key={key}></span> }
                const type = f === 'password' ? 'password' : 'text'
                if (f !== 'password') {
                    return (
                        <div key={key}>
                            <TextField
                                floatingLabelText={f}
                                floatingLabelFixed={true}
                                style={field_styles}
                                type="text"
                                onChange={e => props.update_form(f, e)}/>
                            <Divider />
                        </div>
                    )
                } else {
                    return (
                        <div key={key}>
                            <TextField
                                floatingLabelText="Password *"
                                floatingLabelFixed={true}
                                style={field_styles}
                                type="password"
                                required
                                onChange={e => props.update_form(f, e)}/>
                            <Divider />
                        </div>
                    )
                }
            })}
            <br/>
            <RaisedButton primary={true} type="submit" label="Update Post" />
            <br/><br/>
        </form>
    </div>
)
