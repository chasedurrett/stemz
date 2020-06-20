import React, { Component } from "react";
import axios from "axios";
import { v4 as randomString } from "uuid";
import Dropzone from "react-dropzone";
import { GridLoader } from "react-spinners";
import {connect} from 'react-redux'
import store from '../../dux/store'

class UploadSampleForm extends Component {
  constructor() {
    super();
    const reduxState = store.getState()
    this.state = {
      isUploading: false,
      url: "",
      name: "",
      key: "",
      type: "",
      genre: "",
      instrument: "",
      id: reduxState.id,
    };
  }

  componentDidMount(){
    this.getUserId()
  }

  getUserId(){
    const reduxState = store.getState()
    this.setState({id: reduxState.id})
  }

  handleInput(e) {
    this.setState({
      [e.target.name]: e.target.value,
    });
  }

  handleDropdownChange(e) {
    this.setState({
      [e.target.name]: e.target.value,
    });
  }

  getSignedRequest = ([file]) => {
    this.setState({ isUploading: true });
    const fileName = `${randomString()}-${file.name.replace(/\s/g, "-")}`;

    axios
      .get("/api/signs3", {
        params: {
          "file-name": fileName,
          "file-type": file.type,
        },
      })
      .then((res) => {
        const { signedRequest, url } = res.data;
        this.uploadFile(file, signedRequest, url);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  uploadFile = (file, signedRequest, url) => {
    const options = {
      headers: {
        "Content-Type": file.type,
      },
    };

    axios
      .put(signedRequest, file, options)

      .then((res) => {
        this.setState({
          isUploading: false,
          url,
        });
        console.log(this.state.url);
      })
      .catch((err) => {
        this.setState({ isUploading: false });
        console.log(err);
        if (err.response.status === 403) {
          alert(`Check AWS Config`);
        } else {
          alert(`ERROR: ${err.status}\n ${err.stack}`);
        }
      });
  };

  createSample() {
    const { name, key, type, genre, instrument, url, id } = this.state;
    axios
      .post("/api/sample", { name, key, type, genre, instrument, url, id })
      .then((res) => {
        console.log(`Nice it worked!`);
        this.props.history.push('/samples-dashboard')
      })
      .catch((err) => console.log(err));
  }

  render() {
    const { isUploading } = this.state;
    console.log(this.state);
    return (
      <div>
        <div className="upload-sample-form">
          <h1>Upload a Sample</h1>
          <Dropzone
            onDropAccepted={this.getSignedRequest}
            multiple={false}
            accept="audio/*"
          >
            {({ getRootProps, getInputProps }) =>
              isUploading ? (
                <GridLoader />
              ) : (
                <div {...getRootProps()}>
                  <input {...getInputProps()} />
                  Drag & Drop a file or click me!
                </div>
              )
            }
          </Dropzone>
          <div>
            <input
              onChange={(e) => this.handleInput(e)}
              name="name"
              placeholder="Sample name.."
            />
            <input
              onChange={(e) => this.handleInput(e)}
              name="key"
              placeholder="Sample Key.. i.e. 'C min'"
            />
            <select name="type" onChange={(e) => this.handleDropdownChange(e)}>
              <option>Sample Type</option>
              <option value="1">Loop</option>
              <option value="2">One-Shot</option>
            </select>
            <select
              name="instrument"
              onChange={(e) => this.handleDropdownChange(e)}
            >
              <option>Instrument</option>
              <option value="1">Groove</option>
              <option value="2">Drums</option>
              <option value="3">Bass</option>
              <option value="4">Guitar</option>
              <option value="5">Synth</option>
              <option value="6">Percussion</option>
              <option value="7">Piano</option>
              <option value="8">Keys</option>
              <option value="9">Pad</option>
              <option value="10">Vocal</option>
              <option value="11">FX</option>
            </select>
            <select name="genre" onChange={(e) => this.handleDropdownChange(e)}>
              <option>Genre</option>
              <option value="1">Live Sound</option>
              <option value="2">Hip Hop</option>
              <option value="3">Trap</option>
              <option value="4">R & B</option>
              <option value="5">Soul</option>
              <option value="6">Electronic</option>
              <option value="7">Experimental</option>
              <option value="8">Lofi</option>
              <option value="9">Indie</option>
              <option value="10">Cinematic</option>
              <option value="11">Global</option>
            </select>
          </div>
        </div>
        <button onClick={() => this.createSample()}>Upload</button>
      </div>
    );
  }
}

const mapStateToProps = reduxState => reduxState

export default connect(mapStateToProps)(UploadSampleForm);
