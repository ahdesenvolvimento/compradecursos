import { Link } from "react-router-dom";
import { Modal, Button, NavDropdown } from "react-bootstrap";
import { useEffect, useState } from "react";
export default function NavBar() {
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const [cart, setCart] = useState([]);
  useEffect(() => {
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
      })
      .catch((error) => console.log(error));
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
  return (
    <nav className="navbar navbar-expand-lg navbar-light">
      <div className="container-fluid">
        <Link to="/" className="navbar-brand">
          Compra de Cursos
        </Link>
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarNavAltMarkup"
          aria-controls="navbarNavAltMarkup"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        <div
          className="collapse navbar-collapse justify-content-end"
          id="navbarNavAltMarkup"
        >
          <div className="navbar-nav">
            <Link to="/categories" className="nav-link active">
              Categorias
            </Link>
            <Link to="/categories" className="nav-link active">
              Meu pedidos
            </Link>
            <NavDropdown title="Dropdown" id="basic-nav-dropdown">
              <NavDropdown.Item>
                <Link to="/courses">Criar Curso</Link>
              </NavDropdown.Item>
              <NavDropdown.Item>
                <Link to="/courses">Meus Cursos</Link>
              </NavDropdown.Item>
            </NavDropdown>
            <button
              className="nav-link active"
              onClick={handleShow}
              aria-current="page"
              href="#/"
            >
              Carrinho
            </button>
          </div>
        </div>
      </div>
      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Modal heading</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {cart.map((item) => (
            <>
              <p key={item.id}>
                {item.id_courses.name} {item.id}
              </p>
              <button type="button" onClick={(e) => removeItemCart(item.id)}>
                Remover
              </button>
            </>
          ))}
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Fechar
          </Button>
        </Modal.Footer>
      </Modal>
    </nav>
  );
}
