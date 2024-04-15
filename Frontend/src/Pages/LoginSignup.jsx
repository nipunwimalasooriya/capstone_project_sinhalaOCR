import React, { useState } from "react";
import "./LoginSignup.css";
import { auth } from "../firebase/config.js";
import {
  createUserWithEmailAndPassword,
  sendPasswordResetEmail,
  signInWithEmailAndPassword,
  sendEmailVerification,
  onAuthStateChanged,
} from "firebase/auth";

import { useDispatch } from "react-redux";
import { setUser } from "../store/usersSlice.js";
import { toast } from "react-toastify";
import logo from "../images/logo.png";

const LoginSignup = () => {
  const dispatch = useDispatch();
  const [state, setState] = useState("Login");

  const [userCredentials, setUserCredentials] = useState({
    email: "",
    password: "",
    confirmPassword: "",
  });

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

  function handleCredentials(e) {
    setUserCredentials({ ...userCredentials, [e.target.name]: e.target.value });
  }

  function handleSignup(e) {
    e.preventDefault();

    const { email, password, confirmPassword } = userCredentials;

    if (password !== confirmPassword) {
      toast.error("Passwords do not match. Please verify your password.");
      return;
    }

    createUserWithEmailAndPassword(auth, email, password)
        .then((userCredential) => {
          // Send email verification
          sendEmailVerification(auth.currentUser)
              .then(() => {
                toast.success("User created successfully!");
              })
              .catch((error) => {
                console.error("Error sending verification email:", error);
              });

          // Clear input fields
          setUserCredentials({ email: "", password: "", confirmPassword: "" });
        })
        .catch((error) => {
          // Display custom error messages based on error codes
          if (error.code === "auth/invalid-email") {
            toast.error("Invalid email. Please enter a valid email address.");
          } else if (error.code === "auth/weak-password") {
            toast.error("Weak password. Please choose a stronger password.");
          } else {
            toast.error("Sign Up failed. Please try again later.");
          }
        });
  }

  function handleLogin(e) {
    e.preventDefault();

    signInWithEmailAndPassword(auth, userCredentials.email, userCredentials.password)
        .then(() => {
          toast.success("Login successful!");
        })
        .catch((error) => {
          // Display custom error messages based on error codes
          if (
              error.code === "auth/invalid-email" ||
              error.code === "auth/user-not-found"
          ) {
            toast.error("Invalid email or password. Please check your credentials.");
          } else {
            toast.error("Invalid email or password. Please check your credentials.");
          }
        });
  }

  function handlePasswordReset() {
    const email = prompt("Enter your email to reset the password");

    if (email) {
      sendPasswordResetEmail(auth, email)
          .then(() => {
            toast.success("Password reset email has been sent to your email");
          })
          .catch((error) => {
            // Display custom error messages based on error codes
            if (error.code === "auth/invalid-email") {
              toast.error("Invalid email address. Please enter a valid email.");
            } else if (error.code === "auth/user-not-found") {
              toast.error("User not found. Please check the entered email address.");
            } else {
              toast.error("Password reset failed. Please try again later.");
            }
          });
    }
  }

  return (
      <div className="loginsignup">
        <div className="loginsignup-container">
          <div className="topic">
            <div className="nav-logo">
              <img src={logo} alt="" />
            </div>
          </div>

          <div className="loginsignup-fields">
            <form className={`add-form ${state.toLowerCase()}`}>
              <div className="form-control">
                <label>Email *</label>
                <input
                    type="text"
                    name="email"
                    value={userCredentials.email}
                    onChange={(e) => handleCredentials(e)}
                    placeholder="Enter your email"
                />
              </div>
              <div className="form-control">
                <label>Password *</label>
                <input
                    type="password"
                    name="password"
                    value={userCredentials.password}
                    placeholder="Enter your password"
                    onChange={(e) => handleCredentials(e)}
                />
              </div>
              {state === "Signup" && (
                  <div className="form-control">
                    <label>Confirm Password *</label>
                    <input
                        type="password"
                        name="confirmPassword"
                        value={userCredentials.confirmPassword}
                        placeholder="Confirm your password"
                        onChange={(e) => handleCredentials(e)}
                    />
                  </div>
              )}
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

          <p className="fgt-pass" onClick={handlePasswordReset}>Forgot Password ?</p>
        </div>
      </div>
  );
};

export default LoginSignup;
