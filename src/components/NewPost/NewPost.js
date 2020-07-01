import React, {Component} from "react";
import axios from "axios";
import "./NewPost.css"

export default class NewPost extends Component {
  constructor() {
    super();
    this.state = {
      title: "",
      content: "",
    };
  }

  createPost() {
    const { title, content } = this.state;
    axios
      .post("/api/newpost", { title, content })
      .then((res) => {
        this.props.history.push("/forum-dashboard");
      })
      .catch((err) => console.log(err));
  }

  handleInput(e) {
    this.setState({
      [e.target.name]: e.target.value,
    });
  }

  render() {
    return (
      <div className="form-container">
          <div className="form-body">
        <input placeholder="Post title.." name="title" onChange={(e) => this.handleInput(e)} />
        <textarea placeholder="Write about something here.." name="content" onChange={(e) => this.handleInput(e)} />
        <button onClick={() => this.createPost()}>Submit</button>
        </div>
      </div>
    );
  }
}
