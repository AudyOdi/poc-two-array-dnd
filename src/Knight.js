// @flow

import React, {Component} from 'react';
import {DragSource} from 'react-dnd';
import PropTypes from 'prop-types';
import types from './types';

/*
This is because there is nothing to describe: there is literally a single draggable object in the whole application! If we had a bunch of chess pieces, it might be a good idea to use the props parameter and return something like { pieceId: props.id }. In our case, an empty object will suffice.
*/
const knightSource = {
  beginDrag(props) {
    return {};
  }
};

function collect(connect, monitor) {
  return {
    connectDragSource: connect.dragSource(),
    isDragging: monitor.isDragging()
  };
}

class Knight extends Component {
  static propTypes = {
    connectDragSource: PropTypes.func.isRequired,
    isDragging: PropTypes.bool.isRequired
  };
  render() {
    const {connectDragSource, isDragging} = this.props;
    return connectDragSource(
      <div
        style={{
          opacity: isDragging ? 0.1 : 1,
          fontSize: 50,
          fontWeight: 'bold',
          cursor: 'move',
          backgroundColor: 'transparent'
        }}
      >
        ♘
      </div>
    );
  }
}

export default DragSource(types.KNIGHT, knightSource, collect)(Knight);
