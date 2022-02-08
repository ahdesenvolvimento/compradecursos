import { Link } from "react-router-dom";
import { Modal, Button, NavDropdown } from "react-bootstrap";
import { useState } from "react";
export default function NavBar() {
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  return (
    <nav className="navbar navbar-expand-lg navbar-light bg-light">
      <div className="container-fluid">
        <a className="navbar-brand" href="#/">
          <Link to="/">Compra de Cursos</Link>
        </a>
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
            <a className="nav-link active" aria-current="page" href="#/">
              <Link to="/categories">Categorias</Link>
            </a>
            <NavDropdown title="Dropdown" id="basic-nav-dropdown">
              <NavDropdown.Item ><Link to="/courses">Cursos</Link></NavDropdown.Item>
              <NavDropdown.Item ><Link to="/courses">Meus cursos</Link></NavDropdown.Item>
              <NavDropdown.Divider />
              <NavDropdown.Item href="#action/3.4">
                Separated link
              </NavDropdown.Item>
            </NavDropdown>
            <a className="nav-link active" aria-current="page" href="#/">
              <Link to="/courses">Cursos</Link>
            </a>
            <a
              className="nav-link active"
              onClick={handleShow}
              aria-current="page"
              href="#/"
            >
              Teste
            </a>
          </div>
        </div>
      </div>
      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Modal heading</Modal.Title>
        </Modal.Header>
        <Modal.Body>item 1 - preço item 2 - preco</Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Fechar
          </Button>
        </Modal.Footer>
      </Modal>
    </nav>
  );
}
