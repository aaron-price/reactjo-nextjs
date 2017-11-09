import fetch from 'isomorphic-unfetch'
import Link from 'next/link'
import React from 'react'
import Router from 'next/router'
import PropTypes from 'prop-types'

import Drawer from 'material-ui/Drawer'
import MenuItem from 'material-ui/MenuItem'
import { Navbar, Nav, NavItem } from 'reactstrap'
import Paper from 'material-ui/Paper'
import RaisedButton from 'material-ui/RaisedButton'

import {
    create_user_permission,
    list_user_permission,
    details_user_permission,
    update_user_permission,
    delete_user_permission } from '../services/permissions.js'

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
    let current_user = props.current_user
    let profile = { owner: current_user.id }

    let details_perm = details_user_permission(current_user, profile)
    let update_perm = update_user_permission(current_user, profile)
    let delete_perm = delete_user_permission(current_user, profile)
    let has_permission = (details_perm || update_perm || delete_perm)

    if (has_permission && props.authenticated) {
        return (
            <MenuItem href={`/user/${props.current_user.id}`}>
                    {props.current_user.name}
            </MenuItem>
        )
    } else {
      return <span></span>
    }
}
UserLinkMobile.propTypes = {
    current_user: PropTypes.object,
    authenticated: PropTypes.bool,
}

const UserLinkDesktop = props => {
    let current_user = props.current_user
    let profile = { owner: current_user.id }

    let details_perm = details_user_permission(current_user, profile)
    let update_perm = update_user_permission(current_user, profile)
    let delete_perm = delete_user_permission(current_user, profile)
    let has_permission = (details_perm || update_perm || delete_perm)

    if (has_permission && props.authenticated) {
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
UserLinkDesktop.propTypes = {
    current_user: PropTypes.object,
    authenticated: PropTypes.bool,
}

const LoginLinkMobile = props => {
    if (!props.authenticated) {
        return <MenuItem href='/login' className='menubar__button--link'>Login</MenuItem>
    } else {
      return <span></span>
    }
}
LoginLinkMobile.propTypes = {
    authenticated: PropTypes.bool
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
LoginLinkDesktop.propTypes = {
    authenticated: PropTypes.bool
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
LogoutLinkMobile.propTypes = {
    authenticated: PropTypes.bool,
    logout: PropTypes.func,
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
LogoutLinkDesktop.propTypes = {
    authenticated: PropTypes.bool,
    logout: PropTypes.func,
}

const SignupLinkMobile = props => {
    if (create_user_permission(props.current_user)) {
        return (
            <MenuItem href="/signup" className='menubar__button--link'>Signup</MenuItem>
        )
    } else {
      return <span></span>
    }
}
SignupLinkMobile.propTypes = {
    current_user: PropTypes.object,
}

const SignupLinkDesktop = props => {
    if (create_user_permission(props.current_user)) {
        return (
            <RaisedButton href="/signup" className='menubar__button--link' label='Signup'/>
        )
    } else {
      return <span></span>
    }
}
SignupLinkDesktop.propTypes = {
    current_user: PropTypes.object,
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
ContentLinksMobile.propTypes = {
    current_user: PropTypes.object,
}
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
ContentLinksDesktop.propTypes = {
    current_user: PropTypes.object,
}

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
        fetch('/logout', {
            method: 'POST',
            credentials: 'include',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
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
NavContainer.propTypes = {
    current_user: PropTypes.object,
}

const MobileMenubar = (props) => {
    let style = props.isOpen ? {} : {display: 'none'}
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
          <Drawer style={style} open={props.isOpen}>
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
                  current_user={props.current_user} />
              <ContentLinksMobile current_user={props.current_user} />
          </Drawer>
      </div>
    )
}
MobileMenubar.propTypes = {
    authenticated: PropTypes.bool,
    current_user: PropTypes.object,
    isOpen: PropTypes.bool,
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
                            current_user={props.current_user} />
                    </NavItem>
                    <NavItem>
                        <ContentLinksDesktop current_user={props.current_user} />
                    </NavItem>
                </Nav>
            </Navbar>
        </div>
    )
}
DesktopMenubar.propTypes = {
    authenticated: PropTypes.bool,
    current_user: PropTypes.object,
}

export default NavContainer
