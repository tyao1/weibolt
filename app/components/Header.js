import React, { PropTypes, Component } from 'react';

export default class Header extends Component {

  static propTypes = {
    // addTodo: PropTypes.func.isRequired
  };

  render() {
    return (
      <header>
        <h1>weibolt</h1>
      </header>
    );
  }
}
