import * as React from 'react';
import { Field, InjectedFormProps, reduxForm } from 'redux-form';
import { ForgotPasswordDiv } from '../styled';
import CustomButton from '../../Utils/CustomButton';

import { connect } from 'react-redux';
import { ConfigProps } from 'redux-form';
import { AuthThunkDispatch } from '../authActions';

import AppState from '../../../types/state';
import { AuthStateType } from '../../../types';

interface CustomProps {
  changeAuthState: (authState: AuthStateType) => void;
}

interface DispatchProps {
  onSubmit: (
    formData: SignUpFormData,
    dispatch: AuthThunkDispatch,
    props: CustomProps
  ) => void;
}

interface SignUpFormData {
  emailAddress: string;
  password: string;
  confirmPassword: string;
}

type Props = CustomProps & InjectedFormProps<SignUpFormData, CustomProps>;

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
        <div className="form-group">
          <label htmlFor="confirmPassword">Repeat password</label>
          <Field
            name="confirmPassword"
            component="input"
            type="password"
            placeholder="Confirm password"
            className="form-control"
          />
        </div>
        <CustomButton id="signup-button" theme="primary">
          SIGN UP
        </CustomButton>
      </form>
      <ForgotPasswordDiv onClick={() => props.changeAuthState('Verify')}>
        <a>Insert verification code</a>
      </ForgotPasswordDiv>
    </React.Fragment>
  );
};

const ReduxForm = reduxForm<SignUpFormData, CustomProps>({})(FormComponent);

const mapStateToProps = (
  state: AppState | {},
  props: CustomProps | {}
): ConfigProps<SignUpFormData, CustomProps> => ({
  initialValues: {},
  form: 'signup-form',
});

function mapDispatchToProps(dispatch: AuthThunkDispatch): DispatchProps {
  return {
    onSubmit: (
      formData: SignUpFormData,
      dispatch: AuthThunkDispatch,
      props: CustomProps
    ) => {
      /*
      dispatch(signUp(formData));
      */
      console.log(formData);
    },
  };
}

export default connect<ConfigProps<SignUpFormData, CustomProps>>(
  mapStateToProps,
  mapDispatchToProps
)(ReduxForm);
