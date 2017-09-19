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

// Content
const content_types = []
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

const Navbar = (props) => (
    <div>
        <HomeLink />
        <ContentLinks />
    </div>
)

export default Navbar
