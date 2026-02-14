import {
  BrowserRouter as Router,
  Routes,
  Route,
  useLocation,
} from "react-router-dom";
import { useState, useEffect } from "react";
import Navbar from "./components/layout/Navbar";
import Home from "./pages/Home";
import HowItWorksPage from "./pages/HowItWorks";
// import RecipeDetails from './pages/RecipeDetails'; // Uncomment later
import LoadingScreen from "./components/layout/LoadingScreen";
import "./index.css";

function AppContent() {
  const location = useLocation();
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 300);
    return () => clearTimeout(timer);
  }, [location]);

  return (
    <div className="min-h-screen">
      <Navbar />
      <div className="pt-20">
        {isLoading ? (
          <div className="h-screen flex items-center justify-center">
            <div className="text-2xl text-gray-500">Loading...</div>
          </div>
        ) : (
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/how-it-works" element={<HowItWorksPage />} />
            {/* <Route path="/recipe/:id" element={<RecipeDetails />} /> */}
            {/* Add more routes here */}
          </Routes>
        )}
      </div>
    </div>
  );
}

export default function App() {
  return (
    <>
      <LoadingScreen />
      <Router>
        <AppContent />
      </Router>
    </>
  );
}
