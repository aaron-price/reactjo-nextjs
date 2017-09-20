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

// Content
const content_types = []
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

let close_styles = {}
class NavContainer extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            isOpen: false,
            mobile_determined: false,
            isMobile: true
        }
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
    render() {
        let authenticated = !!this.state.id && !!this.state.name
        if (!this.state.mobile_determined) {
            return <div style={{backgroundColor:'#0097A7', minHeight: '3.5em'}}></div>
        } else {
            return (
                <div style={{backgroundColor:'#0097A7', minHeight: '3.5em'}}>
                    <MobileMenubar
                        toggle={this.toggle}
                        isOpen={this.state.isOpen}
                        isMobile={this.state.isMobile} />
                    <DesktopMenubar isMobile={this.state.isMobile} />
                </div>
            )
        }
    }
}

const MobileMenubar = (props) => {
    if (props.isMobile) {
        return (
          <div>
              <Navbar toggleable>
                  <Nav className='ml-auto' navbar>
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
                  <ContentLinks isMobile={props.isMobile} />
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
