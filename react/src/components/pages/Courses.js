import Input from "../layout/Input";

export default function Courses() {
  return (
    <div>
      <Input
        type="text"
        id="name"
        name="name"
        placeholder="Nome da categoria"
        text="Nome da categoria"
      />

    <Input
        type="text"
        id="price"
        name="price"
        placeholder="Preço"
        text="Preço"
      />

    <Input
        type="text"
        id="description"
        name="description"
        placeholder="Descrição"
        text="Descrição"
      />
      <button>Entrar</button>
    </div>
  );
}
