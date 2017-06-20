// @flow

type Locales = {
  EUR: string,
  USD: string
};

const priceLocale: Locales = {
  EUR: 'fr',
  USD: 'en',
};

class PriceUtils {
  static getLocale(deviseCode: string): string {
    return priceLocale[deviseCode];
  }

  static convertPrice(price: number, deviseCode: string): string {
    // $FlowFixMe — https://github.com/facebook/flow/issues/4036
    return price.toLocaleString(priceLocale[deviseCode], {
      style: 'currency',
      currency: deviseCode,
    });
  }
}

export default PriceUtils;
