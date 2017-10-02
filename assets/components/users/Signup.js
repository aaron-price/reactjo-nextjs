import RaisedButton from 'material-ui/RaisedButton'
import Divider from "material-ui/Divider"
import TextField from "material-ui/TextField"

const field_styles = { marginLeft: 20 }

export default (props) => (
    <form method="POST">
        {props.form_fields.map((title, key) => {
            const low = title.toLowerCase()
            return (
                <div key={key}>
                    <TextField
                        floatingLabelText={title}
                        floatingLabelFixed={true}
                        style={field_styles}
                        onChange={e => props.update_form(low, e)}/>
                    <Divider /><br />
                </div>
            )
        })}

        <TextField
            floatingLabelText="Password"
            floatingLabelFixed={true}
            style={field_styles}
            type='password'
            onChange={e => props.update_form('password', e)}/>
        <Divider /><br /><br />

        <RaisedButton
            type="submit"
            label="Signup"
            onClick={props.submit_form} /><br/><br/>
    </form>
)
