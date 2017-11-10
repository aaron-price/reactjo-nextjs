import React from 'react'
import FlatButton from 'material-ui/FlatButton'
import PropTypes from 'prop-types'

let Delete = (props) => {
    return (
        <div>
            <FlatButton
                label="Delete user"
                secondary={true}
                className='user_crud__delete_btn'
                onClick={(e) => props.delete_item(e)} />
            <br />
        </div>
    )
}

Delete.propTypes = {
    delete_item: PropTypes.func
}

module.exports = { Delete }
