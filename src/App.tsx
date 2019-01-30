import React, { Component } from 'react';

import LoginScreen from './features/Auth';

class App extends Component {
  render() {
    return (
      <div className="window">
        <div className="window-content">
          <LoginScreen />
        </div>
      </div>
    );
  }
}

export default App;
