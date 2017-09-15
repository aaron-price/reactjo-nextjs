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

// Content
const content_types = []
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

const Navbar = (props) => (
    <div>
        <HomeLink />
        <ContentLinks />
    </div>
)

export default Navbar
