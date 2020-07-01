import React, { Component } from 'react';
import './App.css';
import routes from './routes'
import Nav from './components/Nav/Nav'
import {withRouter} from 'react-router-dom'
import Header from './components/Header/Header';
import SamplePackFormStepOne from './components/SamplePackForm/StepOne/SamplePackFormStepOne'

class App extends Component {
  constructor(props){
    super(props)
    this.state = {
      creating: false
    }
    this.toggleCreating = this.toggleCreating.bind(this)
  }

  toggleCreating = () => this.setState({creating: !this.state.creating})

  render(){
    return (
      <div className="App">
        {this.props.location.pathname === '/' ? <div /> : (<div><Header/><Nav toggleCreating={this.toggleCreating}/></div>)}
        {!this.state.creating ? <div /> : <SamplePackFormStepOne toggleCreating={this.toggleCreating} />}
        {routes}
      </div>
    );
  }
}

export default withRouter(App);
