/** @jsx jsx */
import React from 'react';
import { jsx } from '@emotion/core';

import posed from 'react-pose';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { IconDefinition } from '@fortawesome/free-solid-svg-icons';

import * as glamor from 'glamor';
import moment from 'moment';

import { COLORS } from '../../../styles';
import { categoryToIcon } from '../../../utils';
import { Invoice } from '../../../types/invoice';

const largeIconCss = glamor.css({
  fontSize: '36px',
  margin: 0,
  marginLeft: '0.3rem !important',
  marginRight: '1rem !important',
});

const LargeIcon: React.SFC<{ iconName: IconDefinition }> = ({ iconName }) => (
  <div
    className={`img-circle media-object pull-left ${largeIconCss} `}
    style={{ cursor: 'pointer' }}
  >
    <FontAwesomeIcon icon={iconName} fixedWidth />
  </div>
);

const getColor = (days: number, paid: boolean) => {
  if (paid) return COLORS.GREEN;
  if (days <= 1) return COLORS.MAIN_RED;
  if (days <= 5) return COLORS.YELLOW;
  if (days <= 20) return COLORS.MAIN_BLUE;
  return COLORS.DARK_BLUE;
};

const generateIndicatorCss = (
  days: number,
  selected: boolean,
  paid: boolean = false
) =>
  glamor.css({
    background: selected ? `${COLORS.ACCENT_WHITE} !important` : 'initial',
    position: 'relative',
    ':before': {
      content: ' ',
      top: 0,
      bottom: 0,
      left: 0,
      height: '100%',
      width: '0.3rem',
      position: 'absolute',
      background: getColor(days, paid),
    },
  });

const mapDurationToString = (days: number) => {
  switch (days) {
    case 0:
      return 'today';
    case 1:
      return 'tomorrow';
    case -1:
      return 'yesterday';
    default:
      return `${days < 0 ? `${Math.abs(days)} days` : ''}${
        days < 0 ? ' ago' : 'in '
      }${days > 0 ? `${days} days` : ''}`;
  }
};

const Child = posed.li({
  open: { x: 0, opacity: 1 },
  closed: { x: 100, opacity: 0 },
});

// FIXME: Locale and hardcoded currency
const InvoiceListElement: React.SFC<
  Invoice & {
    filterKeyword: string;
    onClick: (id: string) => void;
    selected: boolean;
  }
> = props => {
  const now = moment();
  const dueDate = moment(props.dueDate);
  const diff = Math.ceil(
    moment.duration(dueDate.startOf('day').diff(now.startOf('day'))).asDays()
  );

  const dueDateToLocale = () => {
    return `${dueDate.format('LL')} (${mapDurationToString(diff)})`;
  };

  const amountToString = () => `${(props.amount / 100).toFixed(2)} €`;

  const filteredTitle = () => {
    const startIndex = props.companyName
      .toLowerCase()
      .indexOf(props.filterKeyword.toLowerCase());
    const endIndex = startIndex + props.filterKeyword.length;
    return (
      <p>
        {props.companyName.substr(0, startIndex)}
        <strong>
          {props.companyName.substr(startIndex, props.filterKeyword.length)}
        </strong>
        {props.companyName.substr(endIndex)}
      </p>
    );
  };

  return (
    <Child
      className={`list-group-item ${generateIndicatorCss(
        diff,
        props.selected,
        props.paid
      )}`}
      onClick={() => props.onClick(props.id)}
      style={{
        cursor: 'pointer',
        borderRadius: '0.5rem',
        margin: '0 0.5rem 0.5rem 0.5rem',
        background: '#fff',
        border: '1px solid #e1e1e1',
        boxShadow: '0 2px 2px 0 rgba(0,0,0,0.05)',
      }}
    >
      <LargeIcon iconName={categoryToIcon(props.category)} />
      <div className="media-body" style={{ cursor: 'pointer !important' }}>
        {props.filterKeyword.trim().length > 0 ? (
          filteredTitle()
        ) : (
          <strong>{props.companyName}</strong>
        )}
        <p>{dueDateToLocale()}</p>
        <p>{amountToString()}</p>
      </div>
    </Child>
  );
};

export default InvoiceListElement;
