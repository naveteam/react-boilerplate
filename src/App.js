import React, { Component } from 'react';
import { BrowserRouter } from 'react-router-dom';
import Routes from './Routes';
import './App.css';

class App extends Component {
  render() {
    return (
      <BrowserRouter>
        <Routes />
      </BrowserRouter>
    );
  }
}

export default App;
