import React, { FormEvent, useState } from 'react';
import { Redirect } from 'react-router';
import { Button, Container, FormControl, Input, InputLabel } from '@material-ui/core';

import testApi from '../utils/testApi';
import { validateUsername } from '../utils/validation';

import Loader from './Loader';

const LoginForm: React.FC = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [isSubmit, setIsSubmit] = useState(false);
  const [error, setError] = useState({
    usernameError: false,
    passwordError: false,
    submitError: false,
  });

  const handleUsername = (event: React.ChangeEvent<HTMLInputElement>): void => {
    const data = event.target.value;
    const result = validateUsername(data);
    setError({ ...error, usernameError: !result });
    setUsername(data);
  };

  const handlePassword = (event: React.ChangeEvent<HTMLInputElement>): void => {
    const data = event.target.value;
    setPassword(data);
  };

  const handleSubmit = (event: FormEvent) => {
    event.preventDefault();
    setIsLoading(true);
    setIsSubmit(false);
    setError({ ...error, submitError: false });

    // sending data to backend
    testApi
      .postData('api-token-auth/', {
        body: { username, password },
      })
      .then(async (response) => {
        if (response.ok) {
          const { token } = await response.json();
          localStorage.setItem('token', token);
          setIsLoading(false);
          setIsSubmit(true);
          setIsLoading(false);
        } else {
          setIsLoading(false);
          setError({ ...error, submitError: true });
        }
      })
      .catch(() => {
        setIsLoading(false);
        setError({ ...error, submitError: true });
      });
  };

  return (
    <>
      {/* if logged - show user's actions */}
      {isSubmit ? (
        <Redirect to="/" />
      ) : (
        <form onSubmit={handleSubmit}>
          <Container maxWidth="sm">
            <h1>Вход в кабинет</h1>
            <FormControl fullWidth>
              <InputLabel htmlFor="username">Имя пользователя</InputLabel>
              <Input
                id="username"
                value={username}
                onChange={handleUsername}
                error={error.usernameError}
                required
                type="text"
              />
              {error.usernameError
                ? 'имя может быть только из латин. букв, цифр и @/./+/-/_, от 8 симв'
                : null}
            </FormControl>

            <FormControl fullWidth>
              <InputLabel htmlFor="password">Пароль</InputLabel>
              <Input
                id="password"
                value={password}
                onChange={handlePassword}
                required
                type="text"
              />
              {error.passwordError ? 'Пароль должен быть от 8 симв. с цифрами и латиницей' : null}
            </FormControl>
            <br />
            <br />

            <Button
              disabled={error.passwordError || error.usernameError}
              variant="outlined"
              color="primary"
              size="large"
              type="submit"
            >
              Войти
            </Button>
            {error.submitError && (
              <h6 style={{ color: 'red' }}>
                Неверный пользователь или пароль, ошибка при отправке данных, попробуйте снова
              </h6>
            )}
          </Container>
        </form>
      )}
      {isLoading && <Loader />}
    </>
  );
};

export default LoginForm;
