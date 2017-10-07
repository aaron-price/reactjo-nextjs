const Details = (props) => (
    <div>
        <h1>{props.singular_lower.string_method}</h1>
        <ul>
            {Object.keys(props.singular_lower).map((field, key) => {
                if (field === 'owner' || field === 'pk') {
                    return <span></span>
                } else {
                    return <li key={key}>{field}: {props.singular_lower[field]}</li>
                }
            })}
            <li>owner:
                <a href={`/user/${props.singular_lower.owner}`}>
                    {props.singular_lower.owner_name}
                </a>
            </li>
        </ul>
    </div>
)

module.exports = { Details }
