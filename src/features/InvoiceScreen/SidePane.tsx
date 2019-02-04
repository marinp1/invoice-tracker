import * as React from 'react';
import * as glamor from 'glamor';

import { COLORS } from '../../styles';
import { PhotonIcon } from '../../types';

const sidebarTheme = glamor.css({
  background: COLORS.ACCENT_WHITE,
  color: COLORS.PURE_BLACK,
  paddingTop: '1.5rem',
});

interface NavItemProps {
  selectedName: string;
  icon: PhotonIcon;
  text: string;
  onClick: (newSelection: string) => void;
  iconColor?: string;
}

const NavItem: React.SFC<NavItemProps> = props => (
  <span
    onClick={() => props.onClick(props.text)}
    className={`nav-group-item${
      props.selectedName === props.text ? ' active' : ''
    }`}
  >
    <span
      className={`${props.icon}`}
      style={{ color: `${props.iconColor || 'initial'}` }}
    />
    {props.text}
  </span>
);

interface NavGroupState {
  selected: string;
}

class NavGroup extends React.Component<{}, NavGroupState> {
  state: NavGroupState = {
    selected: 'All',
  };

  changeSelection = (newSelected: string) =>
    this.setState({
      selected: newSelected,
    });

  render() {
    return (
      <nav className="nav-group">
        <h5 className="nav-group-title" style={{ color: COLORS.PURE_BLACK }}>
          Due date
        </h5>
        <NavItem
          selectedName={this.state.selected}
          icon={PhotonIcon.Record}
          iconColor={COLORS.PURE_BLACK}
          text={'All'}
          onClick={this.changeSelection}
        />
        <NavItem
          selectedName={this.state.selected}
          icon={PhotonIcon.Record}
          iconColor={COLORS.MAIN_RED}
          text={'Today'}
          onClick={this.changeSelection}
        />
        <NavItem
          selectedName={this.state.selected}
          icon={PhotonIcon.Record}
          iconColor={`#fdbc40`}
          text={'Next 5 days'}
          onClick={this.changeSelection}
        />
        <NavItem
          selectedName={this.state.selected}
          icon={PhotonIcon.Record}
          iconColor={COLORS.MAIN_BLUE}
          text={'Next 20 days'}
          onClick={this.changeSelection}
        />
        <NavItem
          selectedName={this.state.selected}
          icon={PhotonIcon.Record}
          iconColor={COLORS.DARK_BLUE}
          text={'Later'}
          onClick={this.changeSelection}
        />
        <NavItem
          selectedName={this.state.selected}
          icon={PhotonIcon.Record}
          iconColor={`#00D050`}
          text={'Paid'}
          onClick={this.changeSelection}
        />
      </nav>
    );
  }
}

const SidePane = () => (
  <div className={`pane-sm sidebar ${sidebarTheme}`}>
    <NavGroup />
  </div>
);

export default SidePane;
