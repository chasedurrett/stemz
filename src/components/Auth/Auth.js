import React, { Component } from "react";
import { connect } from "react-redux";
import { userInfoToDux } from "../../dux/reducer";
import axios from "axios";
import "./Auth.css";

class Auth extends Component {
  constructor(props) {
    super(props);
    this.state = {
      username: "",
      password: "",
      email: "",
      isRegistering: false,
    };
  }

  toggleRegistration() {
    this.setState({
      isRegistering: !this.state.isRegistering,
    });
  }

  handleInput(e) {
    this.setState({
      [e.target.name]: e.target.value,
    });
  }

  registerUser = () => {
    const { username, password, email } = this.state;
    axios
      .post("/auth/register", { username, password, email })
      .then((res) => {
        const { username, id, email } = res.data;
        this.props.userInfoToDux(username, id, email);
        this.toggleRegistration()
      })
      .catch((err) => console.log(err));
  };

  loginUser = () => {
    const { username, password } = this.state;
    axios
      .post("/auth/login", { username, password })
      .then((res) => {
        const { username, id, email } = res.data;
        this.props.userInfoToDux(username, id, email);
        this.props.history.push("/sample-pack-dashboard");
      })
      .catch((err) => console.log(err));
  };

  render() {
    const { isRegistering } = this.state;
    return (
      <div className="auth-container">
        <div  className="logo-div">
        </div>
        <div>
          {isRegistering ? (
            <div className="register-form">
              <span className="auth-text">Email</span>
              <input
                className="auth-input"
                name="email"
                onChange={(e) => this.handleInput(e)}
              />
              <span className="auth-text">Username</span>
              <input
                className="auth-input"
                name="username"
                onChange={(e) => this.handleInput(e)}
              />
              <span className="auth-text">Password</span>
              <input
                className="auth-input"
                type="password"
                name="password"
                onChange={(e) => this.handleInput(e)}
              />
              <span className="button-container">
                <button className="auth-button" onClick={() => this.toggleRegistration()}>
                  Cancel
                </button>
                <button className="auth-button" onClick={() => this.registerUser()}>Register</button>
              </span>
            </div>
          ) : (
            <div className="login-form">
              <span className="auth-text">Username</span>
              <input
                className="auth-input"
                name="username"
                onChange={(e) => this.handleInput(e)}
              />
              <span className="auth-text">Password</span>
              <input
                className="auth-input"
                type="password"
                name="password"
                onChange={(e) => this.handleInput(e)}
              />
              <span className="button-container">
                <button
                  className="auth-button"
                  onClick={() => this.loginUser()}
                >
                  Login
                </button>
                <button
                  className="auth-button"
                  onClick={() => this.toggleRegistration()}
                >
                  Register
                </button>
              </span>
            </div>
          )}
        </div>
      </div>
    );
  }
}

export default connect(null, { userInfoToDux })(Auth);
