import RaisedButton from 'material-ui/RaisedButton'
import FlatButton from 'material-ui/FlatButton'
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
                <br />

                <CreateForm
                    submit_form={ props.submit_form }
                    update_form={ props.update_form }
                    form_fields={ props.form_fields }
                    current_user={ props.current_user }
                    all_fields={ props.all_fields }
                />
                </div>
            )
            : (
              <div>
               <RaisedButton
                  label="Create singular_upper"
                  primary={true}
                  onClick={() => props.show_hide_form()}/>
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

            <RaisedButton primary={true} type="submit" label="Create singular_upper" />
            <br/><br/>
        </form>
    </div>
)
module.exports = { CreateWrapper }
