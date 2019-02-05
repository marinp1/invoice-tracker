import * as React from 'react';
import CurrencyInput from 'react-currency-input';

interface Props {
  className: string;
  onChange: (val: number) => void;
}

interface State {
  value: string;
}

class CurrencyInputComponent extends React.Component<Props, State> {
  state: State = {
    value: '0.00',
  };

  componentDidMount() {
    this.props.onChange(0);
  }

  handleChange = (event: any, maskedValue: any, floatValue: any) => {
    this.setState({
      value: maskedValue,
    });
    this.props.onChange(floatValue * 100);
  };

  render() {
    return (
      <CurrencyInput
        className={this.props.className}
        suffix=" €"
        decimalSeparator=","
        thousandSeparator=" "
        value={this.state.value}
        onChangeEvent={this.handleChange}
      />
    );
  }
}

export default CurrencyInputComponent;
