// @flow
import React from 'react';

type Props = {
  label: string,
  id: string,
  onChange: Function,
  value: ?number,
}

const Range = (props: Props) => (
  <div>
    <label htmlFor={props.id}>{props.label}</label>
    <input type="range" id={props.id} value={props.value} onChange={props.onChange} />
  </div>
);

Range.defaultProps = {
  value: 0,
};

export default Range;
