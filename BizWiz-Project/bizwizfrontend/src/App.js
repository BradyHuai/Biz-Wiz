import "./App.css";
import React from "react";
import TopBar from "./components/TopBar";
import MainPage from "./components/MainPage";
import { Switch, Route } from "react-router-dom";
import LoginPage from "./components/LoginPage";
import Home from "./features/HomePage/home";
import SideMenu from "./components/SideMenu";
import SignUpPage from "./components/SignUp";
import ProfilePage from "./components/ProfilePage";
import PortalPage from "./components/PortalPage";

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
        <Route exact path="/sign-up" component={SignUpPage} />
        <Route exact path="/pages/profilepage" component={ProfilePage} />
        <Route exact path="/portal" component={PortalPage} />
      </Switch>
    </div>
  );
}

export default App;
