import { makeStyles, Theme } from '@material-ui/core';
import { ThemedColor } from 'globals/theme';

export default makeStyles((theme: Theme) => ({
  Heading: ({
    colorPrimary,
    colorSecondary,
  }: {
    colorPrimary: ThemedColor;
    colorSecondary: ThemedColor;
  }) => {
    const primary = theme.palette[colorPrimary];
    const secondary = theme.palette[colorSecondary];

    console.log(theme);

    return {
      fontFamily: 'Roboto',
      fontSize: 30,
      letterSpacing: 2,
      fontWeight: 'bold',
      backgroundImage: `linear-gradient(to right, ${primary.main}, ${secondary.main})`,
      WebkitBackgroundClip: 'text',
      backgroundClip: 'text',
      color: 'transparent',
    };
  },
}));
