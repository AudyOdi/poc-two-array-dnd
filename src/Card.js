// @flow

import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {findDOMNode} from 'react-dom';
import {DragSource, DropTarget} from 'react-dnd';
import types from './types';

const style = {
  border: '1px dashed gray',
  padding: '0.5rem 1rem',
  marginBottom: '.5rem',
  backgroundColor: 'white',
  cursor: 'move',
  minHeight: 50
};

const cardSource = {
  beginDrag(props) {
    return {
      id: props.id,
      index: props.index,
      itemLane: props.lane
    };
  }
};

const cardTarget = {
  hover(props, monitor, component) {
    const dragIndex = monitor.getItem().index;
    const dragID = monitor.getItem().id;
    const hoverIndex = props.index;
    const hoverLane = props.lane;
    const itemLane = monitor.getItem().itemLane;

    // if item that being drag in the same hover index
    // Don't replace items with themselves
    // if the item that being drag in the same hover index, but different lane, process it
    if (dragIndex === hoverIndex && hoverLane === itemLane) {
      return;
    }

    // Determine rectangle on screen
    const hoverBoundingRect = findDOMNode(component).getBoundingClientRect();

    // Get vertical middle
    const hoverMiddleY = (hoverBoundingRect.bottom - hoverBoundingRect.top) / 2;

    // Determine mouse position
    const clientOffset = monitor.getClientOffset();

    // Get pixels to the top
    const hoverClientY = clientOffset.y - hoverBoundingRect.top;

    // Only perform the move when the mouse has crossed half of the items height
    // When dragging downwards, only move when the cursor is below 50%
    // When dragging upwards, only move when the cursor is above 50%

    // Dragging downwards
    if (dragIndex < hoverIndex && hoverClientY < hoverMiddleY) {
      return;
    }

    // Dragging upwards
    if (dragIndex > hoverIndex && hoverClientY > hoverMiddleY) {
      return;
    }

    // Time to actually perform the action
    props.moveCard(dragIndex, dragID, hoverIndex, hoverLane);

    // Note: we're mutating the monitor item here!
    // Generally it's better to avoid mutations,
    // but it's good here for the sake of performance
    // to avoid expensive index searches.
    monitor.getItem().index = hoverIndex;
  },
  drop(props, monitor) {
    props.onDrop();
  }
};

class Card extends Component {
  static propTypes = {
    connectDragSource: PropTypes.func.isRequired,
    connectDropTarget: PropTypes.func.isRequired,
    index: PropTypes.number.isRequired,
    isDragging: PropTypes.bool.isRequired,
    id: PropTypes.any.isRequired,
    text: PropTypes.string.isRequired,
    moveCard: PropTypes.func.isRequired,
    onDrop: PropTypes.func.isRequired
  };

  render() {
    const {text, isDragging, connectDragSource, connectDropTarget} = this.props;
    const opacity = isDragging ? 0 : 1;

    return connectDragSource(
      connectDropTarget(<div style={{...style, opacity}}>{text}</div>)
    );
  }
}

function cardConnect(connect) {
  return {
    connectDropTarget: connect.dropTarget()
  };
}
function cardMonitorConnect(connect, monitor) {
  return {
    connectDragSource: connect.dragSource(),
    isDragging: monitor.isDragging()
  };
}

let Temp = DragSource(types.CARD, cardSource, cardMonitorConnect)(Card);

export default DropTarget(types.CARD, cardTarget, cardConnect)(Temp);
