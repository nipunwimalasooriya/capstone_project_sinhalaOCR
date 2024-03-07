import "./App.css";
import Navbar from "./Components/Navbar";
import Header from "./Components/Header";
import Howtouse from "./Components/Howtouse";
import Aboutus from "./Components/Aboutus";
import Faq from "./Components/Faq";
import Footer from "./Components/Footer";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import LoginSignup from "./Pages/LoginSignup";
import { selectUsers } from "./store/usersSlice.js";
import { useSelector } from "react-redux";
import HomePage from './Pages/HomePage.jsx';

function App() {
  const user = useSelector(selectUsers);
  return (
    <div>
      {user.currentUser ? (
        <BrowserRouter>
          <Navbar />
          <Routes>
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
            />
          </Routes>
        </BrowserRouter>
      ) : (
       <LoginSignup/>
      )}
    </div>
  );
}

export default App;