/** @jsx jsx */
import React from 'react';
import { jsx } from '@emotion/core';
import Select from 'react-select';
import { Category } from '../../../../types/invoice';
import { GroupType } from 'react-select/lib/types';
import { components } from 'react-select';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { categoryToIcon } from '../../../../utils';

const options = () => [
  {
    label: 'Categories',
    options: Object.entries(Category).map(key => ({
      value: key[0],
      label: key[1],
    })),
  },
];

interface Props {
  onChange: (val: any) => void;
  className: string;
  initialValue: string;
  value: string;
}

const groupStyles = {
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'space-between',
};

const formatGroupLabel = (
  data: GroupType<{
    value: string;
    label: any;
  }>
) => (
  <div style={groupStyles}>
    <span>{data.label}</span>
    <span
      style={{
        backgroundColor: '#EBECF0',
        borderRadius: '2em',
        color: '#172B4D',
        display: 'inline-block',
        fontSize: 12,
        fontWeight: 'normal',
        lineHeight: '1',
        minWidth: 1,
        padding: '0.16666666666667em 0.5em',
        textAlign: 'center',
      }}
    >
      {data.options.length}
    </span>
  </div>
);

const IconOption = (props: any) => (
  <components.Option {...props}>
    <FontAwesomeIcon icon={categoryToIcon(props.data.value)} fixedWidth />
    <span style={{ marginLeft: '0.5rem' }}>{props.data.label}</span>
  </components.Option>
);

const fetchInitial = (
  initialValue: string,
  options: { value: string; label: any }[]
) => {
  const filtered = options.filter(op => op.label === initialValue)[0];
  return filtered || undefined;
};

const ListSelector: React.SFC<Props> = props => (
  <Select
    onChange={val =>
      props.onChange(
        val
          ? (val as {
              value: string;
              label: any;
            }).value
          : null
      )
    }
    closeMenuOnSelect={true}
    defaultValue={fetchInitial(props.initialValue, options()[0].options)}
    value={fetchInitial(props.value, options()[0].options)}
    components={{ Option: IconOption }}
    options={options()}
    formatGroupLabel={formatGroupLabel}
  />
);

export default ListSelector;
