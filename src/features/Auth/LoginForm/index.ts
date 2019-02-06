import { connect } from 'react-redux';
import { ConfigProps, reset } from 'redux-form';
import { AuthThunkDispatch, login } from '../authActions';
import AppState from '../../../types/state';
import LoginForm, { LoginFormData, CustomProps } from './FormComponent';

const mapStateToProps = (
  state: AppState | {},
  props: CustomProps
): ConfigProps<LoginFormData, CustomProps> => ({
  initialValues: {},
  form: 'login-form',
});

interface DispatchProps {
  onSubmit: (
    formData: LoginFormData,
    dispatch: AuthThunkDispatch,
    props: CustomProps
  ) => void;
}

function mapDispatchToProps(dispatch: AuthThunkDispatch): DispatchProps {
  return {
    onSubmit: (
      formData: LoginFormData,
      dispatch: AuthThunkDispatch,
      props: CustomProps
    ) => {
      dispatch(login(formData));
      dispatch(reset('login-form'));
    },
  };
}

export default connect<ConfigProps<LoginFormData, CustomProps>>(
  mapStateToProps,
  mapDispatchToProps
)(LoginForm);
