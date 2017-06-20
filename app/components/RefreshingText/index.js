// @flow
import React from 'react';
import TimeAgo from 'react-timeago';

type Props = {
  lastUpdate: ?Date,
  isRefreshing: ?boolean,
};

const RefreshingText = (props: Props) => {
  const { isRefreshing, lastUpdate, ...rest } = props;

  if (isRefreshing) {
    return <span {...rest}>refreshing ...</span>;
  }

  return <span {...rest}>refreshed <TimeAgo date={lastUpdate} />.</span>;
};

export default RefreshingText;
