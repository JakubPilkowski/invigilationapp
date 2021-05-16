import { createMuiTheme } from '@material-ui/core/styles';
import { lightBlue, orange, red } from '@material-ui/core/colors';

export type ThemedColor = 'primary' | 'secondary' | 'error';

export default createMuiTheme({
  palette: {
    primary: orange,
    secondary: lightBlue,
    error: red,
  },
});
