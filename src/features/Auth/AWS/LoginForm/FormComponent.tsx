/** @jsx jsx */
import React from 'react';
import { jsx } from '@emotion/core';

import { Field, InjectedFormProps, reduxForm } from 'redux-form';
import { ForgotPasswordDiv } from '../../styled';
import CustomButton from '../../../Utils/CustomButton';

export interface CustomProps {}

export interface LoginFormData {
  username: string;
  password: string;
  rememberMe: boolean;
}

type Props = CustomProps & InjectedFormProps<LoginFormData, CustomProps>;

const FormComponent: React.SFC<Props> = (props: Props) => {
  return (
    <React.Fragment>
      <form onSubmit={props.handleSubmit}>
        <div className="form-group">
          <label htmlFor="username">Username</label>
          <Field
            name="username"
            component="input"
            type="text"
            placeholder="Username"
            className="form-control"
          />
        </div>
        <div className="form-group">
          <label htmlFor="password">Password</label>
          <Field
            name="password"
            component="input"
            type="password"
            placeholder="Password"
            className="form-control"
          />
        </div>
        <div className="checkbox">
          <label>
            <Field name="rememberMe" component="input" type="checkbox" /> Keep
            me logged in
          </label>
        </div>
        <CustomButton id="login-button" theme="primary">
          LOG IN
        </CustomButton>
      </form>
      <ForgotPasswordDiv>
        <a>Retrieve forgotted password</a>
      </ForgotPasswordDiv>
    </React.Fragment>
  );
};

export default reduxForm<LoginFormData, CustomProps>({})(FormComponent);
