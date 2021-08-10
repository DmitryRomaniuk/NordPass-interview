import { API } from '~/constants';
import getUrl from '~/utils/getUrl';

export interface User {
  id: string;
  username: string;
  email: string;
}

const getUser = async (): Promise<User> => {
  const response = await fetch(getUrl(API.User), {
    headers: {
      Authorization: `Bearer ${localStorage.getItem('token')}`,
    },
  });

  if (response.status === 401) {
    localStorage.removeItem('token');
    throw new Error('Please relogin');
  }

  if (response.status >= 400) {
    throw new Error('Something goes wrong');
  }

  return await response.json()
};

export default getUser;
