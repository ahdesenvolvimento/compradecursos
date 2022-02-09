import { useState, useEffect } from "react";

export default function Order({token}) {
  const [order, setOrder] = useState([]);
  useEffect(() => {
    if (token) {
      const init = {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer " + localStorage.getItem("access-token"),
        },
      };
      fetch("http://localhost:8000/order/", init)
        .then((response) => response.json())
        .then((data) => {
          setOrder(data);
        })
        .catch((error) => console.log(error));
    }
  }, []);

  return (
    <div>
      <table className="table">
        <thead>
          <tr>
            <th>ID</th>
            <th>Data</th>
            <th>Total</th>
          </tr>
        </thead>
        <tbody>
          {order.map((item) => (
            <tr key={item.id}>
              <td>{item.id_courses.name}</td>
              <td>{item.id_courses.price.toFixed(2)}</td>
              <td>{item.id_courses.description}</td>
              <td>{item.id_courses.id_category}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
