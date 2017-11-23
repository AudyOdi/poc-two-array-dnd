// @flow
import React, {Component} from 'react';
import {PropTypes} from 'prop-types';
import {findDOMNode} from 'react-dom';
import {DropTarget} from 'react-dnd';
import Card from './Card';

import types from './types';

const cardTarget = {
  hover(props, monitor, component) {},
  drop(props, monitor) {
    const dragIndex = monitor.getItem().index;
    const dragID = monitor.getItem().id;
    const hoverLane = props.lane;
    if (!monitor.didDrop()) {
      props.moveCard(dragIndex, dragID, props.cards.length - 0, hoverLane);
      props.onDrop();
    }
  }
};

function cardConnect(connect) {
  return {
    connectDropTarget: connect.dropTarget()
  };
}

class DropContainer extends Component {
  static propTypes = {
    connectDropTarget: PropTypes.func.isRequired
  };
  render() {
    let {connectDropTarget, style, cards, moveCard, onDrop, lane} = this.props;
    return connectDropTarget(
      <div style={style}>
        {cards.map((card, i) => (
          <Card
            key={card.id}
            index={i}
            id={card.id}
            text={card.text}
            moveCard={moveCard}
            onDrop={onDrop}
            lane={lane}
          />
        ))}
      </div>
    );
  }
}

export default DropTarget(types.CARD, cardTarget, cardConnect)(DropContainer);
