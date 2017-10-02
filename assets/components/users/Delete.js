import FlatButton from 'material-ui/FlatButton'

const DeleteButton = (props) => {
    return (
        <div>
            <FlatButton
               label="Delete singular_upper"
               secondary={true}
               onClick={(e) => props.delete_item(e)} />
            <br />
        </div>
    )
}

module.exports = { DeleteButton }
