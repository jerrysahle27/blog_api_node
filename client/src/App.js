import React, { Component } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import "./App.css";
import Navbar from "./components/layout/Navbar";
import Footer from "./components/layout/Footer";
import Landing from "./components/layout/Landing";
import Register from "./components/auth/Register";
import Login from "./components/auth/Login";
import { Provider } from "react-redux";
import store from "./store";
class App extends Component {
  render() {
    return (
      // <Provider store={store}>
      <Router>
        <div className="App">
          <Navbar />
          <Routes>
            <Route exact path="/" element={<Landing />} />
            {/* <div className="container"> */}
            <Route exact path="/register" element={<Register />} />
            <Route exact path="/login" element={<Login />} />
            {/* </div> */}
          </Routes>
          <Footer />
        </div>
      </Router>
      // </Provider>
    );
  }
}

export default App;
