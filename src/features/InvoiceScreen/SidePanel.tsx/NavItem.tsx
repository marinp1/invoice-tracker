import * as React from 'react';

import { mapDueDateCategoryToColor } from '../../../utils';

import { DueDateCategory } from '../../../types/invoice';
import { PhotonIcon } from '../../../types';

interface NavItemProps {
  selectedName: string;
  category: DueDateCategory;
  onClick: (sel: DueDateCategory) => void;
  count: number | undefined;
}

const NavItem: React.SFC<NavItemProps> = props => (
  <span
    onClick={() => props.onClick(props.category)}
    className={`nav-group-item${
      props.selectedName === props.category ? ' active' : ''
    }`}
    style={{ paddingRight: '1rem' }}
  >
    <span
      className={PhotonIcon.Record}
      style={{ color: mapDueDateCategoryToColor(props.category) }}
    />
    {props.count ? (
      <span>
        {props.category} ({props.count})
      </span>
    ) : (
      <span style={{ color: '#999' }}>{props.category}</span>
    )}
  </span>
);

export default NavItem;
