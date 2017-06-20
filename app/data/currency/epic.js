import { combineEpics } from 'redux-observable';

import endpointBuilder from './endpointBuilder';

import {
  ASK_REFRESH_RATES,
  refreshRatesFailed,
  setRates
} from './actions';

const refreshDataEpic = (action$, store, { getJSON }) =>
  action$.ofType(ASK_REFRESH_RATES)
    .mergeMap(action =>
      getJSON(endpointBuilder.getRates(action.payload))
        .map(res => setRates(res))
        .catch(err => store.dispatch(refreshRatesFailed(err.xhr.response.errors[0])))
        .retryWhen(err => {
          if (navigator.onLine) return err;

          store.dispatch(refreshRatesFailed({ message: 'Failed to connect with internet. Please check your network conditions.'}));

          return err.delay(5 * 1000);
        })
    );

export default combineEpics(
  refreshDataEpic,
);
