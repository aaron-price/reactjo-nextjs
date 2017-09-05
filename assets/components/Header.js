import Link from 'next/link'

const linkStyle = {
  marginRight: 15
}

const UserLink = props => (
		<Link as={`/user/${props.id}`} href={`/profile/?id=${props.id}`}>
				<a>Profile {props.id}</a>
		</Link>
)

const UsersLink = props => (
		<Link href="/users">
				<a>Users list</a>
		</Link>
)

const Header = () => (
    <div>
        <Link href="/">
          <a style={linkStyle}>Home</a>
        </Link>
        <UsersLink href="/users">
          <a style={linkStyle}>Users</a>
        </UsersLink>
    </div>
)

export default Header
