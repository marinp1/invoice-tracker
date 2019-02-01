import * as React from 'react';
import { Field, InjectedFormProps, reduxForm } from 'redux-form';
import { ForgotPasswordDiv } from '../styled';
import CustomButton from '../../Utils/CustomButton';

export interface CustomProps {}

export interface LoginFormData {
  emailAddress: string;
  password: string;
  rememberMe: boolean;
}

type Props = CustomProps & InjectedFormProps<LoginFormData, CustomProps>;

const FormComponent: React.SFC<Props> = (props: Props) => {
  return (
    <React.Fragment>
      <form onSubmit={props.handleSubmit}>
        <div className="form-group">
          <label htmlFor="emailAddress">Email address</label>
          <Field
            name="emailAddress"
            component="input"
            type="email"
            placeholder="Email"
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
