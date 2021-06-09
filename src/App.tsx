import React, { useState } from 'react';
import { HashRouter, NavLink, Route, Switch } from 'react-router-dom';
import { Button, Container } from '@material-ui/core';

import Account from './components/Account';
import LoginForm from './components/LoginForm';
import RegisterForm from './components/RegisterForm';
import StartScreen from './components/StartScreen';

import './App.css';

const App: React.FC = () => {
  const [isToken, setIsToken] = useState(false);

  return (
    <HashRouter>
      <Container>
        <div className="App">
          <header>
            <Container>
              <nav className="TopMenu ">
                {!isToken ? (
                  <ul>
                    <li>
                      <NavLink activeClassName="selected" exact to="/" className="nav-link">
                        Главная
                      </NavLink>
                    </li>
                    <li>
                      <NavLink activeClassName="selected" to="/login" className="nav-link">
                        Вход
                      </NavLink>
                    </li>
                  </ul>
                ) : (
                  <ul>
                    <li>
                      <NavLink activeClassName="selected" exact to="/" className="nav-link">
                        Главная
                      </NavLink>
                    </li>
                    <li>
                      <NavLink activeClassName="selected" to="/account" className="nav-link">
                        Кабинет
                      </NavLink>
                    </li>
                    <li>
                      <Button
                        onClick={() => {
                          setIsToken(false);
                          localStorage.clear();
                        }}
                      >
                        Выйти
                      </Button>
                    </li>
                  </ul>
                )}
              </nav>
            </Container>
          </header>
          <br />

          <main className="MainWrapper">
            <Switch>
              <Route exact path="/" component={StartScreen} />
              <Route path="/login" component={LoginForm} />
              <Route path="/account" component={Account} />
              <Route path="/register" component={RegisterForm} />
            </Switch>
          </main>
        </div>
      </Container>
    </HashRouter>
  );
};

export default App;
