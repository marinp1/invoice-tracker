import * as React from 'react';
import { connect } from 'react-redux';
import * as glamor from 'glamor';
import * as Icons from '@fortawesome/free-solid-svg-icons';

import NavItem from './NavItem';
import MenuItem from './MenuItem';

import { InvoiceThunkDispatch, selectDueDateCategory } from '../invoiceActions';

import { COLORS } from '../../../styles';

import { DueDateCategory, CountMapType } from '../../../types/invoice';
import { CognitoUser } from '../../../types/auth';
import AppState from '../../../types/state';

const sidebarTheme = glamor.css({
  background: COLORS.ACCENT_WHITE,
  color: COLORS.PURE_BLACK,
  paddingTop: '1.5rem',
});

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
          display: 'flex',
          flexDirection: 'column',
          width: '100%',
          cursor: 'pointer',
          overflow: 'hidden',
        }}
      >
        <MenuItem icon={Icons.faInfo} text="About" subtext="v0.1.0" />
        <MenuItem icon={Icons.faSignOutAlt} text="Sign out" />
        <MenuItem
          icon={Icons.faUserAstronaut}
          text={props.currentUser.attributes.email}
        />
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