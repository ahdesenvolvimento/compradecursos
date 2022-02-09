import Input from "../layout/Input";
import { useState, useEffect } from "react";
import SubmitButton from "../layout/SubmitButton";
import { useParams } from "react-router-dom";

export default function Orders({token}) {
  const [cart, setCart] = useState([]);
  const [total, setTotal] = useState(0);
  useEffect(() => {
    if (token) {
      const init = {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer " + localStorage.getItem("access-token"),
        },
      };
      fetch("http://localhost:8000/cart/", init)
        .then((response) => response.json())
        .then((data) => {
          setCart(data);
          setTotal(
            data.reduce(function (total, elem) {
              return total + elem.id_courses.price;
            })
          );
          let valor = 0;
          data.forEach((element) => {
            valor = parseFloat(valor) + parseFloat(element.id_courses.price);
          });
          setTotal(valor);
        })
        .catch((error) => console.log(error));
    }
  }, []);

  const removeItemCart = (e) => {
    const init = {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + localStorage.getItem("access-token"),
      },
    };
    fetch("http://localhost:8000/cart/" + e, init)
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
      })
      .catch((error) => console.log(error));
  };

  const createOrder = (e) => {
    e.preventDefault();
    const init = {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer " + localStorage.getItem("access-token"),
        },
      };
      fetch("http://localhost:8000/order/", init)
        .then((response) => response.json())
        .then((data) => {
          console.log(data);
        })
        .catch((error) => console.log(error));
  }
  return (
    <div>
      <table className="table">
        <thead>
          <tr>
            <th>Nome</th>
            <th>Preço</th>
            <th>Descrição</th>
            <th>Categoria</th>
            <th>Ações</th>
            <th>Total</th>
          </tr>
        </thead>
        <tbody>
          {cart.map((item) => (
            <tr key={item.id}>
              <td>{item.id_courses.name}</td>
              <td>{item.id_courses.price.toFixed(2)}</td>
              <td>{item.id_courses.description}</td>
              <td>{item.id_courses.id_category}</td>
              <td>
                <button
                  type="button"
                  className="btn btn-danger"
                  onClick={(e) => removeItemCart(item.id)}
                >
                  Remover
                </button>
              </td>
            </tr>
          ))}
        </tbody>
        <tfoot>
          <tr>
            <td>Total</td>
            <td></td>
            <td></td>
            <td></td>
            <td></td>
            <td>R${total}</td>
          </tr>
        </tfoot>
      </table>
      <div className="row">
        <form method="POST" action="" onSubmit={createOrder}>
            <button type="submit">Finalizar pedido</button>
        </form>
      </div>
    </div>
  );
}
