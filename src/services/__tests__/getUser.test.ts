import getUser, { User } from '../getUser';
import faker from 'faker';

describe('getUser should', () => {
    beforeEach(() => {
        global.localStorage.removeItem = jest.fn();
    })
  it('return user', async () => {
    const fakeUser: User = {
      id: faker.datatype.uuid(),
      email: faker.internet.email(),
      username: faker.lorem.word(),
    };
    const mockFetchPromise = Promise.resolve({
      json: () => Promise.resolve(fakeUser),
    }) as Promise<Response>;
    global.fetch = jest.fn().mockImplementation(() => mockFetchPromise);

    const user = await getUser();

    expect(user).toEqual(fakeUser);
  });
  it('throw error on 401 error and clean localStorage', async () => {
    const error = {
      status: 401,
    };
    const mockFetchPromise = Promise.resolve(error) as Promise<Response>;
    global.fetch = jest.fn().mockImplementation(() => mockFetchPromise);

    await expect(getUser()).rejects.toThrowError('Please relogin');
    expect(global.localStorage.removeItem).toHaveBeenCalled();
  });
  it('throw error on 403 error and localStorage isn\'t invoked', async () => {
    const error = {
      status: 403,
    };
    const mockFetchPromise = Promise.resolve(error) as Promise<Response>;
    global.fetch = jest.fn().mockImplementation(() => mockFetchPromise);

    await expect(getUser()).rejects.toThrowError('Something goes wrong');
    expect(global.localStorage.removeItem).not.toHaveBeenCalled();
  });
});
