import { list_user_permission } from '../services/permissions.js'
import Link from 'next/link'
import fetch from 'isomorphic-unfetch'
import React from 'react'
import RaisedButton from 'material-ui/RaisedButton'
import Paper from 'material-ui/Paper'
import Drawer from 'material-ui/Drawer'
import MenuItem from 'material-ui/MenuItem'
import Router from 'next/router'
import { Navbar, Nav, NavItem } from 'reactstrap'

// Home
const HomeLinkMobile = (props) => {
    return <MenuItem className='homelink--mobile' href='/'>Home</MenuItem>
}
const HomeLinkDesktop = (props) => {
    return <RaisedButton
                className='homelink--desktop menubar__button--link'
                label='Home'
                href='/' />
}

// User Auth
const UserLinkMobile = props => {
    if (props.authenticated) {
        return (
            <Link
                as={`/user/${props.current_user.id}`}
                href={`/user/?id=${props.current_user.id}`}>
                <a className='menubar__button--link userlink--mobile'>
                    {props.current_user.name}
                </a>
            </Link>
        )
    } else {
      return <span></span>
    }
}
const UserLinkDesktop = props => {
    if (props.authenticated) {
        return (
            <RaisedButton
                className='menubar__button--link userlink--desktop'
                label={props.current_user.name}
                href={`/user/${props.current_user.id}`}/>
        )
    } else {
      return <span></span>
    }
}

const LoginLinkMobile = props => {
    if (!props.authenticated) {
        return <MenuItem href='/login' className='menubar__button--link'>Login</MenuItem>
    } else {
      return <span></span>
    }
}
const LoginLinkDesktop = props => {
    if (!props.authenticated) {
        return (
				    <RaisedButton
                href='/login'
                label='login'
                className='menubar__button--link' />
        )
    } else {
      return <span></span>
    }
}

const LogoutLinkMobile = props => {
    if (props.authenticated) {
        return (
            <MenuItem
              onClick={() => props.logout()}
              className='menubar__button--link'>Logout</MenuItem>
        )
    } else {
      return <span></span>
    }
}
const LogoutLinkDesktop = props => {
    if (props.authenticated) {
        return (
            <RaisedButton
                className='menubar__button--link'
                label='Logout'
                onClick={() => props.logout()} />
        )
    } else {
      return <span></span>
    }
}


const SignupLinkMobile = props => {
    if (!props.authenticated) {
        return (
            <MenuItem href="/signup" className='menubar__button--link'>Signup</MenuItem>
        )
    } else {
      return <span></span>
    }
}
const SignupLinkDesktop = props => {
    if (!props.authenticated) {
        return (
            <RaisedButton href="/signup" className='menubar__button--link' label='Signup'/>
        )
    } else {
      return <span></span>
    }
}

// Content
const content_types = [
    {title: 'Users', permissions: list_user_permission},
]

const ContentLinksMobile = (props) => (
    <ul className="navbar-nav mr-auto">
        { content_types.map((item, key) => {
          let has_permission = true
          if ('permissions' in item) {
              has_permission = item.permissions(props.current_user)
          }
          if (has_permission) {
              const lower = item.title.toLowerCase()
                  return (
                      <li key={key}>
                          <MenuItem
                              href={`/${lower}`}
                              className='menubar__button--link'
                              >{item.title}</MenuItem>
                      </li>
                  )
          } else {
            return <span key={key}></span>
          }
        })}
    </ul>
)
const ContentLinksDesktop = (props) => (
    <ul className="navbar-nav mr-auto">
        { content_types.map((item, key) => {
          let has_permission = true
          if ('permissions' in item) {
              has_permission = item.permissions(props.current_user)
          }
          if (has_permission) {
              const lower = item.title.toLowerCase()
              return (
                  <li key={key}>
                      <RaisedButton
                          href={`/${lower}`}
                          className='menubar__button--link'
                          label={item.title} />
                  </li>
              )
          } else {
            return <span key={key}></span>
          }
        })}
    </ul>
)

class NavContainer extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            name: this.props.current_user.name,
            id: this.props.current_user.id,
            isOpen: false,
        }
        this.update_user = this.update_user.bind(this)
        this.logout = this.logout.bind(this)
        this.toggle = this.toggle.bind(this)
    }
    toggle() {
        this.setState({
            isOpen: !this.state.isOpen
        });
    }
    update_user(current_user) {
        this.setState({
            name: current_user.name,
            id: current_user.id
        })
    }
    logout() {
        let body_fields = {_csrf: this.props.csrftoken}
        fetch('/logout', {
            method: 'POST',
            credentials: 'include',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(body_fields)
        })
        .then(data => {
            this.update_user({
                id: null,
                name: null
            })
            this.setState({ id: null, name: null })
            Router.push({pathname: '/', as: '/'})
        })
        .catch(e => console.error(e))
    }
    render() {
        let authenticated = !!this.state.id && !!this.state.name

        return (
          <Paper style={{
              backgroundColor: '#0097A7',
              minHeight: '3.5em' }}
              className='menubar__wrapper'>
              <MobileMenubar
                  current_user={this.props.current_user}
                  toggle={this.toggle}
                  isOpen={this.state.isOpen}
                  logout={this.logout}
                  authenticated={authenticated} />
              <DesktopMenubar
                  current_user={this.props.current_user}
                  authenticated={authenticated}
                  logout={this.logout} />
          </Paper>
        )
    }
}

const MobileMenubar = (props) => {
    return (
      <div className='menubar--mobile'>
          <Navbar className='menubar__button--regular' toggleable>
              <Nav navbar>
                  <NavItem>
                      <RaisedButton
                          label='Menu'
                          onClick={props.toggle} />
                  </NavItem>
              </Nav>
          </Navbar>
          <Drawer open={props.isOpen}>
              <RaisedButton
                  className='menubar__button--link menubar__button--close'
                  onClick={props.toggle}
                  label='Close (X)'
                  secondary={true} />
              <HomeLinkMobile />
              <UserLinkMobile
                  current_user={props.current_user}
                  authenticated={props.authenticated} />
              <LoginLinkMobile
                  authenticated={props.authenticated} />
              <LogoutLinkMobile
                  logout={props.logout}
                  authenticated={props.authenticated} />
              <SignupLinkMobile
                  authenticated={props.authenticated} />
              <ContentLinksMobile />
          </Drawer>
      </div>
    )
}

const DesktopMenubar = (props) => {
    return (
        <div className='menubar--desktop'>
            <Navbar toggleable>
                <Nav className='ml-auto' navbar>
                    <NavItem>
                        <HomeLinkDesktop />
                    </NavItem>
                    <NavItem>
                        <UserLinkDesktop
                            current_user={props.current_user}
                            authenticated={props.authenticated} />
                    </NavItem>
                    <NavItem>
                        <LoginLinkDesktop
                            authenticated={props.authenticated} />
                    </NavItem>
                    <NavItem>
                        <LogoutLinkDesktop
                            logout={props.logout}
                            authenticated={props.authenticated} />
                    </NavItem>
                    <NavItem>
                        <SignupLinkDesktop
                            authenticated={props.authenticated} />
                    </NavItem>
                    <NavItem>
                        <ContentLinksDesktop />
                    </NavItem>
                </Nav>
            </Navbar>
        </div>
    )
}

export default NavContainer
