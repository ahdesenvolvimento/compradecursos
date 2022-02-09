import Input from "../layout/Input";
import { useState, useEffect } from "react";
import SubmitButton from "../layout/SubmitButton";
import { useParams } from "react-router-dom";

export default function Course() {
  const [course, setCourse] = useState([]);
  const { id } = useParams();
  const getCourse = () => {
    const init = {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: 'Bearer ' + localStorage.getItem('access-token'),
      },
    };
    fetch("http://localhost:8000/courses/" + id, init)
      .then((response) => response.json())
      .then((data) => {
        setCourse(data)
      })
      .catch((error) => console.log(error));
    console.log(course);
  };

  const addToCart = (e) => {
    const init = {
      method: "POST",
      headers: {
        'Content-Type': 'application/json',
        Authorization: 'Bearer ' + localStorage.getItem('access-token'),
      },
      body: JSON.stringify({ 'id_course': e })
    }
    fetch('http://localhost:8000/cart/', init).then().then().catch((error) => console.log(error));
  }
  useEffect(() => {
    getCourse()
  }, [])

  return (
    <div>
      <div className="row">
        <div className="col-12">
          <div className="card">
          <div className="card-header fw-bold">{course.name}</div>
              <div className="card-body">
                <p>Valor: R$ {course.price}</p>
                <p>Descrição: {course.description}</p>
                {/* <p>Categoria: {item.</p> */}
              </div>
          <div className="card-footer text-center">
              <button type="button" className="btn btn-primary w-50" onClick={(e) => addToCart(course.id)}>Adicionar ao carrinho</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
