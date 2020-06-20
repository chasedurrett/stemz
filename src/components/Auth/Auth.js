import React, { Component } from "react";
import axios from "axios";

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
        this.props.history.push("/sample-pack-dashboard");
      })
      .catch((err) => console.log(err));
  };

  loginUser = () => {
    const { username, password } = this.state;
    axios
      .post("/auth/login", { username, password })
      .then((res) => {
        this.props.history.push("/sample-pack-dashboard");
      })
      .catch((err) => console.log(err));
  };

  render() {
    const { isRegistering } = this.state;
    return (
      <div>
        <h1>FIND YOUR SOUND</h1>
        <div>
          {isRegistering ? (
            <div>
              <input
                placeholder="Email.."
                name="email"
                onChange={(e) => this.handleInput(e)}
              />
              <input
                placeholder="Username.."
                name="username"
                onChange={(e) => this.handleInput(e)}
              />
              <input
                type="password"
                placeholder="Password.."
                name="password"
                onChange={(e) => this.handleInput(e)}
              />
              <button onClick={() => this.toggleRegistration()}>Cancel</button>
              <button onClick={() => this.registerUser()}>Register</button>
            </div>
          ) : (
            <div>
              <input
                placeholder="Username.."
                name="username"
                onChange={(e) => this.handleInput(e)}
              />
              <input
                type="password"
                placeholder="Password.."
                name="password"
                onChange={(e) => this.handleInput(e)}
              />
              <button onClick={() => this.loginUser()}>Login</button>
              <button onClick={() => this.toggleRegistration()}>
                Register
              </button>
            </div>
          )}
        </div>
      </div>
    );
  }
}

export default Auth;
