import React, { FormEvent, useState } from 'react';
import { Redirect } from 'react-router';
import { Button, Container, FormControl, Input, InputLabel } from '@material-ui/core';

import testApi from '../utils/testApi';
import { validateName, validatePassword, validateUsername } from '../utils/validation';

import Loader from './Loader';

const RegisterForm: React.FC = () => {
  const [username, setUsername] = useState('');
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [isSubmit, setIsSubmit] = useState(false);
  const [error, setError] = useState({
    usernameError: false,
    firstNameError: false,
    lastNameError: false,
    passwordError: false,
    submitError: false,
  });

  const handleSubmit = (event: FormEvent) => {
    event.preventDefault();
    setIsLoading(true);
    setIsSubmit(false);
    setError({ ...error, submitError: false });

    // sending data to backend
    testApi
      .postData('api/v1/users/', {
        body: { username, password, first_name: firstName, last_name: lastName, is_active: true },
      })
      .then(async (response) => {
        if (response.ok) {
          setIsLoading(false);
          setIsSubmit(true);
          const result = await response.json();
          Object.entries(result).forEach(([key, value]) => {
            localStorage.setItem(`${key}`, value as string);
          });
        } else setError({ ...error, submitError: true });
      })
      .catch(() => setError({ ...error, submitError: true }));
  };

  const handleFirstName = (event: React.ChangeEvent<HTMLInputElement>): void => {
    const data = event.target.value;
    const result = validateName(data);
    setError({ ...error, firstNameError: !result });
    setFirstName(data);
  };
  const handleLastName = (event: React.ChangeEvent<HTMLInputElement>): void => {
    const data = event.target.value;
    const result = validateUsername(data);
    setError({ ...error, lastNameError: !result });
    setLastName(data);
  };
  const handleUserName = (event: React.ChangeEvent<HTMLInputElement>): void => {
    const data = event.target.value;
    const result = validateUsername(data);
    setError({ ...error, usernameError: !result });
    setUsername(data);
  };
  const handlePassword = (event: React.ChangeEvent<HTMLInputElement>): void => {
    const data = event.target.value;
    const result = validatePassword(data);
    setError({ ...error, passwordError: !result });
    setPassword(data);
  };

  return (
    <Container>
      {isSubmit ? (
        <Redirect to="/" />
      ) : (
        <form onSubmit={handleSubmit}>
          <Container maxWidth="sm">
            <h1>Регистрация</h1>
            <FormControl fullWidth>
              <InputLabel htmlFor="username">Имя пользователя</InputLabel>
              <Input
                id="username"
                value={username}
                onChange={handleUserName}
                error={error.usernameError}
                required
                type="text"
              />
              {isLoading && <Loader />}
              {error.usernameError &&
                'имя может быть только из латин. букв, цифр и @/./+/-/_, от 8 симв'}
            </FormControl>

            <FormControl fullWidth>
              <InputLabel htmlFor="name">Имя</InputLabel>
              <Input
                id="name"
                value={firstName}
                onChange={handleFirstName}
                error={error.firstNameError}
                required
                type="text"
              />
              {error.firstNameError &&
                'Имя может быть только из латин. букв от 3 символов, но не более 30'}
            </FormControl>

            <FormControl fullWidth>
              <InputLabel htmlFor="lastname">Фамилия</InputLabel>
              <Input
                id="lastname"
                value={lastName}
                onChange={handleLastName}
                error={error.lastNameError}
                required
                type="text"
              />
              {error.lastNameError &&
                'фамилия может быть только из латин. букв и не более 150 символов'}
            </FormControl>

            <FormControl fullWidth>
              <InputLabel htmlFor="password">Пароль</InputLabel>
              <Input
                id="password"
                value={password}
                onChange={handlePassword}
                required
                error={error.passwordError}
                type="text"
              />
              {error.passwordError &&
                'Пароль должен быть от 8 симв., мин. 1 цифра и мин. 1 заглавная буква латиницей'}
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
              Зарегистрироваться
            </Button>
            {error.submitError && (
              <h6 style={{ color: 'red' }}>Ошибка при отправке данных, попробуйте снова</h6>
            )}
          </Container>
        </form>
      )}
    </Container>
  );
};

export default RegisterForm;
