import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
export default function Home() {
  const [courses, setCourses] = useState([])
  useEffect(() => {
    const init = {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: 'Bearer ' + localStorage.getItem('access-token')
      }
    };
    fetch("http://localhost:8000/courses/", init)
      .then((response) => response.json())
      .then((data) => {
        setCourses(data)
      })
      .catch((error) => console.log(error));
  }, [])
  return (
    <div>
      <div className="row">
        {courses.map((item) => (
          <div className="col-4 mb-3">
            <div className="card">
              <div className="card-body">
                {item.name}
                {item.image ? (
                  <img src={"localhost:8000" + item.image} />
                ) : (
                  <p>Sem imagem</p>
                )}
              </div>
              <div className="card-footer">
                <Link to={"courses/" + item.id}>Detalhes do curso</Link>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
