import Input from "../layout/Input";

export default function Categories() {
  return (
    <div>
      <Input
        type="text"
        id="name"
        name="name"
        placeholder="Nome da categoria"
        text="Nome da categoria"
      />
      <button>Entrar</button>
    </div>
  );
}
