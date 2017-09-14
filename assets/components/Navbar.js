import Link from 'next/link'
import fetch from 'isomorphic-unfetch'
import React from 'react'
import RaisedButton from 'material-ui/RaisedButton'

const linkStyle = {
  marginRight: 15
}

const UserLink = props => (
    <Link as={`/user/${props.id}`} href={`/profile/?id=${props.id}`}>
				<a style={linkStyle}>Hi, {props.name}!</a>
		</Link>
)

const HomeLink = props => (
		<Link href="/">
				<a style={linkStyle}>Home</a>
		</Link>
)

const UsersLink = props => (
		<Link href="/users">
				<a style={linkStyle}>Users list</a>
		</Link>
)

const LoginLink = props => (
		<Link href="/login">
				<a style={linkStyle}>Login</a>
		</Link>
)

const SignupLink = props => (
		<Link href="/signup">
				<a style={linkStyle}>Signup</a>
		</Link>
)

class Navbar extends React.Component {
    constructor(props){
        super(props)
        this.state = {
            name: this.props.user.name,
            id: this.props.user.id
        }
        this.update_user = this.update_user.bind(this)
        this.logout = this.logout.bind(this)
    }
    update_user(user) {
        this.setState({
            name: user.name,
            id: user.id
        })
    }
    who_am_i(resolve) {
        fetch('me', {
            method: 'GET',
            credentials: 'include'
        })
        .then(blob => blob.json())
        .then(data => resolve(data))
        .catch(e => console.error(e))
    }
    logout(resolve) {
        fetch('logout', {
            method: 'POST',
            credentials: 'include'
        })
        .then(data => this.who_am_i(resolve))
        .catch(e => console.error(e))
    }
    componentDidMount() {
        this.who_am_i(this.update_user)
    }
    render() {
        return this.state.id
        ? (
          <div>
              <UserLink id={this.state.id} name={this.state.name} />
              <RaisedButton
                  onClick={() => this.logout(this.update_user)}
                  label="Logout">
              </RaisedButton>
              <br/><br/>
              <HomeLink />
              <UsersLink />
          </div>
        ) : (
          <div>
              <HomeLink />
              <UsersLink />
              <LoginLink />
              <SignupLink />
          </div>
        )
    }
}

export default Navbar
