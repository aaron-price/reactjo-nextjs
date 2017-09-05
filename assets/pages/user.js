import Layout from '../components/Layout.js'
import fetch from 'isomorphic-unfetch'
import Link from 'next/link'

const User = (props) => (
    <Layout>
        <h1>User</h1>
        <p>{props.user.id} - {props.user.name}</p>
        <p>{props.user.email}</p>
    </Layout>
)
User.getInitialProps = async function(context) {
    const { id } = context.query
    const res = await fetch(`http://localhost:8000/api/profile/${id}`, {
        method: 'GET',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        }
    })
    const data = await res.json()
    return {
        user: data
    }
}

export default User
