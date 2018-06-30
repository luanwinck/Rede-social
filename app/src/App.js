import React, { Component } from 'react';
import { Switch, Route, Redirect, Link } from 'react-router-dom'

import axios from 'axios'

import './App.css'

import LoginForm from './scenes/LoginForm/LoginForm'
import RegisterForm from './scenes/RegisterForm/RegisterForm'
import Home from './scenes/Home/Home'


import Loading from './components/generic/Loaging/Loading'



class App extends Component {

  constructor() {
    super()
    this.axiosConfig()
    this.toggleNavbar = this.toggleNavbar.bind(this);
    this.state = {
      collapsed: true,
      loading: false
    };
  }

  axiosConfig() {
    const self = this
    axios.interceptors.request.use((config) => {
      self.toggleLoading()
      return config
    });

    axios.interceptors.response.use((response) => {
      self.toggleLoading()
      return response;
    }, (error) => {
      self.toggleLoading()
      return Promise.reject(error)
    })
  }

  toggleLoading() {
    this.setState({
      loading: !this.state.loading
    });
  }

  toggleNavbar() {
    this.setState({
      collapsed: !this.state.collapsed
    });
  }

  render() {
    return (
      <div className="App">

        <div className="App--content">
        {this.state.loading && <Loading />}

        <Switch>
            <Route path="/login" component={LoginForm}/>
            <Route path="/home" component={Home}/>
            <Route path="/registrar" component={RegisterForm}/>
            
            <Redirect to="/login" />
        </Switch>
        </div>
      </div>
    );
  }
}

export default App;
