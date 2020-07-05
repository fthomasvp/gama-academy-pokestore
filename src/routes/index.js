import React from 'react';

import { BrowserRouter, Route, Switch } from 'react-router-dom';

import Home from '../pages/home';

const Routes = () => {
  return (
    <BrowserRouter>
      <Switch>
        <Route exact path="/">
          <Home />
        </Route>

        {/* Handle Not Found page */}
        <Route>
          <div>Sorry! This page does not exist :(</div>
        </Route>
      </Switch>
    </BrowserRouter>
  );
};

export default Routes;
