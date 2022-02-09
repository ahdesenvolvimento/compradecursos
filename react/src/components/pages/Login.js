import Input from "../layout/Input";
import { useState } from "react";
import SubmitButton from "../layout/SubmitButton";
import { Link, useNavigate } from "react-router-dom";
import styles from "./Login.module.css";
export default function Login({statusNav, setStatusNav}) {
  const [user, setUser] = useState([]);
  let navigate = useNavigate();
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
        setStatusNav(true);
        navigate('/');
      })
      .catch((error) => console.log(error));
  };
  return (
    <div className={styles.content + ' mt-3 mb-3'}>
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
