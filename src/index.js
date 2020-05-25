import React from 'react';

const mapProps = propsMapper => BaseComponent => {
  const factory = React.createFactory(BaseComponent);
  const hoc = props => factory(propsMapper(props));
  const hocNext = hoc(); 
  const hasOwner = hocNext._owner;
  if (hasOwner) return hocNext;  
  return hoc;
};

export const withProps = input => {
  const hoc = mapProps(props => ({
    ...props,
    ...(typeof input === 'function' ? input(props) : input),
  }));
  return hoc;
};