import * as React from 'react';
import Toggle from 'react-toggle';
import 'react-toggle/style.css';
import { COLORS } from '../../../styles';

interface Props {
  onChange: (val: any) => void;
  name: string;
  label: string;
}

interface State {
  checked: boolean;
}

class ToggleComponent extends React.Component<Props, State> {
  state: State = {
    checked: false,
  };

  componentDidMount() {
    this.props.onChange(this.state.checked);
  }

  handleChange = (checked: boolean) => {
    this.setState({ checked });
    this.props.onChange(checked);
  };

  render() {
    return (
      <div
        style={{ display: 'flex', width: '100%', justifyContent: 'flex-end' }}
      >
        <label
          htmlFor={this.props.name}
          style={{
            color: COLORS.MAIN_BLACK,
            fontSize: '110%',
            fontWeight: 'bold',
            marginBottom: '2px',
            marginRight: '1rem',
          }}
        >
          {this.props.label}
        </label>
        <Toggle
          checked={this.state.checked}
          onChange={ev => this.handleChange(ev.target.checked)}
        />
      </div>
    );
  }
}

export default ToggleComponent;
