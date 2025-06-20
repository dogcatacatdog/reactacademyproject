import React from "react";
import { BrowserRouter as Router, Routes, Route, Link, useNavigate } from "react-router-dom";
import Home from "./Home/Home";
import Contact from "./Contact/Contact";
import Number from "./Number/Number";
import Char from "./Char/Char";
import Coordinate from "./Coordinate/Coordinate";
import Shape from "./Shape/Shape";
import Volume from "./Volume/Volume";
import Statics from "./Statics/Statics";
import Quiz from "./Quiz/Quiz";
import "./App.css";

function Sidebar() {
  const navigate = useNavigate();
  return (
    <div className="sidebar">
      <button onClick={() => navigate("/number")}>수와 연산</button>
      <button onClick={() => navigate("/char")}>문자와 식</button>
      <button onClick={() => navigate("/coordinate")}>좌표 평면과 그래프</button>
      <button onClick={() => navigate("/shape")}>기본 도형</button>
      <button onClick={() => navigate("/volume")}>평면 도형과 입체 도형</button>
      <button onClick={() => navigate("/statics")}>통계</button>
      <button onClick={() => navigate("/quiz")}>연습 문제</button>
    </div>
  );
}

function App() {
  return (
    <Router>
      <div className="app-container">
        <nav className="top-nav">
          <div className="top-nav-links">
            <Link to="/home">Home</Link>
            <Link to="/contact">Contact</Link>
          </div>
        </nav>
        <div className="main-content">
          <Sidebar />
          <div className="content-area">
            <Routes>
              <Route path="/home" element={<Home />} />
              <Route path="/contact" element={<Contact />} />
              <Route path="/number" element={<Number />} />
              <Route path="/char" element={<Char />} />
              <Route path="/coordinate" element={<Coordinate />} />
              <Route path="/shape" element={<Shape />} />
              <Route path="/volume" element={<Volume />} />
              <Route path="/statics" element={<Statics />} />
              <Route path="/quiz" element={<Quiz />} />
              <Route path="*" element={<Home />} />
            </Routes>
          </div>
        </div>
        <footer className="footer">
          <span>© 2025 Dae-Seong Yang. All rights reserved.</span>
        </footer>
      </div>
    </Router>
  );
}

export default App;
