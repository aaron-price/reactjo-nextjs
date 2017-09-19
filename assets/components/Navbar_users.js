import Link from 'next/link'
import fetch from 'isomorphic-unfetch'
import React from 'react'
import FlatButton from 'material-ui/FlatButton'
import Router from 'next/router'

// Styles
const linkStyle = {
  marginRight: 15
}

const HomeLink = props => (
		<Link href="/">
				<FlatButton primary={true} style={linkStyle}>Home</FlatButton>
		</Link>
)

// User Auth
const UserLink = props => (
    <Link as={`/user/${props.id}`} href={`/user/?id=${props.id}`}>
				<FlatButton primary={true} style={linkStyle}>Hi, {props.name}!</FlatButton>
		</Link>
)

const LoginLink = props => (
		<Link href="/login">
				<FlatButton primary={true} style={linkStyle}>Login</FlatButton>
		</Link>
)
const LogoutLink = props => (
		<FlatButton secondary={true} style={linkStyle} onClick={() => props.logout()}
    >Logout</FlatButton>
)

const SignupLink = props => (
		<Link href="/signup">
				<FlatButton primary={true} style={linkStyle}>Signup</FlatButton>
		</Link>
)

// Content
const content_types = [
    'Users',
]
const ContentLinks = props => {
    return (
      <span>
          {content_types.map((item, key) => {
              const lower = item.toLowerCase()
              return (
                  <Link key={key} href={`/${lower}`}>
                      <FlatButton primary={true} style={linkStyle}>{item}</FlatButton>
                  </Link>
              )
          })}
      </span>
    )
}

class Navbar extends React.Component {
    constructor(props){
        super(props)
        this.state = {
            name: this.props.current_user.name,
            id: this.props.current_user.id
        }
        this.update_user = this.update_user.bind(this)
        this.logout = this.logout.bind(this)
    }
    update_user(current_user) {
        this.setState({
            name: current_user.name,
            id: current_user.id
        })
    }
    logout() {
        fetch('/logout', {
            method: 'POST',
            credentials: 'include'
        })
        .then(data => {
            this.update_user({ id: null, name: null })
            Router.push({pathname: '/', as: '/'})
        })
        .catch(e => console.error(e))
    }
    render() {
        return this.state.id && this.state.name
        ? (
            <div>
                <HomeLink />
                <UserLink id={this.state.id} name={this.state.name} />
                <LogoutLink logout={this.logout} />
                <ContentLinks />
            </div>
        ) : (
            <div>
                <HomeLink />
                <LoginLink />
                <SignupLink />
                <ContentLinks />
            </div>
        )
    }
}

export default Navbar
