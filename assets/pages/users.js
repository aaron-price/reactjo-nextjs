import fetch from 'isomorphic-unfetch'
import Link from 'next/link'
import Header from '../components/Head'
import { Button } from 'reactstrap'

const Users = (props) => (
    <Header>
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
Users.getInitialProps = async function() {
    const res = await fetch('http://localhost:8000/api/profile/', {
        method: 'GET',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        }
    })
    const data = await res.json()
    return {
        users: data
    }
}

export default Users
