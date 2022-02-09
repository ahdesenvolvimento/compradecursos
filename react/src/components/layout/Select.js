export default function Input({text, name, handleOnChange, options}){
    return (
        <div class="form-floating mb-3">
            <select name={name} id={name} onChange={handleOnChange} className="form-control mb-3">
                <option value="">Selecione a categoria</option>
                {options.map((item) => (
                    <option value={item.id} key={item.id}>{item.name}</option>
                ))}
            </select>
            <label htmlFor={name}>{text}</label>
        </div>
    )
}