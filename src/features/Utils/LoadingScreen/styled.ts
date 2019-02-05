import glamorous from 'glamorous';
import * as glamor from 'glamor';

import { COLORS } from '../../../styles';

const glamorCss: any = glamor.css;

const swell = glamorCss.keyframes({
  '0%': { transform: 'translate3d(0,-25px,0)' },
  '50%': { transform: 'translate3d(0,5px,0)' },
  '100%': { transform: 'translate3d(0,-25px,0)' },
});

const wave = glamorCss.keyframes({
  '0%': { marginLeft: 0 },
  '100%': { marginLeft: '-1600px' },
});

const waveGraphic = require('./wave.svg');

export interface OceanThemeObject {
  transform: string;
  top: number;
  bottom: number;
}

export const OceanDiv = glamorous.div(
  {
    height: '5%',
    width: '100%',
    position: 'absolute',
    left: 0,
    background: '#015871',
    '& .wave': {
      background: `url(${waveGraphic}) repeat-x;`,
      position: 'absolute',
      top: '-198px',
      width: '6400px',
      height: '198px',
      animation: `${wave} 7s cubic-bezier( 0.36, 0.45, 0.63, 0.53) infinite`,
      transform: 'translate3d(0, 0, 0)',
    },
    '& .wave:nth-of-type(2)': {
      top: '-175px',
      animation: `${wave} 7s cubic-bezier( 0.36, 0.45, 0.63, 0.53) -.125s infinite, ${swell} 7s ease -1.25s infinite`,
      opacity: 1,
    },
  },
  ({ theme }: { theme: OceanThemeObject }) => ({
    top: theme.top,
    bottom: theme.bottom,
    transform: theme.transform,
  })
);

export const Wrapper = glamorous.div({
  zIndex: 999,
  background: 'rgba(0,0,0,0.2)',
  overflow: 'hidden',
  position: 'absolute',
  left: 0,
  right: 0,
  top: 0,
  bottom: 0,
  textAlign: 'center',
  '& h1': {
    fontWeight: 'bold !important',
    marginTop: '15%',
    color: COLORS.PURE_WHITE,
  },
});
