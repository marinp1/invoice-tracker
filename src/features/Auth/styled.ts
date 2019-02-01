import { COLORS } from '../../styles';
import glamorous from 'glamorous';

export const Container = glamorous.div({
  top: 0,
  bottom: 0,
  left: 0,
  right: 0,
  position: 'absolute',
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  backgroundColor: COLORS.MAIN_BLACK,
  '& .dialogContainer': {
    position: 'relative',
    padding: '2rem',
    borderRadius: '0.2rem',
    width: '70%',
    boxShadow: '0px 5px 15px 1px rgba(0,0,0,0.25)',
    background: COLORS.ACCENT_WHITE,
    color: COLORS.PURE_BLACK,
    display: 'flex',
    flexDirection: 'column',
    '& h1': {
      fontWeight: 200,
      textAlign: 'center',
      letterSpacing: '0.2rem',
      marginBottom: '2rem',
    },
  },
});

export const ButtonGroup = glamorous.div({
  display: 'flex',
  flexDirection: 'row',
  width: '100%',
  '& button': {
    flexGrow: 1,
    borderRadius: 0,
    border: '0.1rem solid #e1e1e1',
  },
  '& :first-child': {
    borderTopLeftRadius: '0.5rem',
    borderRight: '0.04rem solid #e1e1e1',
  },
  '& :last-child': {
    borderTopRightRadius: '0.5rem',
    borderLeft: '0.04rem solid #e1e1e1',
  },
  '& button.active': {
    borderBottom: 0,
    fontWeight: 'bold',
    cursor: 'initial',
    [':hover']: {
      filter: 'initial',
    },
  },
});

export const FormContainer = glamorous.div({
  color: COLORS.MAIN_BLACK,
  background: COLORS.PURE_WHITE,
  border: '0.1rem solid #e1e1e1',
  borderTop: 0,
  borderRadius: '0 0 0.5rem 0.5rem',
  padding: '1rem',
  '& #login-button': {
    width: '100%',
    borderRadius: '0.2rem',
  },
  '& #signup-button': {
    marginTop: '0.5rem',
    width: '100%',
    borderRadius: '0.2rem',
  },
  '& #verify-button': {
    marginTop: '0.5rem',
    width: '100%',
    borderRadius: '0.2rem',
  },
});

export const ForgotPasswordDiv = glamorous.div({
  marginTop: '1rem',
  textAlign: 'center',
  '& a': {
    color: COLORS.MAIN_BLACK,
  },
});
