import Input from "../layout/Input";
import { useState, useEffect } from "react";
import SubmitButton from "../layout/SubmitButton";
import Select from "../layout/Select";

export default function Courses() {
  const [course, setCourse] = useState([]);
  const [categories, setCategories] = useState([]);
  
  useEffect(() => {
    const init = {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization:'Bearer ' + localStorage.getItem('access-token')
      }
    };
    fetch("http://localhost:8000/categories/", init)
      .then((response) => response.json())
      .then((data) => {
        setCategories(data)
      })
      .catch((error) => console.log(error));
  }, [])

  const createCourse = (e) => {
    e.preventDefault();
    const init = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: 'Bearer ' + localStorage.getItem('access-token')
      },
      body: JSON.stringify(course),
    };
    fetch("http://localhost:8000/courses/", init)
      .then()
      .then()
      .catch((error) => console.log(error));
  };

  const handleChange = (e) => {
    setCourse({ ...course, [e.target.name]: e.target.value });
  };
 
  return (
    <div>
      <form method="POST" action="" onSubmit={createCourse}>
        <Input
          type="text"
          name="name"
          placeholder="Nome do curso"
          handleOnChange={handleChange}
          text="Nome do cursos"
        />
        <Input
          type="number"
          name="price"
          placeholder="Preço"
          handleOnChange={handleChange}
          text="Preço"
        />
        <Input
          type="text"
          name="description"
          placeholder="Descrição"
          handleOnChange={handleChange}
          text="Descrição"
        />
        <Select text="Selecione a opção" name="id_category" handleOnChange={handleChange} options={categories}/>
        <SubmitButton text="Criar" />
      </form>
    </div>
  );
}
