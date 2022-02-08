export default function Input({text, name, handleOnChange, options}){
    return (
        <div class="form-floating mb-3">
            <select name={name} id={name} className="form-control mb-3">
                <option value="">12312312</option>
                {/* {options.map((item) => (
                    <option value={item.id}>{item.name}</option>
                ))} */}
            </select>
            <label htmlFor={name}>{text}</label>
        </div>
    )
}