import PropTypes from 'prop-types'
import RaisedButton from 'material-ui/RaisedButton'
import Divider from "material-ui/Divider"
import TextField from "material-ui/TextField"
const field_styles = { marginLeft: 20 }

const Login = (props) => (
    <form method="POST">
        <TextField
            floatingLabelText="Name"
            floatingLabelFixed={true}
            style={field_styles}
            required
            onChange={e => props.update_form('name', e)}/>
        <Divider />

        <TextField
            hintText="Password"
            floatingLabelText="Password"
            floatingLabelFixed={true}
            style={field_styles}
            type='password'
            required
            onChange={e => props.update_form('password', e)}/>
        <Divider /><br/>

        <RaisedButton
            type="submit"
            label="Login"
            onClick={props.submit_form} /><br/><br/>
    </form>
)

Login.propTypes = {
    update_form: PropTypes.func,
    submit_form: PropTypes.func,
}

export default Login
module.exports = { Login }