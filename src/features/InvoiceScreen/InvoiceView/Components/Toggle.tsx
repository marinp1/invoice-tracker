import * as React from 'react';
import Toggle from 'react-toggle';
import 'react-toggle/style.css';
import { COLORS } from '../../../../styles';

interface Props {
  onChange: (val: any) => void;
  name: string;
  label: string;
  initialValue: boolean;
  value: boolean;
}

const ToggleComponent: React.SFC<Props> = props => {
  const handleChange = (checked: boolean) => {
    props.onChange(checked);
  };

  return (
    <div style={{ display: 'flex', width: '100%', justifyContent: 'flex-end' }}>
      <label
        htmlFor={props.name}
        style={{
          color: COLORS.MAIN_BLACK,
          fontSize: '110%',
          fontWeight: 'bold',
          marginBottom: '2px',
          marginRight: '1rem',
        }}
      >
        {props.label}
      </label>
      <Toggle
        checked={!!props.value}
        onChange={ev => handleChange(ev.target.checked)}
      />
    </div>
  );
};

export default ToggleComponent;
