import Link from 'next/link'

import { List as MuiList, ListItem as MuiListItem } from 'material-ui/List'

import {
    details_user_permission,
    update_user_permission,
    delete_user_permission,
} from '../../services/permissions.js'

export default (props) => {
    if (props.users.length === 0) {
        return <div>Sorry, there are no users yet.</div>
    } else {
        return (
            <MuiList>
                {props.users.map((user, key) => {
                    return (
                        <ListItem
                            current_user={props.current_user}
                            user={user}
                            key={key} />
                )})}
            </MuiList>
        )
    }
}

const ListItem = (props) => {
    const blue = '#2962FF'
    let current_user = props.current_user
    let profile = props.user
    let has_permission = (
        details_user_permission(current_user, profile) ||
        update_user_permission(current_user, profile) ||
        delete_user_permission(current_user, profile)
    )

    if ( has_permission ) {
        return (
            <MuiListItem
                style={{color: blue}}
                primaryText={props.user.name}
                insetChildren={true}
                href={`/user/${props.user.id}`} />
        )
    } else {
        return (
            <MuiListItem
                style={{color: black, cursor: 'initial'}}
                primaryText={props.user.name}
                insetChildren={true} />
        )
    }
}
