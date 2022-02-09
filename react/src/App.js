import "./App.css";
import { BrowserRouter as Router, Route, Routes, Navigate } from "react-router-dom";
import Home from "./components/pages/Home";
import Teste from "./components/pages/Teste";
import Login from "./components/pages/Login";
import Register from "./components/pages/Register";
import Categories from "./components/pages/Categories";
import Courses from "./components/pages/Courses";
import NavBar from "./components/layout/Navbar";
import Course from "./components/pages/Course";
import { Card } from "react-bootstrap";
import { useEffect, useState } from "react";
function App() {
  const [statusNav, setStatusNav] = useState(false)
  const token = localStorage.getItem('access-token');
  useEffect(() => {
    if (token){
      setStatusNav(true);
    }
  }, [])
  return (
    <Router>
      <header className="bg-secondary">
       <NavBar token={token} statusNav={statusNav} setStatusNav={setStatusNav}/>

      </header>
      <div className="container mt-3">
        <Card>
          <Card.Body>
          <Routes>
            {token && statusNav ? (<>
              <Route path="/" element={<Home />} />
              <Route path="/categories" element={<Categories />} />
              <Route path="/courses" element={<Courses />} />
              <Route path="/courses/:id" element={<Course />} />
              <Route path="*" element={<Navigate to="/" />} />
            </>) : (
            <>
              <Route path="/login" element={<Login statusNav={statusNav} setStatusNav={setStatusNav}/>} />
              <Route path="/register" element={<Register />} />
              <Route path="*" element={<Navigate to="/login" />} />
            </>)}
          </Routes>
        </Card.Body>
      </Card>
    </div>
    </Router >
  );
}

export default App;
