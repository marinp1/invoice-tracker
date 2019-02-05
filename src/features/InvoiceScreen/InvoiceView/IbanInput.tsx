import * as React from 'react';
import IBAN from 'iban';

interface Props {
  className: string;
  onChange: (val: string) => void;
}

interface State {
  val: string;
}

class IbanInput extends React.Component<Props, State> {
  state: State = {
    val: '',
  };

  handleChange = (val: string) => {
    const value = IBAN.isValid(val) ? IBAN.printFormat(val, ' ') : val;
    this.props.onChange(value);
    this.setState({
      val: value,
    });
  };

  render() {
    return (
      <input
        className={this.props.className}
        placeholder="IBAN"
        type="text"
        value={this.state.val}
        onChange={ev => this.handleChange(ev.target.value)}
      />
    );
  }
}

export default IbanInput;
