import React, { Component } from "react";
import { connect } from "react-redux";
import store from "../../dux/store";
import axios from "axios";
import Sample from "../Sample/Sample";
import {Link} from 'react-router-dom'
import "./Profile.css";

class Profile extends Component {
  constructor() {
    super();
    const reduxState = store.getState();
    this.state = {
      username: reduxState.username,
      email: reduxState.email,
      userSamples: [],
      userSamplePacks: [],
      toggleView: false,
    };
  }

  componentDidMount() {
    this.getUserSamples();
    this.getUserSamplePacks();
    this.getUser();
  }

  viewSamplePacks() {
    this.setState({
      toggleView: true,
    });
  }
  viewSamples() {
    this.setState({
      toggleView: false,
    });
  }

  getUser() {
    const reduxState = store.getState();
    this.setState({
      username: reduxState.username,
      email: reduxState.email,
    });
  }

  getUserSamplePacks() {
    axios
      .get("/api/usersamplepacks")
      .then((res) => {
        this.setState({
          userSamplePacks: res.data,
        });
      })
      .catch((err) => console.log(err));
  }

  getUserSamples() {
    axios
      .get(`/api/user-samples`)
      .then((res) => {
        this.setState({ userSamples: res.data });
      })
      .catch((err) => console.log(err));
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
    const userSamplePacks = this.state.userSamplePacks.map((e) => (
      <div className="sample-pack-container" key={e.id}>
        <div className="img-container">
          <img className="sample-pack-img" alt="sample pack" src={e.img} />
        </div>
        <div className="sample-pack-name-container">
          <Link className="sample-pack-name" to={{ pathname: `/samplepack/${e.id}` }}>
            <h2 className="sample-pack-name">{e.name}</h2>
          </Link>
        </div>
      </div>
    ));
    const { username, email } = this.state;
    console.log(this.state.toggleView);
    return (
      <div className="profile-container">
        <div className="profile-header">
          <div className="user-info">
            <h2>{username}</h2>
            <h2>{email}</h2>
          </div>
        </div>
        <div className="profile-nav">
          <button onClick={() => this.viewSamples()}>User samples</button>
          <button onClick={() => this.viewSamplePacks()}>
            User samplepacks
          </button>
        </div>
        <div className="user-content-container">
          {!this.state.toggleView ? (
            <div className="user-samples-container">{userSamples}</div>
          ) : (
            <div className="user-samplepack-container">{userSamplePacks}</div>
          )}
        </div>
      </div>
    );
  }
}

const mapStateToProps = (reduxState) => reduxState;

export default connect(mapStateToProps)(Profile);
