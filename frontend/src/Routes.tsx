import React from "react";
import { Switch, Route } from "react-router-dom";
import HomePage from "./pages/Home";

const Routes: React.FC = () => {
  return (
    <Switch>
      <Route exact path="/" component={HomePage} />
    </Switch>
  );
};

export default Routes;
