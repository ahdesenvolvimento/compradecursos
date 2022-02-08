import Input from "../layout/Input";
import { useState } from "react";
import SubmitButton from "../layout/SubmitButton";
import Select from "../layout/Select";

export default function Courses() {
  const [course, setCourse] = useState([]);
  const createCourse = (e) => {
    e.preventDefault();
    const init = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(course),
    };
    fetch("http://localhost:8000/courses/")
      .then()
      .then()
      .catch((error) => console.log(error));
    console.log(course);
  };

  const handleChange = (e) => {
    setCourse({ ...course, [e.target.name]: e.target.value });
  };

  const options = {
    'id':'1',
    'name':'jose'
  }
  return (
    <div>
      <form method="POST" action="" onSubmit={createCourse}>
        <Input
          type="text"
          id="name"
          name="name"
          placeholder="Nome da categoria"
          handleOnChange={handleChange}
          text="Nome da categoria"
        />
        <Input
          type="text"
          id="price"
          name="price"
          placeholder="Preço"
          handleOnChange={handleChange}
          text="Preço"
        />
        <Input
          type="text"
          id="description"
          name="description"
          placeholder="Descrição"
          handleOnChange={handleChange}
          text="Descrição"
        />
        <Select text="Selecione a opção" name="id_category" handleOnChange={handleChange} options={options}/>
        <SubmitButton text="Criar" />
      </form>
    </div>
  );
}
