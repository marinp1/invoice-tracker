import * as React from 'react';
import { Field, InjectedFormProps, reduxForm } from 'redux-form';
import { ForgotPasswordDiv } from '../styled';
import CustomButton from '../../Utils/CustomButton';

import { connect } from 'react-redux';
import { ConfigProps, reset } from 'redux-form';
import { AuthThunkDispatch, signUp } from '../authActions';

import AppState from '../../../types/state';
import { AuthStateType } from '../../../types';

import { COLORS } from '../../../styles';

const renderGeneralField: React.SFC<any> = ({
  input,
  label,
  type,
  meta: { touched, error, warning },
}) => (
  <div className="form-group">
    <label htmlFor="password">{label}</label>
    <input
      {...input}
      placeholder={label}
      type={type}
      className="form-control"
    />
    {touched &&
      ((error && <span style={{ color: COLORS.MAIN_RED }}>{error}</span>) ||
        (warning && <span>{warning}</span>))}
  </div>
);

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
  firstName: string;
  username: string;
  emailAddress: string;
  password: string;
  confirmPassword: string;
}

type Partial<T> = { [P in keyof T]?: T[P] };

type Props = CustomProps & InjectedFormProps<SignUpFormData, CustomProps>;

const validate = (values: SignUpFormData) => {
  const errors: Partial<SignUpFormData> = {};

  if (!values.firstName) {
    errors.firstName = 'Required';
  } else if (values.firstName.length > 15) {
    errors.firstName = 'Must be 15 characters or less';
  }

  if (!values.username) {
    errors.username = 'Required';
  } else if (values.username.length > 15) {
    errors.username = 'Must be 15 characters or less';
  }

  if (!values.emailAddress) {
    errors.emailAddress = 'Required';
  } else if (
    !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.emailAddress)
  ) {
    errors.emailAddress = 'Invalid email address';
  }

  if (!values.password) {
    errors.password = 'Required';
  } else if (
    !/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[$@$!%*?&])[A-Za-z\d$@$!%*?&]{12,}/i.test(
      values.password
    )
  ) {
    errors.password =
      'Password should be over 12 characters, contain both lowercase and uppercase letters and at least one number and special character.';
  }

  if (!errors.password && !values.confirmPassword) {
    errors.confirmPassword = 'Required';
  }

  if (values.password && values.password !== values.confirmPassword) {
    errors.confirmPassword = "Passwords don't match";
  }

  return errors;
};

const FormComponent: React.SFC<Props> = (props: Props) => {
  return (
    <React.Fragment>
      <form onSubmit={props.handleSubmit}>
        <Field
          name="firstName"
          type="text"
          component={renderGeneralField}
          label="First name"
        />
        <Field
          name="username"
          type="text"
          component={renderGeneralField}
          label="Username"
        />
        <Field
          name="emailAddress"
          type="email"
          component={renderGeneralField}
          label="Email address"
        />
        <Field
          name="password"
          type="password"
          component={renderGeneralField}
          label="Password"
        />
        <Field
          name="confirmPassword"
          type="password"
          component={renderGeneralField}
          label="Confirm password"
        />
        <CustomButton id="signup-button" theme="primary">
          SIGN UP
        </CustomButton>
      </form>
      <ForgotPasswordDiv
        onClick={() => props.changeAuthState('Verify')}
        disabled={props.submitting || props.invalid}
      >
        <a>Insert verification code</a>
      </ForgotPasswordDiv>
    </React.Fragment>
  );
};

const ReduxForm = reduxForm<SignUpFormData, CustomProps>({ validate })(
  FormComponent
);

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
      dispatch(signUp(formData));
      dispatch(reset('signup-form'));
    },
  };
}

export default connect<ConfigProps<SignUpFormData, CustomProps>>(
  mapStateToProps,
  mapDispatchToProps
)(ReduxForm);
