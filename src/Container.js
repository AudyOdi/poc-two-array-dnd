// @flow

import React, {Component} from 'react';
import autobind from 'class-autobind';
import {DragDropContext} from 'react-dnd';
import HTML5Backend from 'react-dnd-html5-backend';
import DropContainer from './DropContainer';

const style = {
  minWidth: 400,
  maxWidth: 400,
  minHeight: 200,
  maxHeight: 200,
  overflowY: 'scroll',
  marginHorizontal: 10
};

class Container extends Component {
  _prevHoverLane: ?string = null;
  constructor(props) {
    super(props);
    autobind(this);
    this.state = {
      cardsBoxLeft: [
        {
          id: 1,
          text: 'Write a cool JS library'
        },
        {
          id: 2,
          text: 'Make it generic enough'
        },
        {
          id: 3,
          text: 'Write README'
        },
        {
          id: 4,
          text: 'Create some examples'
        },
        {
          id: 5,
          text:
            'Spam in Twitter and IRC to promote it (note that this element is taller than the others)'
        },
        {
          id: 6,
          text: '???'
        },
        {
          id: 7,
          text: 'PROFIT'
        }
      ],
      cardsBoxRight: [
        {
          id: 8,
          text: 'Baru'
        },
        {
          id: 9,
          text: 'Lagi'
        },
        {
          id: 10,
          text: '10'
        },
        {
          id: 11,
          text: '11'
        },
        {
          id: 12,
          text: '12'
        },
        {
          id: 13,
          text: '13'
        }
      ]
    };
  }

  moveCard(dragIndex, dragID, hoverIndex, hoverLane) {
    let {cardsBoxLeft, cardsBoxRight} = this.state;
    let dragCard = cardsBoxLeft.find(card => card.id === dragID);
    let currentDragLane = 'left';
    if (dragCard == null) {
      dragCard = cardsBoxRight.find(card => card.id === dragID);
      currentDragLane = 'right';
    }
    if (dragCard == null) {
      return;
    }
    if (hoverLane === 'left') {
      if (
        (this._prevHoverLane && this._prevHoverLane !== hoverLane) ||
        currentDragLane !== hoverLane
      ) {
        cardsBoxRight.splice(dragIndex, 1);
      } else {
        cardsBoxLeft.splice(dragIndex, 1);
      }
      cardsBoxLeft.splice(hoverIndex, 0, dragCard);
    } else if (hoverLane === 'right') {
      if (
        (this._prevHoverLane && this._prevHoverLane !== hoverLane) ||
        currentDragLane !== hoverLane
      ) {
        cardsBoxLeft.splice(dragIndex, 1);
      } else {
        cardsBoxRight.splice(dragIndex, 1);
      }
      cardsBoxRight.splice(hoverIndex, 0, dragCard);
    }
    this.setState({
      cardsBoxLeft,
      cardsBoxRight
    });
    this._prevHoverLane = hoverLane;
  }
  onDrop() {
    console.log('dropped');
    this._prevHoverLane = null;
  }

  render() {
    let {connectDropTarget} = this.props;
    const {cardsBoxLeft, cardsBoxRight} = this.state;
    return (
      <div style={{display: 'flex', flexDirection: 'row'}}>
        <DropContainer
          cards={cardsBoxLeft}
          moveCard={this.moveCard}
          onDrop={this.onDrop}
          lane="left"
          style={{...style, backgroundColor: 'red'}}
        />
        <DropContainer
          cards={cardsBoxRight}
          moveCard={this.moveCard}
          onDrop={this.onDrop}
          lane="right"
          style={{...style, backgroundColor: 'blue'}}
        />
      </div>
    );
  }
}

export default DragDropContext(HTML5Backend)(Container);
