// @flow
import React from 'react';
import { connect } from 'react-redux';

import * as CurrencyAction from 'Data/currency/actions';

import './FooterBar.css';

type Props = {
  currency: string,
  setCurrency: Function,
  askRefreshRates: Function,
};

class FooterBar extends React.Component<void, Props, void> {
  handleChangeCurrency = () => {
    const newCurrency = this.props.currency === 'USD' ? 'EUR' : 'USD';

    this.props.setCurrency(newCurrency);
  };

  handleReload = () => {
    this.props.askRefreshRates(this.props.currency);
  }

  render() {
    return (
      <div styleName="container">
        <a styleName="reload" onClick={this.handleReload}>📡</a>
        <a styleName="changeCurrency" onClick={this.handleChangeCurrency}>{this.props.currency}</a>
      </div>
    );
  }
}

function mapStateToProps(state: Object) {
  return {
    currency: state.currency.currentCurrency,
  };
}

function mapDispatchToProps(dispatch: Function) {
  return {
    setCurrency: function dispatchSetCurrency(currency: string): void {
      return dispatch(CurrencyAction.setCurrency(currency));
    },
    askRefreshRates: function dispatchAskRefreshRates(currency: string): any {
      return dispatch(CurrencyAction.refreshRates(currency));
    }
  };
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(FooterBar);
