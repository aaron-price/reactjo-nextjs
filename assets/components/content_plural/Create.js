import Divider from "material-ui/Divider"
import FlatButton from 'material-ui/FlatButton'
import RaisedButton from 'material-ui/RaisedButton'
import TextField from "material-ui/TextField"

import { create_singular_lower_permission } from '../../services/permissions.js'
const capitalize = (s) => s.charAt(0).toUpperCase() + s.slice(1)

const CreateWrapper = (props) => {
    if (create_singular_lower_permission(props.current_user)) {
        return (<div>{
            props.show_form
            ? (
                <div>
                    <FlatButton
                       label="Hide Form"
                       secondary={true}
                       onClick={() => props.show_hide_form()}/>
                    <br /><br/>

                    <CreateForm
                        submit_form={ props.submit_form }
                        update_form={ props.update_form }
                        form_fields={ props.form_fields }
                        current_user={ props.current_user }
                        all_fields={ props.all_fields }
                        errors={ props.errors }
                    />
                </div>
            )
            : (
              <div>
                  <FlatButton
                      label="Create singular_upper"
                      primary={true}
                      onClick={() => props.show_hide_form()}/><br/><br/>
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

            { props.all_fields.map((f, key) => {
                if (f === 'owner') { return <span key={key}></span> }

                return (
                    <div key={key}>
                        <TextField
                            floatingLabelText={f}
                            floatingLabelFixed={true}
                            style={field_styles}
                            type='text'
                            errorText={props.errors[f]}
                            onChange={e => props.update_form(f, e)}/>
                        <Divider /><br /><br />
                    </div>
            )})}

            <RaisedButton primary={true} type="submit" label="Create singular_upper" />
            <br/><br/>
        </form>
    </div>
)
module.exports = { CreateWrapper }
