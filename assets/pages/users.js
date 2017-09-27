import fetch from 'isomorphic-unfetch'
import Link from 'next/link'
import Header from '../components/Head'
import { Button } from 'reactstrap'
import { return_current_user } from '../services/current_user.js'
import { List as MuiList, ListItem as MuiListItem } from 'material-ui/List'
import {
    list_user_permission,
    details_user_permission
} from '../services/permissions.js'

const blue = '#2962FF'
const black = '#000000'

const Users = (props) => (
    <Header
        current_user={props.current_user}>
        <h1>Users</h1>
            <MuiList>
                {props.users.map((user, key) => {
                    if (details_user_permission(props.current_user)) {
                        return (
                            <MuiListItem key={key}
                                style={{color: blue}}
                                insetChildren={true}
                                primaryText={user.name}
                                href={`/user/${user.id}`} />
                        )
                    } else {
                        return (
                            <MuiListItem key={key}
                                style={{color: black}}
                                insetChildren={true}
                                primaryText={user.name} />
                        )
                    }
                })}
            </MuiList>
    </Header>
)

Users.getInitialProps = async function(context) {
    const current_user = await return_current_user(context)
    const has_permission = list_user_permission(current_user)

    if (!has_permission) {
        if (context.res) {
            context.res.writeHead(301, {
            Location: '/'
        })
            context.res.end()
            context.res.finished = true
        } else {
            Router.replace('/')
        }
    } else {
        const users_blob = await fetch('http://localhost:8000/api/profile/', {
            method: 'GET',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            }
        })
        const users = await users_blob.json()
        return {
            users,
            current_user,
        }
    }
}
export default Users
