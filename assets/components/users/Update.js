import PropTypes from 'prop-types'
import Divider from 'material-ui/Divider'
import FlatButton from 'material-ui/FlatButton'
import RaisedButton from 'material-ui/RaisedButton'
import TextField from 'material-ui/TextField'

import { update_user_permission } from '../../services/permissions.js'

const capitalize = (s) => s.charAt(0).toUpperCase() + s.slice(1)

// Update Form wrapper, with hide/show buttons
const Update = (props) => {
    if (props.show_form) {
        return (
            <div>
                <FlatButton
                   label="Hide Form"
                   secondary={true}
                   onClick={() => props.show_hide_form()}/>
                <br /><br />
                <UpdateForm
                    all_fields={props.all_fields}
                    current_user={props.current_user}
                    errors={props.errors}
                    profile={props.profile}
                    submit_form={props.submit_form}
                    update_form={props.update_form} />
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
Update.propTypes = {
    all_fields: PropTypes.array,
    current_user: PropTypes.object,
    errors: PropTypes.object,
    profile: PropTypes.object,
    show_form: PropTypes.bool,
    show_hide_form: PropTypes.func,
    submit_form: PropTypes.func,
    update_form: PropTypes.update_form,

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
                                floatingLabelText={'New ' + f}
                                floatingLabelFixed={true}
                                style={field_styles}
                                type="text"
                                errorText={props.errors[f]}
                                onChange={e => props.update_form(f, e)}/>
                            <Divider />
                        </div>
                    )
                } else {
                    return (
                        <div key={key}>
                            <TextField
                                floatingLabelText="New password"
                                floatingLabelFixed={true}
                                style={field_styles}
                                type="password"
                                errorText={props.errors[f]}
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
UpdateForm.propTypes = {
    submit_form: PropTypes.func,
    all_fields: PropTypes.array,
    errors: PropTypes.object,
    update_form: PropTypes.func,
}

export default Update