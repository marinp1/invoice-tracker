import * as React from 'react';
import glamorous, { ThemeProvider } from 'glamorous';

import { COLORS } from '../../styles';

interface ButtonThemeObject {
  background: string;
  color: string;
  border: string;
}

const buttonThemes = {
  default: {
    background: COLORS.PURE_WHITE,
    color: COLORS.PURE_BLACK,
    border: '0.1rem solid #f5f5f5',
  },
  primary: {
    background: COLORS.MAIN_BLUE,
    color: COLORS.PURE_WHITE,
    border: `0.1rem solid ${COLORS.MAIN_BLUE}`,
  },
};

const Container = glamorous.button(
  {
    padding: '0.5rem 1rem',
    borderRadius: '0.1rem',
    [':hover']: {
      cursor: 'pointer',
      filter: 'brightness(95%)',
    },
  },
  ({ theme }: { theme: ButtonThemeObject }) => ({
    background: theme.background,
    color: theme.color,
    border: theme.border,
  })
);

interface Props {
  theme?: 'default' | 'primary';
  type?: string;
  className?: string;
  children: React.ReactNode;
  disabled?: boolean;
  onClick?: () => void;
}

class CustomButton extends React.Component<Props> {
  render() {
    return (
      <ThemeProvider theme={buttonThemes[this.props.theme || 'default']}>
        <Container
          disabled={this.props.disabled}
          className={this.props.className || ''}
          type={this.props.type}
          onClick={this.props.onClick}
        >
          {this.props.children}
        </Container>
      </ThemeProvider>
    );
  }
}

export default CustomButton;
