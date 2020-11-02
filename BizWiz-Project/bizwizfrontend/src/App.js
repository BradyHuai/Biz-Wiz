import "./App.css";
import React, { Component, useEffect } from "react";
import TopBar from "./components/TopBar";
import MainPage from "./components/MainPage";

function App() {
  return (
    <div className="App">
      <TopBar />
      <MainPage />
    </div>
  );
}

export default App;
