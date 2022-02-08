export default function SubmitButton({text}){
    return (
        <div class="form-floating mb-3">
            <button type="submit" className="btn btn-primary">{text}</button>
        </div>
    )
}