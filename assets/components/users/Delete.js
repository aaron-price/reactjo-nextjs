import FlatButton from 'material-ui/FlatButton'
import PropTypes from 'prop-types'

export const Delete = (props) => {
    return (
        <div>
            <FlatButton
                label="Delete user"
                secondary={true}
                onClick={(e) => props.delete_item(e)} />
            <br />
        </div>
    )
}

Delete.propTypes = {
    delete_item: PropTypes.func
}

export default Delete