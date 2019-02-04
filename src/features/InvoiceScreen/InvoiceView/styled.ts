import glamorous from 'glamorous';

export const ButtonContainer = glamorous.div({
  display: 'flex',
  flexDirection: 'column',
  '& button': {
    borderRadius: '0.2rem',
    marginTop: '1rem',
    width: '100%',
  },
});
