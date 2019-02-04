import * as React from 'react';

import SidePane from './SidePane';
import ListView from './ListView';

import { COLORS } from '../../styles';

class InvoiceScreen extends React.Component<{}, {}> {
  render() {
    return (
      <div className="pane-group">
        <SidePane />
        <div className="pane">
          <ListView />
        </div>
        <div className="pane" style={{ background: COLORS.MAIN_BLACK }}>
          ...
        </div>
      </div>
    );
  }
}

export default InvoiceScreen;
