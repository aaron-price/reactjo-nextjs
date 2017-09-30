export default (props) => (
    <div>
        <h1>{props.profile.name}</h1>
        {Object.keys(props.form_fields).map((f, key) => {
            return f === 'name'
                ? <span key={key}></span>
                : <p key={key}>{f}: {props.profile[f]}</p>
        })}
    </div>
)
