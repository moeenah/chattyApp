import React, {Component} from 'react';

class NavBar extends Component {
  render() {
    const userCount = (this.props.numOfClients === 1) ? (
      <span className="user-count">{this.props.numOfClients} User Online</span>
    ) : (
      <div>
        <span className="user-count">{this.props.numOfClients} Users Online</span>
      </div>
    );
    return (
        <nav className="navbar">
          <a href="/" className="navbar-brand">Chatty</a>
          {userCount}
        </nav>
    );
  }
}

export default NavBar;