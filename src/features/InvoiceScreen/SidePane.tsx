import * as React from 'react';
import { connect } from 'react-redux';
import * as glamor from 'glamor';

import { COLORS } from '../../styles';
import {
  DueDateCategory,
  mapDueDateCategoryToColor,
} from '../../types/invoice';
import { PhotonIcon } from '../../types';
import { InvoiceThunkDispatch, selectDueDateCategory } from './invoiceActions';
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
}

const NavItem: React.SFC<NavItemProps> = props => (
  <span
    onClick={() => props.onClick(props.category)}
    className={`nav-group-item${
      props.selectedName === props.category ? ' active' : ''
    }`}
  >
    <span
      className={PhotonIcon.Record}
      style={{ color: mapDueDateCategoryToColor(props.category) }}
    />
    {props.category}
  </span>
);

interface ReduxStateProps {
  selectedDueDate: DueDateCategory;
}

interface ReduxDispatchProps {
  changeDueDateSelection: (sel: DueDateCategory) => void;
}

const SidePane: React.SFC<ReduxStateProps & ReduxDispatchProps> = props => (
  <div className={`pane-sm sidebar ${sidebarTheme}`}>
    <nav className="nav-group">
      <h5 className="nav-group-title" style={{ color: COLORS.PURE_BLACK }}>
        Due date
      </h5>
      {Object.values(DueDateCategory).map((cat: DueDateCategory) => (
        <NavItem
          key={cat}
          selectedName={props.selectedDueDate}
          category={cat}
          onClick={props.changeDueDateSelection}
        />
      ))}
    </nav>
  </div>
);

const mapStateToProps = (state: AppState): ReduxStateProps => ({
  selectedDueDate: state.invoice.selectedDueDateCategory,
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
