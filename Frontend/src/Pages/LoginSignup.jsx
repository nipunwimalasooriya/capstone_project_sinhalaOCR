import React, { useState } from "react";
import "./LoginSignup.css";
import { auth } from "../firebase/config.js";
import {
  createUserWithEmailAndPassword,
  sendPasswordResetEmail,
  signInWithEmailAndPassword,
  onAuthStateChanged,
} from "firebase/auth";

import { useDispatch } from "react-redux";
import { setUser } from "../store/usersSlice.js";

const LoginSignup = () => {
  const dispatch = useDispatch();
  const [state, setState] = useState("Login");

  const [userCredentials, setUserCredentials] = useState({});
  // const [showForgotPassword, setShowForgotPassword] = useState(false);
  const [error, setError] = useState("");

  onAuthStateChanged(auth, (user) => {
    if (user) {
      dispatch(
        setUser({
          id: user.uid,
          email: user.email,
        })
      );
    } else {
      dispatch(setUser(null));
    }
  });

  // To Handle the user credentials
  function handleCredentials(e) {
    setUserCredentials({ ...userCredentials, [e.target.name]: e.target.value });
  }

  function handleSignup(e) {
    e.preventDefault();
    setError("");

    createUserWithEmailAndPassword(
      auth,
      userCredentials.email,
      userCredentials.password
    )
      // .then((userCredential) => {
      //   // Signed up

      //   console.log(userCredential.user);
      //   dispatch(
      //     setUser({
      //       id: userCredential.user.uid,
      //       email: userCredential.user.email,
      //     })
      //   );
      // })
      .catch((error) => {
        setError(error.message);
      });
  }

  function handleLogin(e) {
    e.preventDefault();
    setError("");

    signInWithEmailAndPassword(
      auth,
      userCredentials.email,
      userCredentials.password
    )
      // .then((userCredential) => {
      //   console.log(userCredential.user);
      //   dispatch(
      //     setUser({
      //       id: userCredential.user.uid,
      //       email: userCredential.user.email,
      //     })
      //   );
      // })
      .catch((error) => {
        setError(error.message);
      });
  }

  function handlePasswordReset() {
    const email = prompt("Enter your email to reset the password");

    // Check if the user entered an email address
    if (email) {
      sendPasswordResetEmail(auth, email)
        .then(() => {
          alert("Password reset email has been sent to your email");
        })
        .catch((error) => {
          alert(`Error: ${error.message}`);
        });
    }
  }

  return (
    <div className="loginsignup">
      <div className="loginsignup-container">
        <div className="topic">
          <h1>Sinhala OCR</h1>
        </div>

        <div className="loginsignup-fields">
          <form className={`add-form ${state.toLowerCase()}`}>
            <div className="form-control">
              <label>Email *</label>
              <input
                type="text"
                name="email"
                onChange={(e) => handleCredentials(e)}
                placeholder="Enter your email"
              />
            </div>
            <div className="form-control">
              <label>Password *</label>
              <input
                type="password"
                name="password"
                placeholder="Enter your password"
                onChange={(e) => handleCredentials(e)}
              />
            </div>
          </form>
        </div>
        <div className="loginsignup-agree">
          <p>
            {state === "Login" ? (
              <>
                Don't have an account?{" "}
                <span onClick={() => setState("Signup")}>Signup</span>
              </>
            ) : (
              <>
                Already have an account?{" "}
                <span onClick={() => setState("Login")}>Login</span>
              </>
            )}
          </p>
        </div>
        <div className="login-type">
          <button
            style={{ background: state === "Signup" ? "#469406" : "#004aad" }}
            onClick={(e) =>
              state === "Signup" ? handleSignup(e) : handleLogin(e)
            }
          >
            {state}
          </button>
        </div>

        {error && <div className="error">{error}</div>}

        <p onClick={handlePasswordReset}>Forgot Password ?</p>
      </div>
    </div>
  );
};

export default LoginSignup;
