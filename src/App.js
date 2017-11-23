import React, {Component} from 'react';
import Board from './Board';

class App extends Component {
  constructor() {
    super(...arguments);
    this.state = {
      knightPosition: [0, 0]
    };
  }
  render() {
    let {knightPosition} = this.state;
    return (
      <Board
        knightPosition={knightPosition}
        moveKnight={(x, y) => this.setState({knightPosition: [x, y]})}
      />
    );
  }
}

export default App;
