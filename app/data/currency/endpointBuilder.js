export default {
  getRates: (currency = 'USD') => (`https://api.coinbase.com/v2/exchange-rates?currency=${currency}`),
};
