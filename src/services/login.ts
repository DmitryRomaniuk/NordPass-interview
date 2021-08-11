import { API } from '~/constants';
import getUrl from '../utils/getUrl';

export interface ILogin {
  id: string;
  token: string;
  email: string;
}

const login = async (username: string, password: string) => {
  const url = getUrl(API.Login);

  const response = await fetch(url, {
    method: 'POST',
    body: JSON.stringify({
      username,
      password,
    }),
    headers: {
      'Content-Type': 'application/json',
    },
  });
  const data: ILogin = await response.json();
  const { token } = data;

  localStorage.setItem('token', token);
};

export default login;
