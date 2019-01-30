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
});

export const DialogContainer = glamorous.div({
  position: 'relative',
  padding: '2rem',
  borderRadius: '0.2rem',
  borderTop: `0.2rem solid ${COLORS.MAIN_RED}`,
  borderBottom: `0.2rem solid ${COLORS.MAIN_RED}`,
  width: '70%',
  boxShadow: '0px 5px 15px 1px rgba(0,0,0,0.25)',
  background: COLORS.MAIN_BLACK,
  color: COLORS.PURE_WHITE,
  display: 'flex',
  flexDirection: 'column',
  '& h1': {
    fontWeight: 200,
    letterSpacing: '0.2rem',
    alignSelf: 'center',
    marginBottom: '3rem',
  },
});

export const ButtonGroup = glamorous.div({
  display: 'flex',
  flexDirection: 'row',
  width: '100%',
  background: '#000',
  '& button': {
    flexGrow: 1,
  },
  '& :first-child': {
    borderTopRightRadius: '0',
    borderBottomRightRadius: '0',
  },
  '& :last-child': {
    borderTopLeftRadius: '0',
    borderBottomLeftRadius: '0',
  },
  '& button.active': {
    fontWeight: 'bold',
  },
});

export const FormContainer = glamorous.div({
  color: COLORS.MAIN_BLACK,
  background: COLORS.PURE_WHITE,
  padding: '1rem',
});
