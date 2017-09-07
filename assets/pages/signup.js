import Layout from '../components/Layout.js'

const signup = (props) => (
    <Layout>
        <h4>Signup</h4>
        <form id="signup_form" name="signup_form" action="/signup" method="post">
            <label id="name" htmlFor="name">Name: </label>
            <input type="text" name="name" required></input><br/><br/>

            <label id="email" htmlFor="email">Email: </label>
            <input type="email" name="email" required></input><br/><br/>

            <label id="password" htmlFor="password">password: </label>
            <input type="password" name="password" required></input><br/><br/>

            <input type="submit" name="submit" value="Signup"></input><br/><br/>
        </form>
    </Layout>
)

export default signup
