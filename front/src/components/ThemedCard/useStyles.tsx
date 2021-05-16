import { makeStyles, Theme } from '@material-ui/core/styles';
import { ThemedColor } from 'globals/theme';

export default makeStyles((theme: Theme) => {
  return {
    ThemedCard: {
      'box-sizing': 'border-box',
      'border-radius': 20,
      'padding': 15,
    },
    ThemedCard__contained: ({ color }: { color: ThemedColor }) => {
      const { main, dark, contrastText } = theme.palette[color];
      return {
        'boxShadow': `inset 0 0 0 2px ${main}`,
        'color': contrastText,
        'transition': 'box-shadow 400ms',
        '&:hover': {
          boxShadow: `inset 0 0 0 3px ${dark}`,
        },
      };
    },
    ThemedCard__outlined: ({ color }: { color: ThemedColor }) => {
      const { main, dark, contrastText } = theme.palette[color];
      return {
        'border': `2px solid ${main}`,
        'color': contrastText,
        'boxShadow': `0 0 0 2px #fff, 0 0 0 4px ${main}`,
        'transition': 'border 400ms, box-shadow 400ms',
        '&:hover': {
          border: `2px solid ${dark}`,
          boxShadow: `0 0 0 3px #fff, 0 0 0 6px ${dark}`,
        },
      };
    },
  };
});
