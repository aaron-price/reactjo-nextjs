import { details_singular_lower_permission } from '../../services/permissions.js'
import Link from 'next/link'

const List = (props) => {
    if (props.plural_lower.length === 0) {
        return <div>Sorry, there are no plural_lower yet.</div>
    } else {
        return (
            <ul>
                {props.plural_lower.map((singular_lower, key) => {
                    return (
                        <ListItem
                            current_user={props.current_user}
                            singular_lower={singular_lower}
                            key={key}
                        />
                )})}
            </ul>
        )
    }
}

const ListItem = (props) => {
    if (details_singular_lower_permission(props.current_user, props.singular_lower)) {
        return (
            <li>
                <Link
                    as={`/singular_lower/${props.singular_lower.pk}`}
                    href={`/singular_lower/?id=${props.singular_lower.pk}`}>
                    <a>{props.singular_lower.string_method}</a>
                </Link>
            </li>
        )
    } else {
        return <li>{props.singular_lower.string_method}</li>
    }
}
module.exports = { List }
