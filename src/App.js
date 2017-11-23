import React, {Component} from 'react';
import Container from './Container';

class App extends Component {
  constructor() {
    super(...arguments);
    this.state = {
      knightPosition: [0, 0]
    };
  }
  render() {
    let {knightPosition} = this.state;
    return <Container />;
  }
}

export default App;
