import React, { useState } from 'react';
import { RouteComponentProps } from 'react-router-dom';

type LoginProps = { name: string };

function Login(props: RouteComponentProps & LoginProps) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  function onEmailChangeHandler(event: React.ChangeEvent<HTMLInputElement>) {
    setEmail(event.target.value);
  }

  function onPasswordChangeHandler(event: React.ChangeEvent<HTMLInputElement>) {
    setPassword(event.target.value);
  }

  function loginHandler(event: React.MouseEvent): void {
    event.preventDefault();
    if (email === 'randelramirez1@gmail.com' && password === 'Randel1_23') {
      props.history.replace('/Timesheet');
    }

    return;
  }

  return (
    <div>
      <form>
        <label htmlFor="email">
          Email
          <span role="img" aria-label="email">
            📧
          </span>
        </label>
        <input
          type="email"
          name="email"
          placeholder="Email"
          onChange={onEmailChangeHandler}
          value={email}
        />
        <label htmlFor="password">
          Password
          <span role="img" aria-label="password">
            🔑
          </span>
          <input
            type="password"
            name="password"
            onChange={onPasswordChangeHandler}
            value={password}
          />
          <button onClick={loginHandler} type="button">
            Login
          </button>
        </label>
      </form>
    </div>
  );
}

export default Login;
