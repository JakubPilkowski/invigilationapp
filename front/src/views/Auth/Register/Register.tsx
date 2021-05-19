import React, { memo, useCallback, useContext, useState } from 'react';
import { Link, useHistory } from 'react-router-dom';
import { AxiosResponse } from 'axios';

import { AxiosContext } from 'utils/AxiosProvider';

import useCredential from 'hooks/useCredential';

import ThemedCard from 'components/ThemedCard';
import ThemedTextField from 'components/ThemedTextField';
import FancyHeading from 'components/FancyHeading';
import FancyButton from 'components/FancyButton/FancyButton';

import './Register.scss';

const Register = () => {
  const [isDisabled, setIsDisabled] = useState(false);

  const axios = useContext(AxiosContext);
  const history = useHistory();
  const handleError = useCallback(
    (isError: boolean) => {
      setIsDisabled(isError);
    },
    [setIsDisabled]
  );
  const {
    value: username,
    error: usernameError,
    onChange: onUsernameChange,
  } = useCredential('', /[a-zA-Z0-9].{3,20}/, handleError);

  const {
    value: email,
    error: emailError,
    onChange: onEmailChange,
  } = useCredential('', /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/g, handleError);

  const {
    value: password,
    error: passwordError,
    onChange: onPasswordChange,
  } = useCredential('', /[a-zA-Z0-9].{5,}/, handleError);

  const handleRegisterClick = () => {
    setIsDisabled(true);
    if (!usernameError && !emailError && !passwordError) {
      const request = {
        username,
        email,
        password,
      };
      axios
        .post<{ id: number; email: string; token: string }>('/register', request)
        .then((res: AxiosResponse<{ id: number; email: string; token: string }>) => {
          setIsDisabled(false);
          localStorage.setItem('userId', res.data?.id.toString());
          localStorage.setItem('email', res.data?.email);
          localStorage.setItem('token', res.data?.token);
          history.replace('/cats');
        })
        .catch(() => {
          setIsDisabled(false);
        });
    } else {
      setIsDisabled(false);
    }
  };

  const handleChangeInput = ({ target: { name, value } }: React.ChangeEvent<HTMLInputElement>) => {
    if (name === 'username') {
      onUsernameChange(value);
    }
    if (name === 'email') {
      onEmailChange(value);
    }
    if (name === 'password') {
      onPasswordChange(value);
    }
  };

  return (
    <div className="Register">
      <ThemedCard className="Register__card" variant="contained">
        <FancyHeading title="Rejestracja" className="card__heading" />

        <form>
          <ThemedTextField
            label="Nazwa użytkownika"
            text="username"
            name="username"
            value={username}
            required
            error={usernameError}
            errorText="Nazwa użytkownika musi zawierać od 4 do 20 znaków"
            onChange={handleChangeInput}
            helperText="Nazwa użytkownika musi zawierać od 4 do 20 znaków"
            className="card__textfield"
            inputClassName="textfield__input"
          />

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
            errorText="Hasło musi zawierać co najmniej 6 znaków"
            onChange={handleChangeInput}
            helperText="Hasło musi zawierać co najmniej 6 znaków"
            className="card__textfield"
            inputClassName="textfield__input"
          />

          <FancyButton onClick={handleRegisterClick} className="card__button" disabled={isDisabled}>
            Zarejestruj
          </FancyButton>

          <Link to="/login" replace className="Register__link">
            Masz konto? Przejdź do logowania
          </Link>
        </form>
      </ThemedCard>
    </div>
  );
};

export default memo(Register);
