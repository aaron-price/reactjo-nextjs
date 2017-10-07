const Details = (props) => (
    <div>
        <h1>{props.singular_lower.string_method}</h1>
        <ul>
            {Object.keys(props.singular_lower).map((field, key) => {
              let blacklist = ['pk']
              if (blacklist.indexOf(field) !== -1) {
                    return <span key={key}></span>
                } else {
                    return <li key={key}>{field}: {props.singular_lower[field]}</li>
                }
            })}
        </ul>
    </div>
)

module.exports = { Details }
