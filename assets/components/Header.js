import Link from 'next/link'

const linkStyle = {
  marginRight: 15
}

const UserLink = props => (
		<Link as={`/user/${props.id}`} href={`/profile/?id=${props.id}`}>
				<a style={linkStyle}>Profile {props.id}</a>
		</Link>
)

const HomeLink = props => (
		<Link href="/">
				<a style={linkStyle}>Home</a>
		</Link>
)

const UsersLink = props => (
		<Link href="/users">
				<a style={linkStyle}>Users list</a>
		</Link>
)

const LoginLink = props => (
		<Link href="/login">
				<a style={linkStyle}>Login</a>
		</Link>
)

const Header = () => (
    <div>
        <HomeLink />
        {/*<UserLink />*/}
        <UsersLink />
        <LoginLink />
    </div>
)

export default Header
