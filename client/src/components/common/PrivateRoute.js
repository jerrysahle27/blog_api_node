import React from "react";
import { PropTypes } from "prop-types";
import { connect } from "react-redux";
import { Route, Link } from "react-router-dom";
const PrivateRoute = ({ component: Component, auth, ...rest }) => {
  <Route
    {...rest}
    render={(props) =>
      auth.isAuthenticated === true ? (
        <Component {...props} />
      ) : (
        <Link to="/login" />
      )
    }
  />;
};
PrivateRoute.PropTypes = {
  auth: PropTypes.object.isRequired,
};
const mapStateToProps = (state) => ({
  auth: state.auth,
});
export default connect(PrivateRoute);
