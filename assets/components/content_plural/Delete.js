import FlatButton from 'material-ui/FlatButton'
import { delete_singular_lower_permission } from '../../services/permissions.js'

const DeleteButton = (props) => {
    if (delete_singular_lower_permission(props.current_user, props.singular_lower)) {
        return (
            <div>
                <FlatButton
                   label="Delete singular_upper"
                   secondary={true}
                   onClick={(e) => props.delete_item(e)} />
                <br />
            </div>
        )
    } else { return <span></span> }
}

module.exports = { DeleteButton }
