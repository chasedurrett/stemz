import React, { Component } from "react";
import { Link } from "react-router-dom";
import "./ForumDashboard.css";
import axios from "axios";

class ForumDashboard extends Component {
  constructor() {
    super();
    this.state = {
      posts: [],
    };
  }

  componentDidMount() {
    this.getPosts();
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
    const posts = this.state.posts.map((e) => {
      return (
        <div key={e.id} className="post-card">
          <Link to={{pathname: `/post/${e.id}`}}><h2>{e.title}</h2></Link>
          <h3>{e.username}</h3>
        </div>
      );
    });
    return (
      <div className="forum-dashboard-container">
        forusdfgasgasdfgsadfgasdfgm
        <Link to="/new-post">New post</Link>
        {posts}
      </div>
    );
  }
}

export default ForumDashboard;
