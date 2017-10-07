const Details = (props) => (
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
            <li>owner:
                <a href={`/user/${props.singular_lower.owner}`}>
                    &nbsp;{props.singular_lower.owner_name}
                </a>
            </li>
        </ul>
    </div>
)

module.exports = { Details }
