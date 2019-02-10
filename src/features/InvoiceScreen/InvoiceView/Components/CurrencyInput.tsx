/** @jsx jsx */
import React from 'react';
import { jsx } from '@emotion/core';

import CurrencyInput from 'react-currency-input';

interface Props {
  className: string;
  onChange: (val: number) => void;
  initialValue: number;
  value: number;
}

const CurrencyInputComponent: React.SFC<Props> = props => {
  const handleChange = (event: any, maskedValue: any, floatValue: any) => {
    props.onChange(floatValue * 100);
  };

  return (
    <CurrencyInput
      className={props.className}
      suffix=" €"
      decimalSeparator=","
      thousandSeparator=" "
      value={String(props.value / 100)}
      onChangeEvent={handleChange}
    />
  );
};

export default CurrencyInputComponent;
