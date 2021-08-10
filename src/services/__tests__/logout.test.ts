import logout from '../logout';

describe('logout should', () => {
  beforeEach(() => {
    global.localStorage.removeItem = jest.fn();
  });
  it('set token to localStorage', async () => {
    const mockFetchPromise = Promise.resolve({
      json: () => Promise.resolve({}),
    }) as Promise<Response>;
    global.fetch = jest.fn().mockImplementation(() => mockFetchPromise);

    await logout();

    expect(global.localStorage.removeItem).toHaveBeenCalledWith('token');
  });
});
