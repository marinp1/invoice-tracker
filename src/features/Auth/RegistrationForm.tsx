import * as React from 'react';
import CustomButton from '../Utils/CustomButton';

import { ForgotPasswordDiv } from './styled';

const RegistrationForm: React.SFC<{}> = () => (
  <React.Fragment>
    <form>
      <div className="form-group">
        <label>Email address</label>
        <input type="email" className="form-control" placeholder="Email" />
      </div>
      <div className="form-group">
        <label>Password</label>
        <input
          type="password"
          className="form-control"
          placeholder="Password"
        />
      </div>
      <div className="form-group">
        <label>Repeat password</label>
        <input
          type="password"
          className="form-control"
          placeholder="Password"
        />
      </div>
    </form>
    <CustomButton id="signup-button" theme="primary">
      SIGN UP
    </CustomButton>
    <ForgotPasswordDiv>
      <a>Insert verification code</a>
    </ForgotPasswordDiv>
  </React.Fragment>
);

export default RegistrationForm;
