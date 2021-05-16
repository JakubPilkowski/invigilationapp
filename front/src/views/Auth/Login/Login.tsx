import React, { memo, useCallback, useContext, useState } from 'react';
import useCredential from 'hooks/useCredential';
import ThemedCard from 'components/ThemedCard';
import ThemedTextField from 'components/ThemedTextField';
import FancyHeading from 'components/FancyHeading';
import FancyButton from 'components/FancyButton/FancyButton';

import './Login.scss';
import { AxiosContext } from 'utils/AxiosProvider';
import { useHistory, useLocation } from 'react-router';
import { SocketContext } from 'utils/SocketProvider';

type From = {
  from: { pathname: string };
};

const Login = () => {
  const [isDisabled, setIsDisabled] = useState(false);
  const location = useLocation<From>();
  const history = useHistory();
  const socket = useContext(SocketContext);
  const { from } = location.state || { from: { pathname: '/' } };
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
      socket?.emit('authentication', request);
      socket?.on('authenticated', (data) => {
        console.log(data);
        setIsDisabled(false);
        // localStorage.setItem('userId', data?.data?.id);
        // localStorage.setItem('email', email);
        // localStorage.setItem('token', data?.data?.auth_token);
        // history.replace(from);
      });
      socket?.on('unathorized', (err) => {
        console.log(err);
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
            label="Hasło"
            text="password"
            name="password"
            value={password}
            required
            error={passwordError}
            errorText="Hasło musi zawierać conajmniej 6 znaków"
            onChange={handleChangeInput}
            helperText="Hasło musi zawierać conajmniej 6 znaków"
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
