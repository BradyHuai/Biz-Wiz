import "./App.css";
import React, { Component, useEffect } from "react";
import TopBar from "./components/TopBar";
import MainPage from "./components/MainPage";
import { Switch, Route } from "react-router-dom";
import LoginPage from "./components/LoginPage";
import Home from "./features/HomePage/home";
import SideMenu from "./components/SideMenu";

function App() {
  return (
    <div className="App">
      <TopBar />
      <Switch>
        \
        <Route path="/pages" component={SideMenu} />
      </Switch>

      <Switch>
        \
        <Route exact path="/" component={MainPage} />
        <Route exact path="/login" component={LoginPage} />
        <Route exact path="/pages/home" component={Home} />
      </Switch>
    </div>
  );
}

export default App;
