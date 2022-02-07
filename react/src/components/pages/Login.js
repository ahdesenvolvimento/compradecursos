import Input from "../layout/Input";

export default function Login() {
  return (
    <div>
      <Input
        type="text"
        id="username"
        name="username"
        placeholder="Usuário"
        text="Usuário"
      />

      <Input
        type="password"
        id="password"
        name="password"
        placeholder="Senha"
        text="Senha"
      />

      <button>Entrar</button>
    </div>
  );
}
