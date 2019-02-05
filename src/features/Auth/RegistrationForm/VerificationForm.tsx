import * as React from 'react';
import { Field, InjectedFormProps, reduxForm } from 'redux-form';
import { ForgotPasswordDiv } from '../styled';
import CustomButton from '../../Utils/CustomButton';

import { connect } from 'react-redux';
import { ConfigProps } from 'redux-form';
import { AuthThunkDispatch, verifyAccount } from '../authActions';

import AppState from '../../../types/state';
import { AuthStateType } from '../../../types';

interface CustomProps {
  changeAuthState: (authState: AuthStateType) => void;
}

interface VerificationFormData {
  username: string;
  verificationCode: string;
}

interface DispatchProps {
  onSubmit: (
    formData: VerificationFormData,
    dispatch: AuthThunkDispatch,
    props: CustomProps
  ) => void;
}

type Props = CustomProps & InjectedFormProps<VerificationFormData, CustomProps>;

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
          <label htmlFor="verificationCode">Verification code</label>
          <Field
            name="verificationCode"
            component="input"
            type="text"
            placeholder="Verification code"
            className="form-control"
          />
        </div>
        <CustomButton id="verify-button" theme="primary">
          VERIFY
        </CustomButton>
      </form>
      <ForgotPasswordDiv onClick={() => props.changeAuthState('SignUp')}>
        <a>Back to sign up</a>
      </ForgotPasswordDiv>
    </React.Fragment>
  );
};

const ReduxForm = reduxForm<VerificationFormData, CustomProps>({})(
  FormComponent
);

const mapStateToProps = (
  state: AppState | {},
  props: CustomProps | {}
): ConfigProps<VerificationFormData, CustomProps> => ({
  initialValues: {},
  form: 'verification-form',
});

function mapDispatchToProps(dispatch: AuthThunkDispatch): DispatchProps {
  return {
    onSubmit: (
      formData: VerificationFormData,
      dispatch: AuthThunkDispatch,
      props: CustomProps
    ) => {
      dispatch(verifyAccount(formData));
    },
  };
}

export default connect<ConfigProps<VerificationFormData, CustomProps>>(
  mapStateToProps,
  mapDispatchToProps
)(ReduxForm);
