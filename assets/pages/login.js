import Header from '../components/Head'
import { return_current_user } from '../services/current_user.js'

const Login = (props) => (
    <Header current_user={props.current_user}>
        <h4>Login</h4>
        <form id="login_form" name="login_form" action="/login" method="post">
            <label id="name" htmlFor="name">Name: </label>
            <input type="text" name="name" required></input><br/><br/>

            <label id="password" htmlFor="password">password: </label>
            <input type="password" name="password" required></input><br/><br/>

            <input type="submit" name="submit" value="Login"></input><br/><br/>
        </form>
    </Header>
)

Login.getInitialProps = async function(context) {
		return { current_user: await return_current_user(context)}
}

export default Login
