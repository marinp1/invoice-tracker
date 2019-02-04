import * as React from 'react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { DatePickerContainer } from './styled';

interface Props {
  onChange: (val: any) => void;
  className: string;
}

interface State {
  date: Date;
}

class DatePickerComponent extends React.Component<Props, State> {
  state: State = {
    date: new Date(),
  };

  componentDidMount = () => {
    this.props.onChange(this.state.date);
  };

  handleChange = (date: Date) => {
    this.setState({
      date,
    });
    this.props.onChange(date);
  };

  render() {
    return (
      <DatePickerContainer className={this.props.className}>
        <DatePicker selected={this.state.date} onChange={this.handleChange} />
      </DatePickerContainer>
    );
  }
}

export default DatePickerComponent;
