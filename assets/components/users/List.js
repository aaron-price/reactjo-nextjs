import { details_user_permission } from '../../services/permissions.js'
import Link from 'next/link'
import { List as MuiList, ListItem as MuiListItem } from 'material-ui/List'

const List = (props) => {
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
    const black = '#000000'
    if (details_user_permission(props.current_user, {owner: props.user.id})) {
        return (
            <MuiListItem
                style={{color: blue}}
                primaryText={props.user.string_method}
                insetChildren={true}
                href={`/user/${props.user.id}`} />
        )
    } else {
        return (
            <MuiListItem
                style={{color: black}}
                primaryText={props.user.string_method}
                insetChildren={true} />
        )
    }
}
module.exports = { List }
