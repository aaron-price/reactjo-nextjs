import React from 'react'
import PropTypes from 'prop-types'

const Details = (props) => (
    <div>
        <h1>{props.profile.name}</h1>
        {Object.keys(props.form_fields).map((f, key) => {
            let blacklist = ['name', 'password']
            if (blacklist.indexOf(f) !== -1) {
                return <span key={key}></span>
            } else {
                return (
                    <p
                        key={key}
                        className={`user_crud__details_${f}`}>
                        {f}: {props.profile[f]}
                    </p>
                )
            }
        })}
    </div>
)

Details.propTypes = {
    profile: PropTypes.object,
    form_fields: PropTypes.object,
}

module.exports = { Details }
