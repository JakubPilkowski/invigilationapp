import React, { memo, useCallback, useContext, useState } from 'react';
import { useHistory, useLocation } from 'react-router';

import { AxiosContext } from 'utils/AxiosProvider';

import useCredential from 'hooks/useCredential';

import ThemedCard from 'components/ThemedCard';
import ThemedTextField from 'components/ThemedTextField';
import FancyHeading from 'components/FancyHeading';
import FancyButton from 'components/FancyButton/FancyButton';

import './Login.scss';
import { AxiosResponse } from 'axios';

type From = {
  from: { pathname: string };
};

const Login = () => {
  const [isDisabled, setIsDisabled] = useState(false);
  const location = useLocation<From>();
  const history = useHistory();
  const axios = useContext(AxiosContext);
  const { from } = location.state || { from: { pathname: '/cats' } };
  const handleError = useCallback(
    (isError: boolean) => {
      setIsDisabled(isError);
    },
    [setIsDisabled]
  );

  const {
    value: email,
    error: emailError,
    onChange: onEmailChange,
  } = useCredential('', /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/g, handleError);

  const {
    value: password,
    error: passwordError,
    onChange: onPasswordChange,
  } = useCredential('', /[a-zA-Z0-9].{6,}/, handleError);

  const handleLoginClick = () => {
    setIsDisabled(true);
    if (!emailError && !passwordError) {
      const request = {
        email,
        password,
      };
      axios
        .post<{ id: number; email: string; token: string }>('/login', request)
        .then((res: AxiosResponse<{ id: number; email: string; token: string }>) => {
          setIsDisabled(false);
          localStorage.setItem('userId', res?.data.id.toString());
          localStorage.setItem('email', res?.data.email);
          localStorage.setItem('token', res?.data.token);
          history.replace(from);
        })
        .catch(() => {
          setIsDisabled(false);
        });
    }
  };

  const handleChangeInput = ({ target: { name, value } }: React.ChangeEvent<HTMLInputElement>) => {
    if (name === 'email') {
      onEmailChange(value);
    }
    if (name === 'password') {
      onPasswordChange(value);
    }
  };

  return (
    <div className="Login">
      <ThemedCard className="Login__card" variant="contained">
        <FancyHeading title="Login" className="card__heading" />
        <form>
          <ThemedTextField
            label="Adres mailowy"
            text="email"
            name="email"
            value={email}
            required
            error={emailError}
            errorText="Niepoprawny email"
            onChange={handleChangeInput}
            helperText=""
            className="card__textfield"
            inputClassName="textfield__input"
          />

          <ThemedTextField
            label="Has??o"
            text="password"
            name="password"
            value={password}
            required
            error={passwordError}
            errorText="Has??o musi zawiera?? conajmniej 6 znak??w"
            onChange={handleChangeInput}
            helperText="Has??o musi zawiera?? conajmniej 6 znak??w"
            className="card__textfield"
            inputClassName="textfield__input"
          />

          <FancyButton onClick={handleLoginClick} className="card__button" disabled={isDisabled}>
            Login
          </FancyButton>
        </form>
      </ThemedCard>
    </div>
  );
};

export default memo(Login);
