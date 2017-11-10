import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import PropTypes from 'prop-types'
import { addCount } from '../redux/store'
import RaisedButton from 'material-ui/RaisedButton'

export const ReduxDemoComponent = (props) => (
    <RaisedButton
        label={props.count === 0 ? 'click me' : props.count}
        onClick={() => props.addCount()} />
)

const mapStateToProps = ({ count }) => ({ count })

const mapDispatchToProps = (dispatch) => {
  return {
    addCount: bindActionCreators(addCount, dispatch)
  }
}

ReduxDemoComponent.propTypes = {
    count: PropTypes.number,
    addCount: PropTypes.func,
}

export default connect(mapStateToProps, mapDispatchToProps)(ReduxDemoComponent)