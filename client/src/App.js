import React, { Component } from "react";
import { BrowserRoute as Router, Route } from "react-router-dom";
import "./App.css";
import Navbar from "./components/layout/Navbar";
import Footer from "./components/layout/Footer";
import Landing from "./components/layout/Landing";
import Register from "./components/auth/Register";
import Login from "./components/auth/Login";
class App extends Component {
  render() {
    return (
      <Router>
        <div className="App">
          <Navbar />
          <Route exact path="/" Component={Landing} />
          <div className="container">
            <Route exact path="/register" Component={Register} />
            <Route exact path="/login" Component={Login} />
          </div>
          <Footer />
        </div>
      </Router>
    );
  }
}

export default App;
