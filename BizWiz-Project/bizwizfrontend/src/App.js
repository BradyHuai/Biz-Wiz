import "./App.css";
import React from "react";
import TopBar from "./components/TopBar";
import MainPage from "./components/MainPage";
import { Switch, Route } from "react-router-dom";
import LoginPage from "./components/LoginPage";
import Home from "./features/HomePage/home";
import SideMenu from "./components/SideMenu";
import SignUpBusiness from "./components/SignUpBusiness";
import SignUpIndividual from "./components/SignUpIndividual";
import ProfilePage from "./components/ProfilePage";
import PortalPage from "./components/PortalPage";
import Postpage from "./components/PostPage";
import EditProfile from "./components/EditProfile";
import Postjob from "./components/PostjobPage";
import MapSearch from "./components/MapSearch";
import EditApplication from "./components/EditApplication";

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
        <Route exact path="/sign-up-business" component={SignUpBusiness} />
        <Route exact path="/sign-up-individual" component={SignUpIndividual} />
        <Route exact path="/pages/profilepage" component={ProfilePage} />
        <Route exact path="/pages/post" component={Postpage} />
        <Route exact path="/pages/post-job" component={Postjob} />
        <Route exact path="/portal" component={PortalPage} />
        <Route exact path="/pages/edit" component={EditProfile} />
        <Route exact path="/pages/edit-application" component={EditApplication} />
        <Route exact path="/search" component={MapSearch} />
      </Switch>
    </div>
  );
}

export default App;
