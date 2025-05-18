import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

// Import your pages
import Home from "./pages/Home";
import About from "./pages/About";
import Calculator from "./pages/Calculator";
import Start from "./pages/Start";

function App() {
  return (
    <Router>
      <div className="p-0 ">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/calculator" element={<Calculator />} />
          <Route path="/start" element={<Start />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
