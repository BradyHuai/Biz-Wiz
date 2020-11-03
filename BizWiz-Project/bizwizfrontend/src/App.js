import "./App.css";
import React, { Component, useEffect } from "react";
import TopBar from "./components/TopBar";
import MainPage from "./components/MainPage";
import { Switch, Route } from "react-router-dom";
import LoginPage from "./components/LoginPage";

function App() {
  return (
    <div className="App">
      <TopBar />

      <Switch>
        \
        <Route exact path="/" component={MainPage} />
        <Route exact path="/login" component={LoginPage} />
      </Switch>
    </div>
  );
}

export default App;
