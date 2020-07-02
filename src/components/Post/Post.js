import React, { Component } from "react";
import axios from "axios";
import { connect } from "react-redux";
import "./Post.css";

class Post extends Component {
  constructor(props) {
    super(props);
    this.state = {
      post: [],
      editing: false,
      title: "",
      content: "",
    };
  }

  componentDidMount() {
    this.getPost();
  }

  toggleEdit() {
    this.setState({
      editing: !this.state.editing,
    });
  }

  handleInput(e) {
    this.setState({
      [e.target.name]: e.target.value,
    });
  }

  getPost() {
    const { postid } = this.props.match.params;
    axios
      .get(`/api/post/${postid}`)
      .then((res) => {
        const { title, content } = res.data[0];
        this.setState({
          post: res.data,
          title,
          content,
        });
      })
      .catch((err) => console.log(err));
  }

  submitEdit(id) {
    const postid = id;
    const { title, content } = this.state;
    axios
      .put(`/api/editpost/${postid}`, { title, content })
      .catch((err) => console.log(err));
    this.getPost();
    this.toggleEdit()
  }

  deletePost(id) {
    const postid = id;
    axios
      .delete(`/api/delete/${postid}`)
      .then((res) => {
        this.props.history.push("/forum-dashboard");
      })
      .catch((err) => console.log(err));
  }

  render() {
    const { editing } = this.state;
    const { id } = this.props;
    const dataMap = this.state.post.map((e) => {
      return (
        <div className="post-body" key={e.id}>
          <h3>{e.username}</h3>
          <div className="post-title">
            {editing ? (
              <input
                name="title"
                value={this.state.title}
                onChange={(e) => this.handleInput(e)}
              />
            ) : (
              <h2>{e.title}</h2>
            )}
          </div>
          <div className="post-content">
            {editing ? (
              <textarea
                name="content"
                value={this.state.content}
                onChange={(e) => this.handleInput(e)}
              />
            ) : (
              <p>{e.content}</p>
            )}
          </div>
          {id === e.author_id ? (
            <input
              type="button"
              value="Delete"
              onClick={() => this.deletePost(e.id)}
            />
          ) : null}
          {id === e.author_id ? (
            editing ? (
              [
                <input
                  type="button"
                  value="Cancel"
                  onClick={() => this.toggleEdit()}
                />,
                <input
                  type="button"
                  value="Submit"
                  onClick={() => this.submitEdit(e.id)}
                />,
              ]
            ) : (
              <input
                type="button"
                value="Edit"
                onClick={() => this.toggleEdit()}
              />
            )
          ) : null}
        </div>
      );
    });
    return <div className="post-container">{dataMap}</div>;
  }
}

const mapStateToProps = (reduxState) => reduxState;

export default connect(mapStateToProps)(Post);
