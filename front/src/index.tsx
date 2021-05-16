import React from 'react';
import ReactDom from 'react-dom';
import { BrowserRouter } from 'react-router-dom';
import { ThemeProvider } from '@material-ui/core/styles';
import theme from 'globals/theme';
import Main from 'routs/Main';
import SocketProvider from 'utils/SocketProvider';

ReactDom.render(
  <BrowserRouter basename="">
    <SocketProvider>
      <ThemeProvider theme={theme}>
        <Main />
      </ThemeProvider>
    </SocketProvider>
  </BrowserRouter>,
  document.getElementById('root')
);
