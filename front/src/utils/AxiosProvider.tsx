import React, { createContext, memo } from 'react';
import Axios from 'axios';

const axios = Axios.create({
  timeout: 10000,
});

export const AxiosContext = createContext(axios);

type ApiProviderProps = {
  url: string;
  children: React.ReactNode;
};

const AxiosProvider = ({ url, children }: ApiProviderProps) => {
  axios.defaults.baseURL = url;

  return <AxiosContext.Provider value={axios}>{children}</AxiosContext.Provider>;
};

export default memo(AxiosProvider);
