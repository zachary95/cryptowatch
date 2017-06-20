// @flow
import { combineEpics } from 'redux-observable';
import { combineReducers } from 'redux';
import { routerReducer as router } from 'react-router-redux';

import currencyReducer from './data/currency/reducer';
import settingsReducer from './data/settings/reducer';
import eventsReducer from './data/events/reducer';

import currencyEpic from './data/currency/epic';
import settingsEpic from './data/settings/epic';
import eventsEpic from './data/events/epic';

export const rootReducer = combineReducers({
  currency: currencyReducer,
  settings: settingsReducer,
  events: eventsReducer,
  router,
});

export const rootEpic = combineEpics(
  currencyEpic,
  settingsEpic,
  eventsEpic
);
