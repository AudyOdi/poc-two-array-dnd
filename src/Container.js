// @flow

import React, {Component} from 'react';
import autobind from 'class-autobind';
import {DragDropContext} from 'react-dnd';
import HTML5Backend from 'react-dnd-html5-backend';
import DropContainer from './DropContainer';

const style = {
  minWidth: 400,
  maxWidth: 400,
  minHeight: 300,
  maxHeight: 300,
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
          text: '1'
        },
        {
          id: 2,
          text: '2'
        },
        {
          id: 3,
          text: '3'
        },
        {
          id: 4,
          text: '4'
        },
        {
          id: 5,
          text: '5'
        },
        {
          id: 6,
          text: '6'
        },
        {
          id: 7,
          text: '7'
        },
        {
          id: 8,
          text: '8'
        },
        {
          id: 9,
          text: '9'
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
      ],
      cardsBoxRight: [
        {
          id: 14,
          text: '14'
        },
        {
          id: 15,
          text: '15'
        },
        {
          id: 16,
          text: '16'
        },
        {
          id: 17,
          text: '17'
        },
        {
          id: 18,
          text: '18'
        },
        {
          id: 19,
          text: '19'
        },
        {
          id: 20,
          text: '20'
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
