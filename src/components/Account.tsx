import React, { useState } from 'react';
import { Redirect } from 'react-router';
import { Button, ButtonGroup, Container, Divider, Input, List, ListItem } from '@material-ui/core';

import testApi from '../utils/testApi';
import { validatePassword } from '../utils/validation';

import Loader from './Loader';

const Account: React.FC = () => {
  const [username, setUsername] = useState(localStorage.getItem('username'));
  const [firstName, setFirstName] = useState(localStorage.getItem('first_name'));
  const [lastName, setLastName] = useState(localStorage.getItem('last_name'));
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [isSubmit, setIsSubmit] = useState(false);
  const [isUpdate, setIsUpdate] = useState(false);
  const [error, setError] = useState({
    usernameError: false,
    firstName: false,
    lastName: false,
    passwordError: false,
    submitError: false,
  });

  const userId = localStorage.getItem('id');

  const handlePassword = (event: React.ChangeEvent<HTMLInputElement>): void => {
    const data = event.target.value;
    const result = validatePassword(data);
    setError({ ...error, passwordError: !result });
    setPassword(data);
  };

  const handleEditProfile = async () => {
    setIsLoading(true);
    testApi
      .patchData(`api/v1/users/${userId}/`, {
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

  function renderProfile() {
    return (
      <>
        {isUpdate ? (
          <Container>
            <h1>Редактирование профиля</h1>
            <List className="Profile_list">
              <ListItem>
                Имя пользователя:{' '}
                <Input value={username} onChange={(event) => setUsername(event.target.value)} />
              </ListItem>
              <ListItem>
                Имя:{' '}
                <Input value={firstName} onChange={(event) => setFirstName(event.target.value)} />
              </ListItem>
              <ListItem>
                Фамилия:{' '}
                <Input value={lastName} onChange={(event) => setLastName(event.target.value)} />
              </ListItem>
              <ListItem>
                Пароль*:{' '}
                <Input
                  required
                  error={error.passwordError}
                  value={password}
                  onChange={handlePassword}
                />
              </ListItem>
            </List>

            <br />
            <Divider light />
            <br />

            <ButtonGroup>
              <Button variant="outlined" color="primary" onClick={handleEditProfile}>
                Обновить профиль
              </Button>
              <Button variant="outlined" color="secondary" onClick={() => localStorage.clear()}>
                <a style={{ textDecoration: 'unset' }} href="/">
                  Выйти
                </a>
              </Button>
            </ButtonGroup>

            {isLoading && <Loader />}
            {isSubmit && <h6 style={{ color: 'green' }}>Данные обновлены</h6>}
            {error.submitError && (
              <>
                <h6 style={{ color: 'red' }}>ошибка при отправке данных, попробуйте снова</h6>
                <h6 style={{ color: 'red' }}>
                  Пароль должен быть от 8 симв., мин. 1 цифра и мин. 1 заглавная буква латиницей
                </h6>
              </>
            )}
          </Container>
        ) : (
          <Container>
            <h1>Личный кабинет</h1>
            <List className="Profile_list">
              <ListItem>Имя пользователя: {localStorage.getItem('username')}</ListItem>
              <ListItem>id: {localStorage.getItem('id')}</ListItem>
              <ListItem>Имя: {localStorage.getItem('first_name')}</ListItem>
              <ListItem>Фамилия: {localStorage.getItem('last_name')}</ListItem>
            </List>

            <br />
            <Divider light />
            <br />

            <ButtonGroup>
              <Button variant="outlined" color="primary" onClick={() => setIsUpdate(true)}>
                Редактировать
              </Button>
              <Button variant="outlined" color="secondary" onClick={() => localStorage.clear()}>
                <a style={{ textDecoration: 'unset' }} href="/">
                  Выйти
                </a>
              </Button>
            </ButtonGroup>
          </Container>
        )}
      </>
    );
  }

  return <>{localStorage.getItem('token') ? renderProfile() : <Redirect to="/" />}</>;
};

export default Account;
