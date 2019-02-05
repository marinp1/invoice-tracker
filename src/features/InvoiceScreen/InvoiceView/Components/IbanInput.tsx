import * as React from 'react';
import IBAN from 'iban';

interface Props {
  className: string;
  onChange: (val: string) => void;
  initialValue: string;
  value: string;
}

const IbanInput: React.SFC<Props> = props => {
  const handleChange = (val: string) => {
    const value = IBAN.isValid(val) ? IBAN.printFormat(val, ' ') : val;
    props.onChange(value);
  };

  return (
    <input
      className={props.className}
      placeholder="IBAN"
      type="text"
      value={props.value}
      onChange={ev => handleChange(ev.target.value)}
    />
  );
};

export default IbanInput;
