// @flow
import React from 'react';
import PriceUtils from 'Utils/PriceUtils';

type Props = {
  amount: number,
  deviseCode: string,
  hideValues: ?boolean,
};

const Price = (props: Props) => {
  const { amount, deviseCode, hideValues, ...rest } = props;

  if (hideValues) {
    return (
      <span {...rest}>---</span>
    );
  }

  const displayedAmount = PriceUtils.convertPrice(amount, deviseCode);

  return (
    <span {...rest}>{displayedAmount}</span>
  );
};

Price.defaultProps = {
  hideValues: false,
};

export default Price;
