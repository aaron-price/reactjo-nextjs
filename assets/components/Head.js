import Head from 'next/head'
import Navbar from './Navbar.js'
import injectTapEventPlugin from 'react-tap-event-plugin'
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider'
import getMuiTheme from 'material-ui/styles/getMuiTheme'
import Paper from 'material-ui/Paper'
import stylesheet from 'styles/index.scss'
import PropTypes from 'prop-types'
try { injectTapEventPlugin() } catch(e) {}
const muiTheme = getMuiTheme({ userAgent: false })

export const Header = (props) => (
    <MuiThemeProvider muiTheme={muiTheme}>
        <div>
            <Head>
                <title>Reactjo!</title>
                <link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/4.0.0-alpha.6/css/bootstrap.min.css" integrity="sha384-rwoIResjU2yc3z8GV/NPeZWAv56rSmLldC3R/AZzGRnGxQQKnKkoFVhFQhNUwEyJ" crossOrigin="anonymous"/>
                <meta name="viewport" content="width=device-width, initial-scale=1" />
                <meta name="description" content={ props.description || 'Portfolio website of a front-leaning web developer. Javascript and React abound'} />
            </Head>
            <style dangerouslySetInnerHTML={{ __html: stylesheet }} />

            <div className='body'>
                <Navbar
                    className='body_top'
                    current_user={props.current_user} />
                <Paper className='body_middle'>
                    {props.children}
                </Paper>
                <Footer />
            </div>
        </div>
    </MuiThemeProvider>
)

Header.propTypes = {
    current_user: PropTypes.object,
    description: PropTypes.string
}

const Footer = (props) => (
    <footer>
        <script src="https://code.jquery.com/jquery-3.1.1.slim.min.js" integrity="sha384-A7FZj7v+d/sdmMqp/nOQwliLvUsJfDHW+k9Omg/a/EheAdgtzNs3hpfag6Ed950n" crossOrigin="anonymous"></script>
        <script src="https://cdnjs.cloudflare.com/ajax/libs/tether/1.4.0/js/tether.min.js" integrity="sha384-DztdAPBWPRXSA/3eYEEUWrWCy7G5KFbe8fFjk5JAIxUYHKkDx6Qin1DkWx51bBrb" crossOrigin="anonymous"></script>
        <script src="https://maxcdn.bootstrapcdn.com/bootstrap/4.0.0-alpha.6/js/bootstrap.min.js" integrity="sha384-vBWWzlZJ8ea9aCX4pEW3rVHjgjt7zpkNpZk+02D9phzyeVkE+jo0ieGizqPLForn" crossOrigin="anonymous"></script>
    </footer>
)

export default Header