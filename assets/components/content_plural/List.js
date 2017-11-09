import Link from 'next/link'
import PropTypes from 'prop-types'
import { List as MuiList, ListItem as MuiListItem } from 'material-ui/List'

import {
    details_singular_lower_permission,
    update_singular_lower_permission,
    delete_singular_lower_permission,
} from '../../services/permissions.js'

const List = (props) => {
    if (props.plural_lower.length === 0) {
        return <div>Sorry, there are no plural_lower yet.</div>
    } else {
        return (
            <MuiList>
                {props.plural_lower.map((singular_lower, key) => {
                    return (
                        <ListItem
                            current_user={props.current_user}
                            singular_lower={singular_lower}
                            key={key} />
                )})}
            </MuiList>
        )
    }
}
List.propTypes = {
    current_user: PropTypes.object,
    plural_lower: PropTypes.array,
}

const ListItem = (props) => {
    const blue = '#2962FF'
    const black = '#000000'
    let user = props.current_user
    let item = props.singular_lower
    let has_permission = (
        details_singular_lower_permission(user, item) ||
        update_singular_lower_permission(user, item) ||
        delete_singular_lower_permission(user, item)
    )
    if (has_permission) {
        return (
            <MuiListItem
                style={{color: blue}}
                primaryText={props.singular_lower.string_method}
                insetChildren={true}
                href={`/singular_lower/${props.singular_lower.pk}`} />
        )
    } else {
        return (
            <MuiListItem
                style={{color: black, cursor: 'initial'}}
                primaryText={props.singular_lower.string_method}
                insetChildren={true} />
        )
    }
}
ListItem.propTypes = {
    current_user: PropTypes.object,
    singular_lower: PropTypes.object
}

export default List
module.exports = { List }
