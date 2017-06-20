// @flow
import {
  ASK_REFRESH_RATES,
  ASK_REFRESH_RATES_FAILED,
  SET_RATES,
  SET_CURRENCY,
} from './actions';

import initialState from './initialState';
import type { Currency } from './initialState';

export default function CurrencyReducer(state: Currency = initialState, action: Object) {
  switch (action.type) {
    case ASK_REFRESH_RATES:
      return {
        ...state,
        isFetching: true,
      };

    case ASK_REFRESH_RATES_FAILED:
      return {
        ...state,
        isFetching: false,
        error: action.payload.error.message
      };

    case SET_RATES: {
      const { ETH, BTC, LTC, EUR, USD } = action.payload.data.rates;

      return {
        ...state,
        isFetching: false,
        lastUpdate: new Date(),
        rates: {
          ETH: 1 / ETH,
          BTC: 1 / BTC,
          LTC: 1 / LTC,
          EUR: 1 / EUR,
          USD: 1 / USD,
        }
      };
    }

    case SET_CURRENCY:
      return {
        ...state,
        currentCurrency: action.payload.currency,
      };

    default:
      return state;
  }
}
