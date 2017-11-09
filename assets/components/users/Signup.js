import PropTypes from 'prop-types'
import RaisedButton from 'material-ui/RaisedButton'
import Divider from "material-ui/Divider"
import TextField from "material-ui/TextField"

const field_styles = { marginLeft: 20 }

const Signup = (props) => (
    <form method="POST">
        {props.form_fields.map((title, key) => {
            const low = title.toLowerCase()
            return low !== 'password' ? (
                <div key={key}>
                    <TextField
                        floatingLabelText={title}
                        floatingLabelFixed={true}
                        style={field_styles}
                        errorText={props.errors[low]}
                        onChange={e => props.update_form(low, e)}/>
                    <Divider /><br /><br />
                </div>
            ) : (
                <div key={key}>
                    <TextField
                        floatingLabelText="password"
                        floatingLabelFixed={true}
                        style={field_styles}
                        type='password'
                        errorText={props.errors[low]}
                        onChange={e => props.update_form('password', e)}/>
                    <Divider /><br /><br />
                </div>
            )
        })}

        <RaisedButton
            type="submit"
            label="Signup"
            onClick={props.submit_form} /><br/><br/>
    </form>
)

Signup.propTypes = {
    form_fields: PropTypes.array,
    update_form: PropTypes.func,
    errors: PropTypes.object,
}

export default Signup
module.exports = { Signup }