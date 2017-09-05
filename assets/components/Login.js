export default props => (
    <div>
        <form id="login_form" name="login_form" action="/login/" method="post">
            <label id="name" htmlFor="name">Name</label>
            <input type="text" name="name" required></input><br/>

            <label id="password" htmlFor="password">password</label>
            <input type="password" name="password" required></input><br/>

            <input type="submit" name="submit" value="Login"></input>
        </form>
    </div>

)
