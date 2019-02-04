import * as React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { IconDefinition } from '@fortawesome/free-solid-svg-icons';

import * as glamor from 'glamor';
import moment from 'moment';

import { COLORS } from '../../styles';

import {
  Invoice,
  categoryToIcon,
  mapDueDateCategoryToColor,
} from './../../types/invoice';

const largeIconCss = glamor.css({
  fontSize: '36px',
  margin: 0,
  marginLeft: '0.3rem !important',
  marginRight: '1rem !important',
});

const LargeIcon: React.SFC<{ iconName: IconDefinition }> = ({ iconName }) => (
  <div className={`img-circle media-object pull-left ${largeIconCss} `}>
    <FontAwesomeIcon icon={iconName} fixedWidth />
  </div>
);

const getColor = (days: number, paid: boolean) => {
  if (paid) return '#00D050';
  if (days <= 1) return COLORS.MAIN_RED;
  if (days <= 5) return '#fdbc40';
  if (days <= 20) return COLORS.MAIN_BLUE;
  return COLORS.DARK_BLUE;
};

const generateIndicatorCss = (days: number, paid: boolean = false) =>
  glamor.css({
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

// FIXME: Locale and hardcoded currency
const InvoiceListElement: React.SFC<
  Invoice & { filterKeyword: string }
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
    <li className={`list-group-item ${generateIndicatorCss(diff, props.paid)}`}>
      <LargeIcon iconName={categoryToIcon(props.category)} />
      <div className="media-body">
        {props.filterKeyword.trim().length > 0 ? (
          filteredTitle()
        ) : (
          <strong>{props.companyName}</strong>
        )}
        <p>{dueDateToLocale()}</p>
        <p>{amountToString()}</p>
      </div>
    </li>
  );
};

export default InvoiceListElement;
