import * as React from 'react';
import CustomButton from '../Utils/CustomButton';
import { ForgotPasswordDiv } from './styled';

const LoginForm: React.SFC<{}> = () => (
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
      <div className="checkbox">
        <label>
          <input type="checkbox" /> Keep me logged in
        </label>
      </div>
    </form>
    <CustomButton id="login-button" theme="primary">
      LOG IN
    </CustomButton>
    <ForgotPasswordDiv>
      <a>Retrieve forgotted password</a>
    </ForgotPasswordDiv>
  </React.Fragment>
);

export default LoginForm;
