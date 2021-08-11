import login from '../login';

describe('login should', () => {
  beforeEach(() => {
    global.localStorage.removeItem = jest.fn();
  });
  it('set token to localStorage', async () => {
    const mockFetchPromise = Promise.resolve({
      json: () => Promise.resolve({ token: 'tokenStr' }),
    }) as Promise<Response>;
    global.fetch = jest.fn().mockImplementation(() => mockFetchPromise);

    await login('username', 'password');

    expect(global.localStorage.setItem).toHaveBeenCalledWith(
      'token',
      'tokenStr'
    );
  });
});
