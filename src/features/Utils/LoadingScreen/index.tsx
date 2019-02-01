import * as React from 'react';
import { Wrapper, OceanDiv } from './styled';

type Props = {
  text: string;
};

const LoadingScreen: React.SFC<Props> = (props: Props) => (
  <Wrapper>
    <h1>{props.text}</h1>
    <OceanDiv>
      <div className="wave" />
      <div className="wave" />
    </OceanDiv>
  </Wrapper>
);

export default LoadingScreen;
