import { details_singular_lower_permission } from '../../services/permissions.js'
import Link from 'next/link'
import { List as MuiList, ListItem as MuiListItem } from 'material-ui/List'

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

const ListItem = (props) => {
    const blue = '#2962FF'
    const black = '#000000'
    if (details_singular_lower_permission(props.current_user, props.singular_lower)) {
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
                style={{color: black}}
                primaryText={props.singular_lower.string_method}
                insetChildren={true} />
        )
    }
}
module.exports = { List }
