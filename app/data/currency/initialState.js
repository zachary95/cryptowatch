// @flow

export type Rates = {
  ETH: number,
  BTC: number,
  LTC: number,
  EUR: number,
  USD: number,
}

export type Currency = {
  rates: Rates,
  lastUpdate: Date,
  currentCurrency: string,
  source: string,
  isFetching: boolean,
  error: string,
};

const initialState: Currency = {
  rates: {
    ETH: 0,
    BTC: 0,
    LTC: 0,
    EUR: 0,
    USD: 0,
  },
  lastUpdate: new Date(),
  currentCurrency: 'USD',
  source: 'coinbase',
  isFetching: false,
  error: ''
};

export default initialState;
