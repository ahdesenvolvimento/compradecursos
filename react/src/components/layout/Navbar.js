import { Link } from "react-router-dom";
import {
  Modal,
  Button,
  NavDropdown,
  Navbar,
  Nav,
  Container,
} from "react-bootstrap";
import { useEffect, useState } from "react";
export default function NavBar({ token, statusNav, setStatusNav }) {
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => {
    getItemsCart();
    setShow(true);
  };

  const [cart, setCart] = useState([]);
  const [total, setTotal] = useState(0);

  const getItemsCart = () => {
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
          let valor = 0;
          data.forEach((element) => {
            valor = parseFloat(valor) + parseFloat(element.id_courses.price);
          });
          setTotal(valor);
        })
        .catch((error) => console.log(error));
    }
  };

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
        setCart(data);
        let valor = 0;
        data.forEach((element) => {
          valor = parseFloat(valor) + parseFloat(element.id_courses.price);
        });
        setTotal(valor);
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
    // <nav className="navbar navbar-expand-lg navbar-light">
    //   <div className="container">
    //     <Link to="/" className="navbar-brand text-white fw-bold">
    //       Compra de Cursos
    //     </Link>
    //     <button
    //       className="navbar-toggler"
    //       type="button"
    //       data-bs-toggle="collapse"
    //       data-bs-target="#navbarNavAltMarkup"
    //       aria-controls="navbarNavAltMarkup"
    //       aria-expanded="false"
    //       aria-label="Toggle navigation"
    //     >
    //       <span className="navbar-toggler-icon"></span>
    //     </button>
    //     <div
    //       className="collapse navbar-collapse justify-content-end"
    //       id="navbarNavAltMarkup"
    //     >
    //       <div className="navbar-nav">
    //         {token ? (
    //           <>
    //             <Link
    //               to="/categories"
    //               className="nav-link active text-white fw-bold"
    //             >
    //               Categorias
    //             </Link>
    //             <Link
    //               to="/orders"
    //               className="nav-link active text-white fw-bold"
    //             >
    //               Meu pedidos
    //             </Link>
    //             <Link
    //               to="/courses"
    //               className="nav-link active text-white fw-bold"
    //             >
    //               Criar curso
    //             </Link>
    //             <a
    //               className="nav-link active text-white fw-bold"
    //               onClick={handleShow}
    //               aria-current="page"
    //             >
    //               Carrinho
    //             </a>
    //             <a
    //               className="nav-link active text-white fw-bold"
    //               onClick={logout}
    //               aria-current="page"
    //             >
    //               Logout
    //             </a>
    //           </>
    //         ) : (
    //           <>
    //             <Link
    //               to="/login"
    //               className="nav-link active text-white fw-bold"
    //             >
    //               Login
    //             </Link>
    //             <Link
    //               to="/register"
    //               className="nav-link active text-white fw-bold"
    //             >
    //               Cadastrar
    //             </Link>
    //           </>
    //         )}
    //       </div>
    //     </div>
    //   </div>
    //   <Modal show={show} onHide={handleClose}>
    //     <Modal.Header closeButton>
    //       <Modal.Title>Carrinho</Modal.Title>
    //     </Modal.Header>
    //     <Modal.Body>
    //       <div className="table-responsive">
    //         <table className="table">
    //           <thead>
    //             <tr>
    //               <th>Nome</th>
    //               <th>Preço</th>
    //               <th>Descrição</th>
    //               <th>Categoria</th>
    //               <th>Ações</th>
    //               <th>Total</th>
    //             </tr>
    //           </thead>
    //           <tbody>
    //             {cart.map((item) => (
    //               <tr key={item.id}>
    //                 <td>{item.id_courses.name}</td>
    //                 <td>{item.id_courses.price.toFixed(2)}</td>
    //                 <td>{item.id_courses.description}</td>
    //                 <td>{item.id_courses.id_category}</td>
    //                 <td>
    //                   <button
    //                     type="button"
    //                     className="btn btn-danger"
    //                     onClick={(e) => removeItemCart(item.id)}
    //                   >
    //                     Remover
    //                   </button>
    //                 </td>
    //               </tr>
    //             ))}
    //           </tbody>
    //           <tfoot>
    //             <tr>
    //               <td>Total</td>
    //               <td></td>
    //               <td></td>
    //               <td></td>
    //               <td></td>
    //               <td>R${total}</td>
    //             </tr>
    //           </tfoot>
    //         </table>
    //       </div>
    //     </Modal.Body>
    //     <Modal.Footer>
    //       <Button variant="primary">
    //         <Link to="/order" className="text-white">
    //           Finalizar pedido
    //         </Link>
    //       </Button>
    //       <Button variant="secondary" onClick={handleClose}>
    //         Fechar
    //       </Button>
    //     </Modal.Footer>
    //   </Modal>
    // </nav>
    <Navbar bg="" expand="lg">
      <Container>
        <Navbar.Brand>
          {" "}
          <Link to="/" className="navbar-brand text-white fw-bold">
            Compra de Cursos
          </Link>
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto">
            <Nav.Link>
              <Link to="/" className="nav-link active text-white fw-bold">
                Início
              </Link>
            </Nav.Link>
            {token ? (
              <>
              <Nav.Link>
                <Link
                  to="/categories"
                  className="nav-link active text-white fw-bold"
                >
                  Categorias
                </Link>
              </Nav.Link>
              <Nav.Link>
                <Link
                  to="/orders"
                  className="nav-link active text-white fw-bold"
                >
                  Meu pedidos
                </Link>
              </Nav.Link>
              <Nav.Link>
                <Link
                  to="/courses"
                  className="nav-link active text-white fw-bold"
                >
                  Criar curso
                </Link>
              </Nav.Link>
              <Nav.Link>
                <a
                  className="nav-link active text-white fw-bold"
                  onClick={handleShow}
                  aria-current="page"
                >
                  Carrinho
                </a>
              </Nav.Link>
              <Nav.Link>
                <a
                  className="nav-link active text-white fw-bold"
                  onClick={logout}
                  aria-current="page"
                >
                  Logout
                </a>
              </Nav.Link>
              </>
            ) : (
              <>
              <Nav.Link>
                <Link
                  to="/login"
                  className="nav-link active text-white fw-bold"
                >
                  Login
                </Link>
              </Nav.Link>
              <Nav.Link>
                <Link
                  to="/register"
                  className="nav-link active text-white fw-bold"
                >
                  Cadastrar
                </Link>
              </Nav.Link>
              </>
            )}
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}
