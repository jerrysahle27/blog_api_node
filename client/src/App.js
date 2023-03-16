import React, { Component } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import "./App.css";
import jwt_decode from "jwt-decode";
import setAuthToken from "./utils/setAuthToken";
import Navbar from "./components/layout/Navbar";
import Footer from "./components/layout/Footer";
import Landing from "./components/layout/Landing";
// import Register from "./components/auth/Register";
// import Login from "./components/auth/Login";
// import Dashboard from "./components/dashboard/dashboard";
// import { CreateProfile } from "./components/create-profile";
// import { EditProfile } from "./components/edit-profile";
import { Provider } from "react-redux";
// import store from "./store";
import { logoutUser, setCurrentUser } from "./actions/authActions";
// import PrivateRoute from "./components/common/PrivateRoute";
import { clearCurrentProfile } from "./actions/profileActions";
// import AddExperience from "./components/add-credentials/AddExperience";
// import AddEducation from "./components/add-credentials/AddEducation";
// import Profiles from "./components/profiles/Profiles";
// if (localStorage.jwtToken) {
//   setAuthToken(localStorage.jwtToken);
//   const decoded = jwt_decode(localStorage.jwtToken);
//   store.dispatch(setCurrentUser(decoded));

//   const currentTime = Date.now() / 1000;
//   if (decoded.exp < currentTime) {
//     store.dispatch(logoutUser());
//     store.dispatch(clearCurrentProfile());
//     window.location.href = "/login";
//   }
// }

const App = () => {
  // kk
  return (
    // <Provider store={store}>
    <Router>
      <div className="App">
        <Navbar />
        <Routes>
          {/* <Route exact path="/" element={<Landing />} /> */}
          {/* <div className="container"> */}
          {/* <Route exact path="/register" element={<Register />} />
              <Route exact path="/login" element={<Login />} />
              <Route exact path="/profiles" element={<Profiles />} />
              <Route>
                <PrivateRoute exact path="/dashboard" element={<Dashboard />} />
              </Route>
              <Route>
                <PrivateRoute
                  exact
                  path="/create-profile"
                  element={<CreateProfile />}
                />
              </Route>
              <Route>
                <PrivateRoute
                  exact
                  path="/edit-profile"
                  element={<EditProfile />}
                />
              </Route>
              <Route>
                <PrivateRoute
                  exact
                  path="/add-experience"
                  element={<AddExperience />}
                />
              </Route>
              <Route>
                <PrivateRoute
                  exact
                  path="/add-education"
                  element={<AddEducation />}
                />
              </Route> */}

          {/* </div> */}
        </Routes>
        <Footer />
      </div>
    </Router>
    // </Provider>
  );
};

export default App;
