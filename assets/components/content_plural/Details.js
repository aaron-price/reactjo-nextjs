import PropTypes from 'prop-types'

export const Details = (props) => (
    <div>
        <h1>{props.singular_lower.string_method}</h1>
        <ul>
            {Object.keys(props.singular_lower).map((field, key) => {
                let blacklist = ['owner', 'pk', 'owner_name']
                if (blacklist.indexOf(field) !== -1) {
                        return <span key={key}></span>
                    } else {
                        return <li key={key}>{field}: {props.singular_lower[field]}</li>
                    }
            })}
            <li>owner: {props.permissions.owner ? (
                <a href={`/user/${props.singular_lower.owner}`}>
                    {props.singular_lower.owner_name}
                </a>
            ) : (
                <span>{props.singular_lower.owner_name}</span>
            )}
            </li>
        </ul>
    </div>
)

Details.propTypes = {
    singular_lower: PropTypes.object,
    permissions: PropTypes.object,
}

export default Details
