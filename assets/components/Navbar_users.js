import { list_user_permission } from '../services/permissions.js'
import Link from 'next/link'
import fetch from 'isomorphic-unfetch'
import React from 'react'
import RaisedButton from 'material-ui/RaisedButton'
import Paper from 'material-ui/Paper'
import Drawer from 'material-ui/Drawer'
import MenuItem from 'material-ui/MenuItem'
import Router from 'next/router'
import isMobile from 'ismobilejs'
import { Navbar, Nav, NavItem } from 'reactstrap'

// Styles
let link_style = {
    marginRight: 15,
    minHeight: 15,
    color: '#000000',
    fontWeight: '300',
}

// Home
const HomeLink = (props) => {
    if (props.isMobile) {
        return (<MenuItem href='/'>Home</MenuItem>)
    } else {
        return (<RaisedButton style={link_style} label="Home" href="/" />)
    }
}

// User Auth
const UserLink = props => {
    if (props.authenticated) {
        if (props.isMobile) {
            return (
                <Link as={`/user/${props.current_user.id}`} href={`/user/?id=${props.current_user.id}`}>
                    <a style={link_style}>{props.current_user.name}</a>
                </Link>
            )
        } else {
            return (
                <RaisedButton style={link_style} label={props.current_user.name} href={`/user/${props.current_user.id}`}/>
            )
        }
    } else {
      return <span></span>
    }
}

const LoginLink = props => {
    if (!props.authenticated) {
        if (props.isMobile) {
            return (
                <MenuItem href='/login' style={link_style}>Login</MenuItem>
            )
        } else {
            return (
    				    <RaisedButton href='/login' label='login' style={link_style} />
            )
        }

    } else {
      return <span></span>
    }
}
const LogoutLink = props => {
    if (props.authenticated) {
        if (!props.isMobile) {
            return (
                <RaisedButton
                    style={link_style}
                    label='Logout'
                    onClick={() => props.logout()} />
            )
        } else {
            return (
                <MenuItem
                  onClick={() => props.logout()}
                  style={link_style}>Logout</MenuItem>
            )
        }
    } else {
      return <span></span>
    }
}


const SignupLink = props => {
    if (!props.authenticated) {
        if (props.isMobile) {
            return (
                <MenuItem href="/signup" style={link_style}>Signup</MenuItem>
            )
        } else {
            return (
                <RaisedButton href="/signup" style={link_style} label='Signup'/>
            )
        }

    } else {
      return <span></span>
    }
}

// Content
const content_types = [
    {title: 'Users', permissions: list_user_permission},
]
const ContentLinks = (props) => (
    <ul className="navbar-nav mr-auto">
        { content_types.map((item, key) => {
          let has_permission = true
          if ('permissions' in item) {
              has_permission = item.permissions(props.current_user)
          }
          if (has_permission) {
              const lower = item.title.toLowerCase()
              if (props.isMobile) {
                  return (
                      <li key={key}>
                          <MenuItem
                              href={`/${lower}`}
                              style={link_style}
                              >{item.title}</MenuItem>
                      </li>
                  )
              } else {
                  return (
                      <li key={key}>
                          <RaisedButton
                              href={`/${lower}`}
                              style={link_style}
                              label={item.title} />
                      </li>
                  )
              }
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
            mobile_determined: false,
            isMobile: true
        }
        this.update_user = this.update_user.bind(this)
        this.logout = this.logout.bind(this)
        this.toggle = this.toggle.bind(this)
        this.check_mobile = this.check_mobile.bind(this)
    }
    check_mobile() {
        this.setState({
            isMobile: isMobile.any || window.innerWidth < 960
        })
    }
    componentDidMount() {
        this.check_mobile()
        this.setState({ mobile_determined: true })
        window.addEventListener('resize', this.check_mobile)
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
        fetch('/logout', {
            method: 'POST',
            credentials: 'include'
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
        if (!this.state.mobile_determined) {
            return <div style={{backgroundColor:'#0097A7', minHeight: '3.5em'}}></div>
        } else {
            return (
              <div style={{backgroundColor:'#0097A7', minHeight: '3.5em'}}>
                  <MobileMenubar
                      current_user={this.props.current_user}
                      toggle={this.toggle}
                      isOpen={this.state.isOpen}
                      logout={this.logout}
                      authenticated={authenticated}
                      isMobile={this.state.isMobile} />
                  <DesktopMenubar
                      current_user={this.props.current_user}
                      authenticated={authenticated}
                      logout={this.logout}
                      isMobile={this.state.isMobile} />
              </div>
            )
        }
    }
}

const menu_button_style = {
    display: 'flex',
    justifyContent: 'center'
}
const MobileMenubar = (props) => {
    if (props.isMobile) {
        return (
          <div>
              <Navbar style={menu_button_style} toggleable>
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
                      secondary={true}
                      label='Close (X)'
                      style={link_style}
                      onClick={props.toggle} />
                  <HomeLink isMobile={props.isMobile} />
                  <UserLink
                      current_user={props.current_user}
                      authenticated={props.authenticated}
                      isMobile={props.isMobile} />
                  <LoginLink
                      authenticated={props.authenticated}
                      isMobile={props.isMobile} />
                  <LogoutLink
                      logout={props.logout}
                      authenticated={props.authenticated}
                      isMobile={props.isMobile} />
                  <SignupLink
                      authenticated={props.authenticated}
                      isMobile={props.isMobile} />
                  <ContentLinks
                      isMobile={props.isMobile} />
              </Drawer>
          </div>
        )
    } else {
        return (<span></span>)
    }
}
const DesktopMenubar = (props) => {
    if (!props.isMobile) {
        return (
            <div>
                <Navbar toggleable>
                    <Nav className='ml-auto' navbar>
                        <NavItem>
                            <HomeLink />
                        </NavItem>
                        <NavItem>
                            <UserLink
                                current_user={props.current_user}
                                authenticated={props.authenticated}
                                isMobile={props.isMobile}/>
                        </NavItem>
                        <NavItem>
                            <LoginLink
                                authenticated={props.authenticated}
                                isMobile={props.isMobile}/>
                        </NavItem>
                        <NavItem>
                            <LogoutLink
                                logout={props.logout}
                                authenticated={props.authenticated}
                                isMobile={props.isMobile}/>
                        </NavItem>
                        <NavItem>
                            <SignupLink
                                authenticated={props.authenticated}
                                isMobile={props.isMobile}/>
                        </NavItem>
                        <NavItem>
                            <ContentLinks />
                        </NavItem>
                    </Nav>
                </Navbar>
            </div>
        )
    } else {
        return (<span></span>)
    }
}

export default NavContainer
