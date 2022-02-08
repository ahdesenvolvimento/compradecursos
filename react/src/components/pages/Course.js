import Input from "../layout/Input";
import { useState } from "react";
import SubmitButton from "../layout/SubmitButton";

export default function Course() {
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
  return (
    <div>
       <div className="row">
        <div className="col-4">
          <div className="card">
            <div className="card-body">12321</div>
            <button>Adicionar ao carrinho</button>
          </div>
        </div>
      </div>
    </div>
  );
}
