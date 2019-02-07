import * as React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faDropbox, faAws } from '@fortawesome/free-brands-svg-icons';
import ToggleButton from 'react-toggle-button';

import { COLORS } from '../../styles';

import { AuthProvider } from '../../types/auth';

interface Props {
  authProvider: AuthProvider;
  onToggle: () => void;
}

const ProviderToggle: React.SFC<Props> = props => (
  <div
    style={{
      marginTop: '0.5rem',
      height: '2rem',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
    }}
  >
    <div style={{ cursor: 'pointer' }}>
      <ToggleButton
        inactiveLabel={''}
        activeLabel={''}
        trackStyle={{
          height: '1rem',
          background: COLORS.MAIN_BLACK,
          cursor: 'pointer',
        }}
        thumbStyle={{
          width: '32px',
          height: '32px',
          alignItems: 'center',
          display: 'flex',
          justifyContent: 'center',
          cursor: 'pointer',
        }}
        colors={{
          activeThumb: {
            base: COLORS.MAIN_BLUE,
            hover: COLORS.DARK_BLUE,
          },
          inactiveThumb: {
            base: COLORS.GREEN,
            hover: '#00b746',
          },
        }}
        thumbAnimateRange={[-6, 28]}
        thumbIcon={
          props.authProvider === AuthProvider.AWS ? (
            <FontAwesomeIcon
              icon={faAws}
              size="lg"
              style={{ color: COLORS.PURE_WHITE, cursor: 'pointer' }}
            />
          ) : (
            <FontAwesomeIcon
              icon={faDropbox}
              size="lg"
              style={{ color: COLORS.PURE_WHITE, cursor: 'pointer' }}
            />
          )
        }
        value={props.authProvider !== AuthProvider.AWS}
        onToggle={props.onToggle}
      />
    </div>
  </div>
);

export default ProviderToggle;
