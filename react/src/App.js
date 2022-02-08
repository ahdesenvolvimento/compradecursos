import "./App.css";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Home from "./components/pages/Home";
import Teste from "./components/pages/Teste";
import Login from "./components/pages/Login";
import Register from "./components/pages/Register";
import Categories from "./components/pages/Categories";
import Courses from "./components/pages/Courses";
import NavBar from "./components/layout/Navbar";
import Course from "./components/pages/Course";
function App() {
  return (
    <header>
      <Router>
        <NavBar />
        <div className="container">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/categories" element={<Categories />} />
            <Route path="/courses" element={<Courses />} />
            <Route path="/courses/:id" element={<Course />} />
            {/* <Route path="/payment" element={<Register />}/> */}
          </Routes>
        </div>
      </Router>
    </header>
  );
}

export default App;
