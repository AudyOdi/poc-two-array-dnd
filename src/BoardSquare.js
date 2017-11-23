// @flow

import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {DropTarget} from 'react-dnd';
import Square from './Square';

import types from './types';

const squareTarget = {
  drop(props, monitor) {
    props.moveKnight(props.x, props.y);
  }
};

function collect(connect, monitor) {
  return {
    connectDropTarget: connect.dropTarget(),
    isOver: monitor.isOver()
  };
}

class BoardSquare extends Component {
  static propTypes = {
    x: PropTypes.number.isRequired,
    y: PropTypes.number.isRequired,
    connectDropTarget: PropTypes.func.isRequired,
    isOver: PropTypes.bool.isRequired
  };

  render() {
    const {x, y, connectDropTarget, isOver} = this.props;
    const black = (x + y) % 2 === 1;

    return connectDropTarget(
      <div
        style={{
          position: 'relative',
          width: '100%',
          height: '100%'
        }}
      >
        <Square black={black}>{this.props.children}</Square>
        {isOver && (
          <div
            style={{
              position: 'absolute',
              top: 0,
              left: 0,
              height: '100%',
              width: '100%',
              zIndex: 1,
              opacity: 0.5,
              backgroundColor: 'yellow'
            }}
          />
        )}
      </div>
    );
  }
}

export default DropTarget(types.KNIGHT, squareTarget, collect)(BoardSquare);
