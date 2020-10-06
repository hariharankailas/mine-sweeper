import React from "react";
import { BrowserRouter } from "react-router-dom";
import MainLanding from "./components/landing/mainLanding/MainLanding";
import "../node_modules/bootstrap/dist/css/bootstrap.min.css";
import "../node_modules/@fortawesome/fontawesome-free/js/all";
import "./App.scss";

const App = () => {
  return (
    <div className="App">
      <BrowserRouter>
        <MainLanding />
      </BrowserRouter>
    </div>
  );
};

export default App;
