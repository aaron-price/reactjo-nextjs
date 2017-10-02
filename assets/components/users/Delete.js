import FlatButton from 'material-ui/FlatButton'

export default (props) => {
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
