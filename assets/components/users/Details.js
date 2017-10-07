export default (props) => (
    <div>
        <h1>{props.profile.name}</h1>
        {Object.keys(props.form_fields).map((f, key) => {
            let blacklist = ['name', 'password']
            if (blacklist.indexOf(field) !== -1) {
                return <span key={key}></span>
            } else {
                return <p key={key}>{f}: {props.profile[f]}</p>
            }
        })}
    </div>
)
