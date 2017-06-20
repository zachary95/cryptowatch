import React from 'react';
import { Switch, Route } from 'react-router';
import App from './scene/App';
import Home from './scene/Home';

export default () => (
  <App>
    <Switch>
      <Route path="/" component={Home} />
    </Switch>
  </App>
);
