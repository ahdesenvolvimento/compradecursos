import Input from "../layout/Input";
import SubmitButton from "../layout/SubmitButton";
import { Link } from "react-router-dom";
import { useState } from "react";
import styles from "./Login.module.css";
export default function Register() {
  const [user, setUser] = useState([]);

  const handleChange = (e) => {
    setUser({ ...user, [e.target.name]: e.target.value });
  };

  const register = (e) => {
    e.preventDefault();
    const init = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(user),
    };
    fetch("http://localhost:8000/users/", init)
      .then()
      .then()
      .catch((error) => console.log(error));
  };
  return (
    <div className={styles.content + ' mt-3 mb-3'}>
      <form method="POST" action="" onSubmit={register}>
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
          <Link to="/">Voltar</Link>
        </div>
      </form>
    </div>
  );
}
