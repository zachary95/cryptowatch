// @flow
import React from 'react';

import './ErrorReporter.css';

type Props = {
  message: ?string,
};

const ErrorReporter = (props:Props) => {
  if (!props.message) {
    return <div />;
  }

  return (
    <div styleName="container">
      <div styleName="scrollWrapper">
        <p styleName="message">{props.message}</p>
      </div>
    </div>
  );
};

ErrorReporter.defaultProps = {
  message: ''
};

export default ErrorReporter;
