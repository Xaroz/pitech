import React from "react";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import "./App.css";
import { Exercise1 } from "./Pages/Exercise1";
import { NavBar } from "./Components/NavBar";
import { Exercise2 } from "./Pages/Exercise2";

function App() {
  return (
    <BrowserRouter>
      <NavBar />
      <Switch>
        <Route exact path="/" component={Exercise1} />
        <Route exact path="/exercise2" component={Exercise2} />
      </Switch>
    </BrowserRouter>
  );
}

export default App;
