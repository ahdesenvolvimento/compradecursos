import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Input from "../layout/Input";
export default function Home() {
  const [courses, setCourses] = useState([]);
  const [categories, setCategories] = useState([]);
  const [search, setSearch] = useState();
  useEffect(() => {
    const init = {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + localStorage.getItem("access-token"),
      },
    };
    fetch("http://localhost:8000/courses/", init)
      .then((response) => response.json())
      .then((data) => {
        setCourses(data);
      })
      .catch((error) => console.log(error));
  }, []);

  const searchCourse = (e) => {
    e.preventDefault()
    const init = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + localStorage.getItem("access-token"),
      },body:JSON.stringify({'search':search})
    };
    fetch("http://localhost:8000/", init)
      .then((response) => response.json())
      .then((data) => {
        setCourses(data);
      })
      .catch((error) => console.log(error));
  }
  return (
    <div>
      <form method="GET" action="" onSubmit={searchCourse}>
        <Input
          name="search"
          type="search"
          placeholder="Buscar curso"
          text="Buscar curso"
          handleOnChange={(e) => setSearch(e.target.value)}
        />
      </form>
      <div className="row">
        {courses ? (
          <>
            {courses.map((item) => (
              <div className="col-4" key={item.id}>
                <div className="card">
                  <div className="card-header fw-bold">{item.name}</div>
                  <div className="card-body">
                    <p>Valor: R$ {item.price.toFixed(2)}</p>
                    <p>Descrição: {item.description}</p>
                    {/* <p>Categoria: {item.</p> */}
                  </div>
                  <div className="card-footer">
                    <Link to={"courses/" + item.id}>Detalhes do curso</Link>
                  </div>
                </div>
              </div>
            ))}
          </>
        ) : (
          <p>Sem cursos cadastrados.</p>
        )}
      </div>
    </div>
  );
}
