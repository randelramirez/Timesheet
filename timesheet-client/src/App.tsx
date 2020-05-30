import React from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';

import logo from './logo.svg';
import './App.css';

import Timesheet from './containers/Timesheet/Timesheet';
import Login from './containers/Login/Login';

function App() {
  // return (
  //   <div className="App">
  //     <header className="App-header">
  //       <img src={logo} className="App-logo" alt="logo" />
  //       <p>
  //         Edit <code>src/App.tsx</code> and save to reload.
  //       </p>
  //       <a
  //         className="App-link"
  //         href="https://reactjs.org"
  //         target="_blank"
  //         rel="noopener noreferrer"
  //       >
  //         Learn React
  //       </a>
  //     </header>
  //   </div>
  // );

  return (
    // <BrowserRouter>
    //   <Login />
    // </BrowserRouter>
    <BrowserRouter>
      <Switch>
        <Route path="/" exact component={Login} />
        <Route path="/timesheet" component={Timesheet} />
      </Switch>
    </BrowserRouter>
  );
}

export default App;
