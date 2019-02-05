import * as React from 'react';
import posed, { PoseGroup } from 'react-pose';
import ReactLoading from 'react-loading';
import { ThemeProvider } from 'glamorous';
import { Wrapper, OceanDiv } from './styled';
import { COLORS } from '../../../styles';

type Props = {
  text: string;
  theme?: 'default' | 'reversed';
  style?: React.CSSProperties;
  customLoading?: boolean;
  hideHeader?: boolean;
  visible: boolean;
};

const oceanThemes = {
  default: {
    top: 'unset',
    bottom: 0,
    transform: 'unset',
  },
  reversed: {
    top: 0,
    bottom: 'unset',
    transform: 'rotate(180deg)',
  },
};

const LoadingContainer = posed.div({
  enter: {
    opacity: 1,
    transition: { duration: 150 },
  },
  exit: {
    opacity: 0,
    transition: { duration: 150 },
  },
});

class LoadingScreen extends React.Component<Props> {
  render() {
    return (
      <PoseGroup>
        {this.props.visible && (
          <LoadingContainer key="loading-screen">
            <Wrapper style={this.props.style}>
              {!this.props.hideHeader && <h1>{this.props.text}</h1>}
              <ThemeProvider theme={oceanThemes[this.props.theme || 'default']}>
                <OceanDiv>
                  <div className="wave" />
                  <div className="wave" />
                </OceanDiv>
              </ThemeProvider>
              <div style={{ position: 'absolute', top: '2rem', left: '2rem' }}>
                <ReactLoading
                  type={'bubbles'}
                  color={COLORS.PURE_WHITE}
                  height={'2rem'}
                  width={'6rem'}
                />
              </div>
            </Wrapper>
          </LoadingContainer>
        )}
      </PoseGroup>
    );
  }
}

export default LoadingScreen;
