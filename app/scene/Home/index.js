// @flow
import React from 'react';
import { connect } from 'react-redux';

import * as CurrencyAction from 'Data/currency/actions';
import CryptoLine from 'Components/CryptoLine';
import RefreshingText from 'Components/RefreshingText';

import './Home.css';

type DefaultProps = {
  lastUpdate: Date,
  isRefreshingRates: boolean
}

type Props = {
  refreshRate: Function,
  isRefreshingRates: ?boolean,
  lastUpdate: Date,
  currency: string,
  eth: number,
  btc: number,
  errorMessage: ?string,
};

class Home extends React.Component<DefaultProps, Props, void> {
  static defaultProps = {
    lastUpdate: new Date(),
    isRefreshingRates: false,
  };

  componentWillMount() {
    this.props.refreshRate();
  }

  render() {
    return (
      <div styleName="container">
        <CryptoLine amount={this.props.eth} deviseCode="ETH" amountDevise={this.props.currency} hideValues={this.props.isRefreshingRates} />
        <CryptoLine amount={this.props.btc} deviseCode="BTC" amountDevise={this.props.currency} hideValues={this.props.isRefreshingRates} />
        <RefreshingText lastUpdate={this.props.lastUpdate} isRefreshing={this.props.isRefreshingRates} styleName={`lastUpdate ${this.props.isRefreshingRates ? 'lastUpdate--updating' : ''}`} />
      </div>
    );
  }
}

function mapStateToProps(state: Object) {
  return {
    isRefreshingRates: state.currency.isFetching,
    currency: state.currency.currentCurrency,
    lastUpdate: state.currency.lastUpdate,
    eth: state.currency.rates.ETH,
    btc: state.currency.rates.BTC,
    errorMessage: state.currency.error,
  };
}

function mapDispatchToProps(dispatch: Function) {
  return {
    refreshRate: function dispatchRefreshRate(currentCurrency) {
      dispatch(CurrencyAction.refreshRates(currentCurrency));
    }
  };
}

function mergeProps(stateProps: Object, dispatchProps: Object, ownProps: Object) {
  return {
    ...stateProps,
    ...ownProps,
    refreshRate: () => dispatchProps.refreshRate(stateProps.currency),
  };
}

export default connect(
  mapStateToProps,
  mapDispatchToProps,
  mergeProps,
)(Home);
