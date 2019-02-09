/** @jsx jsx */
import React from 'react';
import { jsx } from '@emotion/core';
import css from '@emotion/css/macro';
import { COLORS } from '../../styles';

const headerStyle = css({
  background: COLORS.MAIN_BLACK,
  zIndex: 1000,
  boxShadow: '0 2px 1px 3px rgba(0,0,0,0.02)',
  padding: '0.5rem',
  display: 'flex',
  flexDirection: 'row',
  position: 'relative',
  height: '2.5rem',
  h1: {
    fontWeight: 'bold',
    textTransform: 'uppercase',
    letterSpacing: '0.1rem',
    fontSize: '14px',
    position: 'absolute',
    alignSelf: 'center',
    left: '50%',
    transform: 'translateX(-50%)',
    color: COLORS.PURE_WHITE,
  },
  '.buttons': {
    right: '1rem',
    position: 'absolute',
    alignSelf: 'center',
    color: COLORS.PURE_WHITE,
  },
});

const HeaderComponent: React.SFC<{}> = () => (
  <div css={headerStyle} className="draggable">
    <h1>PAYMINDER</h1>
    <div className="buttons">Save</div>
  </div>
);

export default HeaderComponent;
