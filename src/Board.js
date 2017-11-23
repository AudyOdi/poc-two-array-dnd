import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {DragDropContext} from 'react-dnd';
import HTML5Backend from 'react-dnd-html5-backend';
import BoardSquare from './BoardSquare';
import Knight from './Knight';

class Board extends Component {
  static propTypes = {
    knightPosition: PropTypes.arrayOf(PropTypes.number.isRequired).isRequired,
    moveKnight: PropTypes.func
  };

  render() {
    let squares = [];
    for (let i = 0; i < 64; i++) {
      squares.push(this._renderSquare(i));
    }
    return (
      <div
        style={{
          width: '100%',
          height: '100%',
          display: 'flex',
          flexWrap: 'wrap'
        }}
      >
        {squares}
      </div>
    );
  }

  _renderSquare(i) {
    const x = i % 8;
    const y = Math.floor(i / 8);

    return (
      <div key={i} style={{width: '12.5%', height: '12.5%'}}>
        <BoardSquare x={x} y={y} moveKnight={this.props.moveKnight}>
          {this._renderPiece(x, y)}
        </BoardSquare>
      </div>
    );
  }
  _renderPiece(x, y) {
    const [knightX, knightY] = this.props.knightPosition;
    if (x === knightX && y === knightY) {
      return <Knight />;
    }
  }
}

export default DragDropContext(HTML5Backend)(Board);
