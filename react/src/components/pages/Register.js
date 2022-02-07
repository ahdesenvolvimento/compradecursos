import Input from "../layout/Input";
export default function Register() {
  const register = () => {};
  return (
    <div>
      <form method="POST" action="" onSubmit={register}>
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
      </form>
    </div>
  );
}
