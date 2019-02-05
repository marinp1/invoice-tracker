import * as React from 'react';
import glamorous from 'glamorous';
import { IconDefinition } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

const MenuItemContainer = glamorous.div({
  borderTop: '1px solid #e1e1e1',
  background: '#f5f5f5',
  padding: '0.5rem',
  cursor: 'pointer',
  [':hover']: {
    filter: 'brightness(95%)',
  },
});

interface MenuItemProps {
  icon: IconDefinition;
  text: string;
  subtext?: string;
  onClick?: () => void;
}

const MenuItem: React.SFC<MenuItemProps> = props => (
  <MenuItemContainer onClick={props.onClick}>
    <FontAwesomeIcon
      fixedWidth
      icon={props.icon}
      style={{ marginRight: '0.5rem', cursor: 'pointer' }}
    />
    <span style={{ cursor: 'pointer' }}>{props.text}</span>
    {props.subtext && (
      <span
        style={{
          marginLeft: '0.5rem',
          fontSize: '90%',
          color: '#999',
          cursor: 'pointer',
        }}
      >
        {props.subtext}
      </span>
    )}
  </MenuItemContainer>
);

export default MenuItem;
