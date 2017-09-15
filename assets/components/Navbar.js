import Link from 'next/link'
import fetch from 'isomorphic-unfetch'
import React from 'react'
import RaisedButton from 'material-ui/RaisedButton'
import Router from 'next/router'

// Styles
const linkStyle = {
  marginRight: 15
}

const HomeLink = props => (
		<Link href="/">
				<RaisedButton style={linkStyle}>Home</RaisedButton>
		</Link>
)

// User Auth
const UserLink = props => (
    <Link href={{
          pathname: '/user/',
          asPath: `/user/`,
          query: { id: props.id }
    }}>
				<a style={linkStyle}>Hi, {props.name}!</a>
		</Link>
)

const LoginLink = props => (
		<Link href="/login">
				<RaisedButton style={linkStyle}>Login</RaisedButton>
		</Link>
)
const LogoutLink = props => (
		<RaisedButton style={linkStyle} onClick={() => props.logout()}
    >Logout</RaisedButton>
)

const SignupLink = props => (
		<Link href="/signup">
				<RaisedButton style={linkStyle}>Signup</RaisedButton>
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
                      <RaisedButton style={linkStyle}>{item}</RaisedButton>
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
                <UserLink id={this.state.id} name={this.state.name} />
                <LogoutLink logout={this.logout} />
                <br/><br/>
                <HomeLink />
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
