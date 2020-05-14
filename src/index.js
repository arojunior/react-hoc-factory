import React from 'react';

export const mapProps = propsMapper => BaseComponent => {
  const factory = React.createFactory(BaseComponent);
  const hoc = props => factory(propsMapper(props));
  return hoc;
};

export const withProps = input => {
  const hoc = mapProps(props => ({
    ...props,
    ...(typeof input === 'function' ? input(props) : input),
  }));
  return hoc;
};