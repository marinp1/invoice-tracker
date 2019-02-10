/** @jsx jsx */
import React from 'react';
import { jsx } from '@emotion/core';

import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { DatePickerContainer } from '../styled';

interface Props {
  onChange: (val: any) => void;
  initialValue: Date;
  className: string;
  value: Date | string;
}

const DatePickerComponent: React.SFC<Props> = props => {
  const handleChange = (date: Date) => {
    props.onChange(date);
  };

  return (
    <DatePickerContainer className={props.className}>
      <DatePicker
        selected={
          props.value instanceof Date ? props.value : new Date(props.value)
        }
        onChange={handleChange}
      />
    </DatePickerContainer>
  );
};

export default DatePickerComponent;
