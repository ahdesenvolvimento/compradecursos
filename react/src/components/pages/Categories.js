import Input from "../layout/Input";
import SubmitButton from "../layout/SubmitButton";
import { useState } from "react";

export default function Categories() {
  const [categorie, setCategories] = useState([]);
  const createCategory = (e) => {
    e.preventDefault();
    const init = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(categorie),
    };
    fetch("http://localhost:8000/courses/")
      .then()
      .then()
      .catch((error) => console.log(error));
    console.log(categorie);
  };

  const handleChange = (e) => {
    setCategories({ ...categorie, [e.target.name]: e.target.value });
  };
  return (
    <div>
      <form action="" method="POST" onSubmit={createCategory}>
      <Input
        type="text"
        name="name"
        placeholder="Nome da categoria"
        handleOnChange={handleChange}
        text="Nome da categoria"
      />
      <SubmitButton text="Criar" />
      </form>
    </div>
  );
}
