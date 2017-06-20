import { combineEpics } from 'redux-observable';
import { ipcRenderer } from 'electron';
import PriceUtils from 'Utils/PriceUtils';

import {
  WINDOW_APPEARED,
  WINDOW_DISAPPEARED,
  UPDATED_TRAY
} from './actions';

import {
  SET_REFRESH_TIMER
} from '../settings/actions';

import {
  SET_RATES
} from '../currency/actions';

const windowAppearedEpic = (action$, store) =>
  action$.ofType(WINDOW_APPEARED)
    .mapTo({
      type: SET_REFRESH_TIMER,
      payload: {
        refreshTimer: store.getState().settings.normalRefreshTimer
      }
    });

const windowDisappearedEpic = (action$, store) =>
  action$.ofType(WINDOW_DISAPPEARED)
    .mapTo({
      type: SET_REFRESH_TIMER,
      payload: {
        refreshTimer: store.getState().settings.backgroundRefreshTimer
      }
    });

const trayUpdaterEpic = (action$, store) =>
  action$.ofType(SET_RATES)
    .map(() => {
      const { enabledCurrenciesInTray } = store.getState().settings;
      const { rates, currentCurrency } = store.getState().currency;

      const parsedCurrencies = Object.keys(rates)
        .filter(key => enabledCurrenciesInTray.indexOf(key) !== -1)
        .map(key => ({ [key]: PriceUtils.convertPrice(rates[key], currentCurrency) }));
      
      return ipcRenderer.send('_cryptowatch-update-rates', parsedCurrencies);
    })
    .mapTo({ type: UPDATED_TRAY });

export default combineEpics(
  windowAppearedEpic,
  windowDisappearedEpic,
  trayUpdaterEpic
);
