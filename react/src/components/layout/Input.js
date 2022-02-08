export default function Input({text, name, type, handleOnChange, placeholder}){
    return (
        <div class="form-floating mb-3">
            <input type={type} className="form-control" id={name} name={name} onChange={handleOnChange} placeholder={placeholder} />
            <label htmlFor={name}>{text}</label>
        </div>
    )
}