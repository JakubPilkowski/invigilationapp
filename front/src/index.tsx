import React from 'react';
import ReactDom from 'react-dom';
import { BrowserRouter } from 'react-router-dom';
import { ThemeProvider } from '@material-ui/core/styles';
import theme from 'globals/theme';
import Main from 'routs/Main';
import AxiosProvider from 'utils/AxiosProvider';

ReactDom.render(
  <BrowserRouter basename="">
    <AxiosProvider url="http://localhost:3000">
      <ThemeProvider theme={theme}>
        <Main />
      </ThemeProvider>
    </AxiosProvider>
  </BrowserRouter>,
  document.getElementById('root')
);
