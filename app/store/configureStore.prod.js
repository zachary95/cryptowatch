import { createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import { createBrowserHistory } from 'history';
import { routerMiddleware } from 'react-router-redux';
import { createEpicMiddleware } from 'redux-observable';
import { ajax } from 'rxjs/observable/dom/ajax';

import { rootReducer, rootEpic } from '../reducer';

const history = createBrowserHistory();

const router = routerMiddleware(history);
const epic = createEpicMiddleware(rootEpic, {
  dependencies: { getJSON: ajax.getJSON }
});

const enhancer = applyMiddleware(thunk, router, epic);

function configureStore(initialState) {
  return createStore(rootReducer, initialState, enhancer);
}

export default { configureStore, history };
