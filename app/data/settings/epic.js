import { Observable } from 'rxjs';
import { combineEpics } from 'redux-observable';

import {
  SET_REFRESH_TIMER,
  TRIGGER_AUTO_REFRESH,
  STOP_AUTO_REFRESH
} from './actions';

import {
  ASK_REFRESH_RATES
} from '../currency/actions';

const triggerAutoRefreshEpic = (action$, store) =>
  action$.ofType(TRIGGER_AUTO_REFRESH, SET_REFRESH_TIMER)
    .mergeMap(() => {
      const state = store.getState();
      const refreshTimer = state.settings.refreshTimer;

      return Observable.interval(refreshTimer)
        .mapTo({ type: ASK_REFRESH_RATES })
        .takeUntil(action$.ofType(SET_REFRESH_TIMER, STOP_AUTO_REFRESH));
    });


export default combineEpics(
  triggerAutoRefreshEpic
);
