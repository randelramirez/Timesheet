import { BrowserRouter, Switch, Route } from "react-router-dom";

import "./App.css";

import Timesheet from "./containers/Timesheet/Timesheet";
import Login from "./containers/Login/Login";
import MainPage from "./pages/MainPage/MainPage";

function App() {
  return (
    <BrowserRouter>
      <Switch>
        <Route path="/" exact component={Login} />
        <Route path="/create-timesheet/" component={Timesheet} />
        <Route path="/main/" component={MainPage} />
      </Switch>
    </BrowserRouter>
  );
}

export default App;
