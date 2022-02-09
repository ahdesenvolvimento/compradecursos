import { Link } from "react-router-dom";
import { Modal, Button, NavDropdown } from "react-bootstrap";
import { useEffect, useState } from "react";
export default function NavBar({ token, statusNav, setStatusNav }) {
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const [cart, setCart] = useState([]);
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

  const logout = () => {
    const init = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + localStorage.getItem("access-token"),
      },
    };
    fetch("http://localhost:8000/logout/", init)
      .then((response) => response.json())
      .then((data) => {
        localStorage.removeItem("access-token");
        localStorage.removeItem("refresh-token");
        setStatusNav(false);
      })
      .catch((error) => console.log(error));
  };
  return (
    <nav className="navbar navbar-expand-lg navbar-light">
      <div className="container">
        <Link to="/" className="navbar-brand text-white fw-bold">
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
            {token ? (
              <>
                <Link to="/categories" className="nav-link active text-white fw-bold">
                  Categorias
                </Link>
                <Link to="/categories" className="nav-link active text-white fw-bold">
                  Meu pedidos
                </Link>
                <NavDropdown title="Cursos" id="basic-nav-dropdown">
                  <NavDropdown.Item>
                    <Link to="/courses">Criar Curso</Link>
                  </NavDropdown.Item>
                  <NavDropdown.Item>
                    <Link to="/courses">Meus Cursos</Link>
                  </NavDropdown.Item>
                </NavDropdown>
                <a
                  className="nav-link active text-white fw-bold"
                  onClick={handleShow}
                  aria-current="page"
                >
                  Carrinho
                </a>
                <a
                  className="nav-link active text-white fw-bold"
                  onClick={logout}
                  aria-current="page"
                >
                  Logout
                </a>
              </>
            ) : (
              <>
              <Link to="/login" className="nav-link active text-white fw-bold">
                  Login
              </Link>
              <Link to="/register" className="nav-link active text-white fw-bold">
                  Cadastrar
              </Link>
              </>
            )}
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
