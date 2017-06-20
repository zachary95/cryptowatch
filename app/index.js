import React from 'react';
import { render } from 'react-dom';
import { AppContainer } from 'react-hot-loader';

import Root from './scene/Root';
import { configureStore, history } from './store/configureStore';
import './styles/app.global.css';

const store = configureStore();

render(
  <AppContainer>
    <Root store={store} history={history} />
  </AppContainer>,
  document.getElementById('root')
);

if (module.hot) {
  module.hot.accept('./scene/Root', () => {
    // eslint-disable-next-line global-require
    const NextRoot = require('./scene/Root');
    render(
      <AppContainer>
        <NextRoot store={store} history={history} />
      </AppContainer>,
      document.getElementById('root')
    );
  });
}
