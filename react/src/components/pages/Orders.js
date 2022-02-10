import { useState, useEffect } from "react";

export default function Order({token}) {
  const [orders, setOrders] = useState([]);
  const [items, setItems] = useState([])

  useEffect(() => {
    if (token) {
      const init = {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer " + localStorage.getItem("access-token"),
        },
      };
      fetch("http://localhost:8000/order-user/", init)
        .then((response) => response.json())
        .then((data) => {
          setOrders(data.order);
          setItems(data.items);
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
          {orders.map((item) => (
            <tr key={item.id}>
              <td>{item.id}</td>
              {items.map((elem) => (
                <td>
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}