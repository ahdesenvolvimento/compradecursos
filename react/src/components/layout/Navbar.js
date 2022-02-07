import { Link } from "react-router-dom";
export default function NavBar() {
  return (
    <nav className="navbar navbar-expand-lg navbar-light bg-light">
      <div className="container-fluid">
        <a className="navbar-brand" href="#/">
          Navbar
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
        <div className="collapse navbar-collapse" id="navbarNavAltMarkup">
          <div className="navbar-nav">
              <li>
                <Link to='/categories'>123</Link>
              </li>
            <a className="nav-link active" aria-current="page" href="#/">
              {/* <Link to='categories'>123</Link> */}
            </a>
            <a className="nav-link" href="#/">
              Features
            </a>
            <a className="nav-link" href="#/">
              Pricing
            </a>
            <a
              className="nav-link disabled"
              href="#/"
              tabindex="-1"
              aria-disabled="true"
            >
              Disabled
            </a>
          </div>
        </div>
      </div>
    </nav>
  );
}
