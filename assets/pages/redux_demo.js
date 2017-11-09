import Link from 'next/link'
import 'isomorphic-fetch'
import React, { Component } from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import withRedux from 'next-redux-wrapper'
import PropTypes from 'prop-types'

import Header from '../components/Head.js'
import ReduxDemoComponent from '../components/ReduxDemo.js'

import { initStore, addCount } from '../redux/store'
import { return_current_user } from '../services/current_user.js'

export const redux_demo = props => (
    <Header current_user={props.current_user}>
        <h1>Redux demo</h1>
        <p>Based on the with-redux example for next.js
            <a href='https://github.com/zeit/next.js/tree/master/examples/with-redux'>
                &nbsp;here
            </a>
        </p>
        <ReduxDemoComponent />
    </Header>
)

redux_demo.getInitialProps = async function(context) {
    return {
        current_user: await return_current_user(context),
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        addCount: bindActionCreators(addCount, dispatch),
    }
}

redux_demo.propTypes = {
    addCount: PropTypes.func,
    current_user: PropTypes.object,
}

export default withRedux(initStore, mapDispatchToProps)(redux_demo)