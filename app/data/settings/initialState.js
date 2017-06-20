// @flow

export type Settings = {
  refreshTimer: number,
  normalRefreshTimer: number,
  backgroundRefreshTimer: number,
  enabledCurrenciesInTray: Array<string>
};

const initialState: Settings = {
  refreshTimer: 2 * 60 * 1000,
  normalRefreshTimer: 2 * 60 * 1000,
  backgroundRefreshTimer: 5 * 60 * 1000,
  enabledCurrenciesInTray: ['ETH', 'BTC'],
};

export default initialState;
