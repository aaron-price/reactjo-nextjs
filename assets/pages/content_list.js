import fetch from 'isomorphic-unfetch'
import Link from 'next/link'
import Header from '../components/Head'
import { Button } from 'reactstrap'

const plural_upper = (props) => (
    <Header>
        <h1>plural_upper</h1>
            <ul>
                {props.plural_lower.map((singular_lower, key) => (
                    <li key={key}><Link as={`/singular_lower/${singular_lower.id}`} href={`/singular_lower/?id=${singular_lower.id}`}>
                        <a>{singular_lower.str_method}</a>
                    </Link></li>
                ))}
            </ul>
    </Header>
)
plural_upper.getInitialProps = async function() {
    const res = await fetch('http://localhost:8000/api/plural_lower/', {
        method: 'GET',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        }
    })
    const data = await res.json()
    console.log(data)
    return {
        plural_lower: data
    }
}

export default plural_upper
