import * as React from 'react';
import { connect } from 'react-redux';
import * as glamor from 'glamor';

import { InvoiceThunkDispatch, selectDueDateCategory } from './invoiceActions';

import { COLORS } from '../../styles';
import { mapDueDateCategoryToColor } from '../../utils';

import { DueDateCategory, CountMapType } from '../../types/invoice';
import { PhotonIcon } from '../../types';
import { CognitoUser } from '../../types/auth';
import AppState from '../../types/state';

const sidebarTheme = glamor.css({
  background: COLORS.ACCENT_WHITE,
  color: COLORS.PURE_BLACK,
  paddingTop: '1.5rem',
});

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

interface ReduxStateProps {
  selectedDueDate: DueDateCategory;
  currentUser: CognitoUser | null;
  userAvatar: string | null;
  countMap: CountMapType;
}

interface ReduxDispatchProps {
  changeDueDateSelection: (sel: DueDateCategory) => void;
}

const SidePane: React.SFC<ReduxStateProps & ReduxDispatchProps> = props => (
  <div
    className={`pane-sm sidebar ${sidebarTheme}`}
    style={{ display: 'flex', flexDirection: 'column' }}
  >
    <nav className="nav-group" style={{ flexGrow: 1 }}>
      <h5 className="nav-group-title" style={{ color: COLORS.PURE_BLACK }}>
        Due date
      </h5>
      {Object.values(DueDateCategory).map((cat: DueDateCategory) => (
        <NavItem
          count={props.countMap[cat]}
          key={cat}
          selectedName={props.selectedDueDate}
          category={cat}
          onClick={props.changeDueDateSelection}
        />
      ))}
    </nav>
    {props.currentUser && (
      <div
        style={{
          paddingTop: '0.5rem',
          borderTop: '1px solid #e1e1e1',
          background: '#f5f5f5',
          display: 'flex',
          flexDirection: 'row',
          height: '2rem',
          width: '100%',
          cursor: 'pointer',
        }}
      >
        {props.userAvatar && (
          <div
            style={{
              height: '2rem',
              width: '2rem',
              marginTop: '-0.5rem',
              cursor: 'pointer',
            }}
          >
            <img
              style={{ cursor: 'pointer' }}
              width="100%"
              height="100%"
              src={props.userAvatar}
            />
          </div>
        )}
        <p
          style={{
            textAlign: 'center',
            flexGrow: 1,
            marginTop: '-0.1rem',
            marginLeft: '0.5rem',
            marginRight: '0.5rem',
            cursor: 'pointer',
          }}
        >
          {props.currentUser.attributes.email}
        </p>
      </div>
    )}
  </div>
);

const mapStateToProps = (state: AppState): ReduxStateProps => ({
  currentUser: state.auth.currentUser,
  selectedDueDate: state.invoice.selectedDueDateCategory,
  countMap: state.invoice.countMap,
  userAvatar: state.auth.userAvatar,
});

const mapDispatchToProps = (
  dispatch: InvoiceThunkDispatch
): ReduxDispatchProps => ({
  changeDueDateSelection: (sel: DueDateCategory) => {
    dispatch(selectDueDateCategory(sel));
  },
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(SidePane);
