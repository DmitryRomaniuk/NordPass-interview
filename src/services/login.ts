import { API } from '~/constants';
import getUrl from '../utils/getUrl';

export interface ILogin {
  id: string;
  token: string;
  email: string;
}

const login = async (username: string, password: string) => {
  const url = getUrl(API.Login, {
    username,
    password,
  });

  const response = await fetch(url, {
    method: 'POST',
  });
  const data: ILogin = await response.json();
  const { token } = data;

  localStorage.setItem('token', token);
};

export default login;
