import { ChangeEventHandler, SyntheticEvent, useCallback, useState } from 'react';
import { useHistory } from 'react-router-dom';
import { Routes } from '~/constants';
import login from '~/services/login';
import ErrorBlock from '../ErrorBlock/ErrorBlock';
import { Spinner } from '../Spinner';

import './login-style.scss';

const Login = () => {
  const { push } = useHistory();
  const [isLoading, setLoading] = useState(false);
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState<string>();
  
  const handleUsernameChange = useCallback<
    ChangeEventHandler<HTMLInputElement>
  >(
    (event) =>
      setUsername(event.target.value),
    []
  );

  const handlePasswordChange = useCallback<
    ChangeEventHandler<HTMLInputElement>
  >((event) => setPassword(event.target.value), []);

  const handleSubmit = async (event: SyntheticEvent<HTMLFormElement>) => {
    event.preventDefault();
    setErrorMessage(null);
    setLoading(true);

    try {
      await login(username, password);
      push(Routes.PasswordHealth);
    } catch (error) {
      setErrorMessage('Username or password are incorrect');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="login-page">
      <form className="login-form" onSubmit={handleSubmit}>
        <h1 className="text-center">Password Health</h1>
        <input
          value={username}
          onChange={handleUsernameChange}
          placeholder="Username"
          type="text"
          className="input mt-52px"
        />
        <input
          value={password}
          onChange={handlePasswordChange}
          placeholder="Password"
          type="password"
          className="input mt-24px"
        />
        <ErrorBlock error={errorMessage} />
        <button type="submit" disabled={isLoading} className="button mt-24px">
          {!isLoading ? <Spinner /> : 'Login'}
        </button>
      </form>
    </div>
  );
};

export default Login;
