import Layout from '../components/Layout.js'
import fetch from 'isomorphic-unfetch'
import Link from 'next/link'

const Users = (props) => (
    <Layout>
        <h1>Users</h1>
          {props.users.map((user, key) => (
              <Link as={`/user/${user.id}`} href={`/user/?id=${user.id}`} key={key}>
                  <a>{user.name}</a>
              </Link>
          ))}
    </Layout>
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
