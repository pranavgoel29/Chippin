import React from "react";
import "./Signup.css";
import img from "../../images/google.png";
import img2 from "../../images/apple.png";

const Signup = () => {
  return (
    <>
      <div className="head-div">Board.</div>
      <div className="main-div">
        <div className="sub-div1">
          <h1 className="title-heading">Board.</h1>
        </div>
        <div className="sub-div2">
          <div className="form-div">
            <h2 className="signup-head">Sign In</h2>
            <p className="sub-signup-head" style={{ marginTop: "0px" }}>
              Sign in to your account
            </p>
            <div className="signin-option">
              <button className="sign-auth">
                <img
                  src={img}
                  alt=""
                  style={{
                    height: "17px",
                    width: "17px",
                    marginRight: "5px",
                    marginTop: "-1px",
                  }}
                ></img>
                Sign in with Google
              </button>
              <button className="sign-auth">
                <img
                  src={img2}
                  alt=""
                  style={{
                    height: "16px",
                    width: "16px",
                    marginRight: "5px",
                    marginTop: "-3px",
                  }}
                ></img>
                Sign in with Apple
              </button>
            </div>
            <div className="form-main-div">
              <form className="form">
                <label className="form-label" for="email">
                  Email address
                </label>
                <br></br>
                <input
                  className="form-input"
                  type="email"
                  id="email"
                  placeholder="Enter your email"
                />
                <label className="form-label" for="password">
                  Password
                </label>
                <br></br>
                <input
                  className="form-input"
                  type="password"
                  id="password"
                  placeholder="Enter your password"
                />
                <br></br>
                <a href="#" className="forgot-password">
                  Forgot password?
                </a>
                <button className="form-button">Sign In</button>
              </form>
            </div>
            <div className="signup-link">
              <p className="signup-link-text">
                Don't have an account?{" "}
                <a href="#" className="signup-link-text2">
                  Register here
                </a>
              </p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Signup;
