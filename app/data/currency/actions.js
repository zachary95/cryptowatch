export const ASK_REFRESH_RATES = 'CURRENCY/ASK_REFRESH_RATES';
export function refreshRates(currency = 'USD') {
  return {
    type: ASK_REFRESH_RATES,
    payload: currency,
  };
}

export const ASK_REFRESH_RATES_FAILED = 'CURRENCY/ASK_REFRESH_RATES/FAILED';
export function refreshRatesFailed(error) {
  return {
    type: ASK_REFRESH_RATES_FAILED,
    payload: {
      error
    },
  };
}

export const SET_RATES = 'CURRENCY/SET_RATES';
export function setRates(newRates) {
  return {
    type: SET_RATES,
    payload: { ...newRates }
  };
}

export const SET_CURRENCY = 'CURRENCY/SET_CURRENCY';
export function setCurrency(newCurrency = 'USD') {
  return (dispatch: Function): void => {
    dispatch(refreshRates(newCurrency));

    dispatch({
      type: SET_CURRENCY,
      payload: {
        currency: newCurrency,
      },
    });
  };
}
