import React, { Component } from "react";
import { connect } from "react-redux";
import store from "../../dux/store";
import axios from "axios";
import Sample from "../Sample/Sample";

class Profile extends Component {
  constructor() {
    super();
    const reduxState = store.getState();
    this.state = {
      username: reduxState.username,
      email: reduxState.email,
      userSamples: [],
    };
  }

  componentDidMount() {
    this.getUserSamples();
    this.getUser()
  }

  getUser() {
    const reduxState = store.getState();
    this.setState({
      username: reduxState.username,
      email: reduxState.email,
    });
  }

  getUserSamples() {
    axios.get(`/api/user-samples`).then((res) => {
      this.setState({ userSamples: res.data });
    })
    .catch(err => console.log(err))
  }

  render() {
    const userSamples = this.state.userSamples.map((e) => {
      return (
        <Sample
          key={e.id}
          id={e.id}
          sampleType={e.sample_type}
          name={e.name}
          sampleKey={e.sample_key}
          url={e.sample_url}
          instrument={e.instrument}
          genre={e.genre}
          author={e.username}
        />
      );
    });
    const { username, email } = this.state;
    return (
      <div>
        <h2>{username}</h2>
        <h2>{email}</h2>
        {userSamples}
      </div>
    );
  }
}

const mapStateToProps = (reduxState) => reduxState;

export default connect(mapStateToProps)(Profile);
