import React, { Component } from "react";
import axios from "axios";
import "./Post.css";

class Post extends Component {
  constructor(props) {
    super(props);
    this.state = {
      post: [],
    };
  }

  componentDidMount(){
      this.getPost()
  }

  getPost() {
    const { postid } = this.props.match.params;
    axios
      .get(`/api/post/${postid}`)
      .then((res) => {
        this.setState({
          post: res.data,
        });
      })
      .catch((err) => console.log(err));
  }

  render() {
    const dataMap = this.state.post.map((e) => {
      return (
        <div key={e.id}>
          <h2>{e.title}</h2>
          <h3>{e.username}</h3>
          <p>{e.content}</p>
        </div>
      );
    });
    console.log(this.state)
    return <div className="post-container">{dataMap}</div>;
  }
}

export default Post;
