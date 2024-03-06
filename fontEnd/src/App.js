import "./App.css";
import Navbar from "./Components/Navbar";
import Header from "./Components/Header";
import Howtouse from "./Components/Howtouse";
import Aboutus from "./Components/Aboutus";
import Faq from "./Components/Faq";
import Footer from "./Components/Footer";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import LoginSignup from "./Pages/LoginSignup";

function App() {
  return (
    <div>
      <BrowserRouter>
        <Navbar />
        <Routes>
          {/* <Route path='/' element={<div><LoginSignup/></div>} /> */}
          <Route
            path="/"
            element={
              <div>
                <Header />
                <Howtouse />
                <Aboutus />
                <Faq />
                <Footer />
              </div>
            }
          />{" "}
          
          <Route path="/login" element={<LoginSignup />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
