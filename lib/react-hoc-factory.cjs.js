'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

function _interopDefault (ex) { return (ex && (typeof ex === 'object') && 'default' in ex) ? ex['default'] : ex; }

var React = _interopDefault(require('react'));

const mapProps = propsMapper => BaseComponent => {
  const factory = React.createFactory(BaseComponent);
  const hoc = props => factory(propsMapper(props));
  return hoc;
};

const withProps = input => {
  const hoc = mapProps(props => ({
    ...props,
    ...(typeof input === 'function' ? input(props) : input),
  }));
  return hoc;
};

exports.mapProps = mapProps;
exports.withProps = withProps;
