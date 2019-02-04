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

export const DatePickerContainer = glamorous.div({
  padding: 0,
  '& input': {
    width: '100%',
    height: '100%',
    margin: 0,
    border: 'none',
    padding: '8px 10px',
    outline: 0,
    borderRadius: '4px',
    [':focus']: {
      borderColor: '#6db3fd',
      boxShadow:
        '3px 3px 0 #6db3fd, -3px -3px 0 #6db3fd, -3px 3px 0 #6db3fd, 3px -3px 0 #6db3fd',
    },
  },
  '& .react-datepicker__input-container': {
    width: '100%',
    height: '100%',
  },
  '& .react-datepicker-wrapper': {
    width: '100%',
    height: '100%',
  },
});
