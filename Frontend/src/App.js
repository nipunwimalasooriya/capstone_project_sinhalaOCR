import "./App.css";
import Navbar from "./Components/Navbar";
import Header from "./Components/Header";
import Howtouse from "./Components/Howtouse";
import Faq from "./Components/Faq";
import Footer from "./Components/Footer";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import LoginSignup from "./Pages/LoginSignup";
import { selectUsers } from "./store/usersSlice.js";
import { useSelector } from "react-redux";
import Aboutus from "./Components/Aboutus.jsx";
import { ToastContainer } from "react-toastify"; // Import ToastContainer

function App() {
  const user = useSelector(selectUsers);
  return (
      <div>
        <ToastContainer /> {/* Render ToastContainer outside of the condition */}
        {user.currentUser ? (
            <Router>
              <Navbar />
              <Routes>
                <Route path="/" element={<Header />} />
                <Route path="/how-to-use" element={<Howtouse />} />
                <Route path="/about-us" element={<Aboutus />} />
                <Route path="/faq" element={<Faq />} />
              </Routes>
              <Footer />
            </Router>
        ) : (
            <LoginSignup />
        )}
      </div>
  );
}

export default App;
