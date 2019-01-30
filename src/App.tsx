import React, { Component } from 'react';

import LoginScreen from './features/Auth';

class App extends Component {
  render() {
    return (
      <div className="window">
        <header className="toolbar toolbar-header">
          <h1 className="title">Header</h1>
        </header>
        <div className="window-content">
          <LoginScreen />
        </div>
      </div>
    );
  }
}

export default App;
