import React, { useEffect } from "react";
import {
  Switch,
  BrowserRouter as Router,
  Route,
  Redirect,
} from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

import { LoginScreen, TodoListScreen } from "./Screens";
import { usesrService } from "./services/auth/api";
import { Header } from "./Components/Common/Header";

const PrivateRoute = ({ isAuthenticated, component, ...options }) => {
  if (isAuthenticated) {
    return (
      <div>
        <Header />
        <Route {...options} component={component} />
      </div>
    );
  } else {
    return <Redirect to="/login" />;
  }
};

const PublicRoute = ({ isAuthenticated, component, ...options }) => {
  if (isAuthenticated) {
    return <Redirect to="/" />;
  } else {
    return <Route {...options} component={component} />;
  }
};

const Routes = () => {
  const dispatch = useDispatch();
  const { auth } = useSelector((state) => ({
    auth: state.auth,
  }));
  const { isAuthenticated } = auth;

  useEffect(() => {
    dispatch(usesrService());
  }, []);
  return (
    <Router>
      <Switch>
        <PublicRoute
          isAuthenticated={isAuthenticated}
          path="/login"
          component={LoginScreen}
        />

        <PrivateRoute
          isAuthenticated={isAuthenticated}
          path="/"
          exact={true}
          component={TodoListScreen}
        />
      </Switch>
    </Router>
  );
};

export default Routes;
