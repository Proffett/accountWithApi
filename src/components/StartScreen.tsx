import React from 'react';
import { useHistory } from 'react-router';
import { Button, ButtonGroup } from '@material-ui/core';

import LoginForm from './LoginForm';

const StartScreen: React.FC = () => {
  const history = useHistory();
  const routeChange = (url: string) => {
    const path = `${url}`;
    history.push(path);
  };

  return (
    <>
      {localStorage.getItem('token') ? (
        <div className="StartScreen">
          <h1>Выберите действие</h1>
          <ButtonGroup>
            <Button onClick={() => routeChange('/register')}>Создать профиль</Button>
            <Button onClick={() => routeChange('/login')}>Войти в другой профиль</Button>
          </ButtonGroup>
          <br />
          <br />
          <ButtonGroup>
            <Button onClick={() => routeChange('/account')}>Личный кабинет</Button>
            <Button
              onClick={() => {
                localStorage.clear();
                routeChange('/');
              }}
            >
              Выйти
            </Button>
          </ButtonGroup>
        </div>
      ) : (
        // if this a first authorization
        <LoginForm />
      )}
    </>
  );
};

export default StartScreen;
