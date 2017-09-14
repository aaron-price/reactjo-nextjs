import fetch from 'isomorphic-unfetch'
import Link from 'next/link'
import Header from '../components/Head'
import { Button } from 'reactstrap'
import { return_current_user } from '../services/current_user.js'

const plural_upper = (props) => (
    <Header current_user={props.current_user}>
        <h1>plural_upper</h1>
            <ul>
                {props.plural_lower.map((singular_lower, key) => (
                    <li key={key}><Link as={`/singular_lower/${singular_lower.pk}`} href={`/singular_lower/?id=${singular_lower.pk}`}>
                        <a>{singular_lower.string_method}</a>
                    </Link></li>
                ))}
            </ul>
    </Header>
)
plural_upper.getInitialProps = async function(context) {
    const res = await fetch('http://localhost:8000/api/singular_lower/', {
        method: 'GET',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        }
    })
    const data = await res.json()
    return {
        plural_lower: data,
        current_user: await return_current_user(context)
    }
}

export default plural_upper
