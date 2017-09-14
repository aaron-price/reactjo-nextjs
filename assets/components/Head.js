import Head from 'next/head'
import Navbar from './Navbar.js'
import injectTapEventPlugin from 'react-tap-event-plugin'
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider'
import getMuiTheme from 'material-ui/styles/getMuiTheme'
import global_styles from '../styles/styles.js'

try { injectTapEventPlugin() } catch(e) {}
const muiTheme = getMuiTheme({ userAgent: false })

export default (props) => (
    <MuiThemeProvider muiTheme={muiTheme}>
        <div style={global_styles}>
            <Head>
                <title>Reactjo!</title>
                <link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/4.0.0-beta/css/bootstrap.min.css" integrity="sha384-/Y6pD6FV/Vv2HJnA6t+vslU6fwYXjCFtcEpHbNJ0lyAFsXTsjBbfaDjzALeQsN6M" crossOrigin="anonymous"/>
            </Head>
                <Navbar current_user={props.current_user} /><br />
                {props.children}
        </div>
    </MuiThemeProvider>
)
