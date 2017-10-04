import Divider from 'material-ui/Divider'
import FlatButton from 'material-ui/FlatButton'
import RaisedButton from 'material-ui/RaisedButton'
import TextField from 'material-ui/TextField'
import {
    update_dog_permission,
    delete_dog_permission } from '../../services/permissions.js'
const capitalize = (s) => s.charAt(0).toUpperCase() + s.slice(1)

const UpdateFormWrapper = (props) => {
    if (update_singular_lower_permission(props.current_user, props.singular_lower)) {
        if (props.show_form) {
            // Update Form, with 'hide form' button
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
                        singular_lower={props.singular_lower}
                        errors={props.errors}
                        current_user={props.current_user} />
                </div>
            )
        } else {
            // 'show form' button
            return (
                <div>
                    <FlatButton
                       label="Update singular_upper"
                       primary={true}
                       onClick={() => props.show_hide_form()}/>
                    <br /><br />
                </div>
            )
        }
    // User doesn't have permission, render nothing.
    } else { return <span></span> }
}

const field_styles = { marginLeft: 20 }
const UpdateForm = (props) => (
    <div>
        <h4>Edit</h4>
        <form
            onSubmit={props.submit_form}
            method="PUT">

            { props.all_fields.map((f, key) => {
                if (f === 'owner') { return <span key={key}></span> }
                return (
                    <div key={key}>
                        <TextField
                            floatingLabelText={f}
                            floatingLabelFixed={true}
                            style={field_styles}
                            type="text"
                            errors={props.errors}
                            onChange={e => props.update_form(f, e)}/>
                        <Divider />
                    </div>
                )
            })}

            <RaisedButton primary={true} type="submit" label="Update singular_upper" />
            <br/><br/>
        </form>
    </div>
)

module.exports = { UpdateFormWrapper }
