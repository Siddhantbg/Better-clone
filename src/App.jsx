import { BrowserRouter as Router, Routes, Route, useLocation } from "react-router-dom";
import { useEffect } from "react";
import { ThemeProvider } from "./components/ThemeProvider";
import { BrowserCompatibilityProvider } from "./components/BrowserCompatibilityProvider";
import { AnimationProvider } from "./components/AnimationProvider";
import PageTransition from "./components/PageTransition";
import visualPolishManager from "./utils/VisualPolishManager";
import Home from "./pages/Home";
import About from "./pages/About";
import Calculator from "./pages/Calculator";
import Start from "./pages/Start";

// Wrapper component to handle transitions
const AppRoutes = () => {
  const location = useLocation();
  
  return (
    <PageTransition key={location.pathname}>
      <Routes location={location}>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/calculator" element={<Calculator />} />
        <Route path="/start" element={<Start />} />
      </Routes>
    </PageTransition>
  );
};

function App() {
  // Initialize visual polish manager
  useEffect(() => {
    // Initialize enhanced visual polish
    visualPolishManager.init();
    
    // Cleanup on unmount
    return () => {
      visualPolishManager.cleanup();
    };
  }, []);

  return (
    <BrowserCompatibilityProvider>
      <ThemeProvider>
        <AnimationProvider>
          <Router>
            <div className="p-0">
              <AppRoutes />
            </div>
          </Router>
        </AnimationProvider>
      </ThemeProvider>
    </BrowserCompatibilityProvider>
  );
}

export default App;