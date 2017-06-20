// @flow
import React from 'react';
import { connect } from 'react-redux';
import { ipcRenderer } from 'electron';

import {
  windowAppeared,
  windowDisappeared
} from 'Data/events/actions';

import {
  triggerAutoRefresh
} from 'Data/settings/actions';

import ErrorReporter from 'Components/ErrorReporter';
import FooterBar from './components/FooterBar';

type Props = {
  children: any,
  onWindowAppeared: Function,
  onWindowDisappeared: Function,
  triggerAutoRefresh: Function,
  errorMessage: ?string,
};

class App extends React.Component<void, Props, void> {
  componentDidMount(): void {
    ipcRenderer.on('_cryptowatch-shown', this.props.onWindowAppeared);
    ipcRenderer.on('_cryptowatch-hidden', this.props.onWindowDisappeared);

    this.props.triggerAutoRefresh();
  }

  render(): any {
    return (
      <div>
        <ErrorReporter message={this.props.errorMessage} />
        {this.props.children}
        <FooterBar />
      </div>
    );
  }
}

export default connect(
  (state: Object) => ({
    errorMessage: state.currency.error,
  }),
  (dispatch: Function) => ({
    onWindowAppeared: () => dispatch(windowAppeared()),
    onWindowDisappeared: () => dispatch(windowDisappeared()),
    triggerAutoRefresh: () => dispatch(triggerAutoRefresh())
  })
)(App);
