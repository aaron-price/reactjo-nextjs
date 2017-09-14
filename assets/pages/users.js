import fetch from 'isomorphic-unfetch'
import Link from 'next/link'
import Header from '../components/Head'
import { Button } from 'reactstrap'
import { return_current_user } from '../services/current_user.js'

const Users = (props) => (
    <Header current_user={props.current_user}>
        <h1>Users</h1>
            <ul>
                {props.users.map((user, key) => (
                    <li key={key}><Link as={`/user/${user.id}`} href={`/user/?id=${user.id}`}>
                        <a>{user.name}</a>
                    </Link></li>
                ))}
            </ul>
    </Header>
)

Users.getInitialProps = async function(context) {
    const users_blob = await fetch('http://localhost:8000/api/profile/', {
        method: 'GET',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        }
    })
    const users = await users_blob.json()
    const current_user = await return_current_user(context)
    return {
        users,
        current_user: await return_current_user(context)
    }
}
export default Users
