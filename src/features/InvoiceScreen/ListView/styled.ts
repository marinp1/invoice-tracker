import glamorous from 'glamorous';

export const FirstItemContainer = glamorous.div({
  display: 'flex',
  flexDirection: 'row',
  '& button': {
    borderTopLeftRadius: 0,
    borderBottomLeftRadius: 0,
  },
  '& input': {
    borderTopRightRadius: 0,
    borderBottomRightRadius: 0,
  },
});
