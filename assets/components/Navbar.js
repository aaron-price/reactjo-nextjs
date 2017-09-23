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
                label="Home"
                href="/" />
}

// Content
const content_types = []

const ContentLinksMobile = (props) => (
    <ul className="navbar-nav mr-auto">
        { content_types.map((item, key) => {
          let has_permission = true

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
              const lower = item.title.toLowerCase()
              return (
                  <li key={key}>
                      <RaisedButton
                          href={`/${lower}`}
                          className='menubar__button--link'
                          label={item.title} />
                  </li>
              )
        )}
    </ul>
)

class NavContainer extends React.Component {
    constructor(props) {
        super(props)
        this.state = { isOpen: false }
    }

    toggle() {
        this.setState({
            isOpen: !this.state.isOpen
        });
    }

    render() {
        return (
          <div className='menubar--wrapper'>
              <MobileMenubar
                  toggle={this.toggle}
                  isOpen={this.state.isOpen} />
              <DesktopMenubar />
          </div>
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
                  secondary={true}
                  label='Close (X)'
                  className='menubar__button--link'
                  onClick={props.toggle} />
              <HomeLinkMobile />
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
                        <ContentLinksDesktop />
                    </NavItem>
                </Nav>
            </Navbar>
        </div>
    )
}

export default NavContainer
