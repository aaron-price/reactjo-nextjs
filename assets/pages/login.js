import Layout from '../components/Layout.js'

const login = (props) => (
    <Layout>
        <h4>Login</h4>
        <form id="login_form" name="login_form" action="/login" method="post">
            <label id="name" htmlFor="name">Name: </label>
            <input type="text" name="name" required></input><br/><br/>

            <label id="password" htmlFor="password">password: </label>
            <input type="password" name="password" required></input><br/><br/>

            <input type="submit" name="submit" value="Login"></input><br/><br/>
        </form>
    </Layout>
)

export default login
