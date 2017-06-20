// @flow
import React from 'react';

import Price from 'Components/Price';

import './CryptoLine.css';

type Props = {
  amount: number,
  amountDevise: string,
  deviseCode: string,
  hideValues: ?boolean,
}

const CryptoLine = (props: Props) => (
  <div styleName="container">
    <span styleName="deviseCode">{props.deviseCode}</span>
    <Price styleName="amount" amount={props.amount} deviseCode={props.amountDevise} hideValues={props.hideValues} />
  </div>
);

CryptoLine.defaultProps = {
  hideValues: false,
};

export default CryptoLine;
