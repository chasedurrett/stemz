import React, { Component } from "react";
import { Link } from "react-router-dom";
import "./ForumDashboard.css";
import axios from "axios";
import logo from "../Header/stemsheaderlogo2.png";

class ForumDashboard extends Component {
  constructor() {
    super();
    this.state = {
      posts: [],
      title: "",
    };
  }

  componentDidMount() {
    this.getPosts();
  }

  handleInput(e) {
    this.setState({
      [e.target.name]: e.target.value,
    });
  }

  getPosts() {
    axios
      .get("/api/getposts")
      .then((res) => {
        this.setState({
          posts: res.data,
        });
      })
      .catch((err) => console.log(err));
  }

  render() {
    const posts = this.state.posts
      .filter((e) => {
        return e.title.includes(this.state.title);
      })
      .map((e) => {
        return (
          <div key={e.id} className="post-card">
            <div className="post-info-container">
              <Link className="title" to={{ pathname: `/post/${e.id}` }}>
                <h2>{e.title}</h2>
              </Link>
              <h3 className="username-post">{e.username}</h3>
            </div>
          </div>
        );
      });
    return (
      <div className="forum-dashboard-container">
        <div className="header-wrapper">
          <div className="forum-header"></div>
          <div className="forum-nav">
            <div className="nav-logo-container">
              <img style={{ width: 30, height: 30 }} src={logo} />
            </div>
            <div className="search-nav">
              <input
                type="text"
                name="title"
                placeholder="Search Posts.."
                style={{
                  height: 30,
                  width: 300,
                  borderRadius: 4,
                  fontSize: 15,
                }}
                onChange={(e) => this.handleInput(e)}
              />
              <Link to="/new-post">
                <button style={{ height: 35, width: 100, fontSize: 15 }}>
                  New post
                </button>
              </Link>
            </div>
          </div>
        </div>
        <div className="posts-table">
          <h3 className="thread-title">Start a thread or ask a question!</h3>
          {posts}
        </div>
        <div className="posts-sidebar">
          <h3>Beginner Resources:</h3>
          <div className="sidebar-container">
            <ul>
              <li>
                <a href="https://www.waves.com/six-stages-of-music-production">
                  6 Stages of Music Production
                </a>
              </li>
              <li>
                <a href="https://rolandcorp.com.au/blog/computer-music-production-for-beginners-part-1">
                  The Roland Essentials
                </a>
              </li>
              <li>
                <a href="https://www.musictech.net/tutorials/beginners-guide/">
                  Music Tech Beginner Guide
                </a>
              </li>
              <li>
                <a href="https://www.producerspot.com/5-ultimate-music-production-tips-for-the-beginners">
                  Producer Spot
                </a>
              </li>
            </ul>
          </div>
        </div>
      </div>
    );
  }
}

export default ForumDashboard;
