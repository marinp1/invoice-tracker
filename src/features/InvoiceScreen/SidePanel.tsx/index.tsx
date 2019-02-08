import * as React from 'react';
import { connect } from 'react-redux';
import * as glamor from 'glamor';
import * as Icons from '@fortawesome/free-solid-svg-icons';

import NavItem from './NavItem';
import MenuItem from './MenuItem';

import {
  InvoiceThunkDispatch,
  selectDueDateCategory,
  undoAction,
  redoAction,
} from '../invoiceActions';
import { signOut } from '../../Auth/authActions';

import { COLORS } from '../../../styles';

import { DueDateCategory, CountMapType } from '../../../types/invoice';
import { User } from '../../../types/auth';
import AppState from '../../../types/state';

const sidebarTheme = glamor.css({
  background: COLORS.ACCENT_WHITE,
  color: COLORS.PURE_BLACK,
  paddingTop: '1.5rem',
});

interface ReduxStateProps {
  selectedDueDate: DueDateCategory;
  currentUser: User | null;
  userAvatar: string | null;
  countMap: CountMapType;
}

interface ReduxDispatchProps {
  changeDueDateSelection: (sel: DueDateCategory) => void;
  undoAction: () => void;
  redoAction: () => void;
  signOut: () => void;
}

const SidePane: React.SFC<ReduxStateProps & ReduxDispatchProps> = props => (
  <div
    className={`pane-sm sidebar ${sidebarTheme}`}
    style={{ display: 'flex', flexDirection: 'column' }}
  >
    <nav className="nav-group" style={{ flexGrow: 1 }}>
      <h5
        className="nav-group-title"
        style={{ color: COLORS.PURE_BLACK }}
        onClick={() => props.undoAction()}
      >
        Filters
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
        onClick={() => props.redoAction()}
      >
        <MenuItem icon={Icons.faInfo} text="About" subtext="v0.1.0" />
        <MenuItem
          icon={Icons.faSignOutAlt}
          text="Sign out"
          onClick={props.signOut}
        />
        <MenuItem icon={Icons.faUserAstronaut} text={props.currentUser.email} />
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
  signOut: () => {
    dispatch(signOut());
  },
  undoAction: () => {
    dispatch(undoAction());
  },
  redoAction: () => {
    dispatch(redoAction());
  },
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(SidePane);
