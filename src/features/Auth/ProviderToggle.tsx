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
    <ToggleButton
      inactiveLabel={''}
      activeLabel={''}
      trackStyle={{
        height: '1rem',
        background: COLORS.MAIN_BLACK,
      }}
      thumbStyle={{
        width: '32px',
        height: '32px',
        alignItems: 'center',
        display: 'flex',
        justifyContent: 'center',
      }}
      colors={{
        activeThumb: {
          base: COLORS.MAIN_BLUE,
        },
        inactiveThumb: {
          base: COLORS.GREEN,
        },
      }}
      thumbAnimateRange={[-6, 28]}
      thumbIcon={
        props.authProvider === 'AWS' ? (
          <FontAwesomeIcon
            icon={faAws}
            size="lg"
            style={{ color: COLORS.PURE_WHITE }}
          />
        ) : (
          <FontAwesomeIcon
            icon={faDropbox}
            size="lg"
            style={{ color: COLORS.PURE_WHITE }}
          />
        )
      }
      value={props.authProvider !== 'AWS'}
      onToggle={props.onToggle}
    />
  </div>
);

export default ProviderToggle;
