import Input from "../layout/Input";
import { useState } from "react";
import SubmitButton from "../layout/SubmitButton";
import { Link } from "react-router-dom";
export default function Login() {
  const [user, setUser] = useState([]);

  const handleChange = (e) => {
    setUser({ ...user, [e.target.name]: e.target.value });
  };

  const login = (e) => {
    e.preventDefault();
    const init = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(user),
    };
    fetch("http://localhost:8000/api/token/", init)
      .then((response) => response.json())
      .then((data) => {
        console.log(data)
        localStorage.setItem("access-token", data.access);
        localStorage.setItem("refresh-token", data.refresh);
        console.log(localStorage.getItem('access-token'));
      })
      .catch((error) => console.log(error));
  };
  return (
    <div>
      <form action="" method="POST" onSubmit={login}>
        <Input
          type="text"
          name="username"
          placeholder="Usuário"
          text="Usuário"
          handleOnChange={handleChange}
        />
        <Input
          type="password"
          name="password"
          placeholder="Senha"
          text="Senha"
          handleOnChange={handleChange}
        />
        <div className="text-center">
          <SubmitButton text="Entrar" />
          <Link to="/register">Não tenho conta</Link>
        </div>
      </form>
    </div>
  );
}
