import * as React from 'react';
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
  <div className={`img-circle media-object pull-left ${largeIconCss} `}>
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
    background: selected ? COLORS.ACCENT_WHITE : 'initial',
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
    <li
      className={`list-group-item ${generateIndicatorCss(
        diff,
        props.selected,
        props.paid
      )}`}
      onClick={() => props.onClick(props.id)}
    >
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
