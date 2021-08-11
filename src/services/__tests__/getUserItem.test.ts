import getUserItems from '../getUserItems';
import faker from 'faker';
import { IItem } from '../getUserItems';

describe('getUserItems should', () => {
  it('return item', async () => {
    const fakeData: Array<IItem> = [
      {
        id: faker.datatype.uuid(),
        createdAt: faker.date.future().toISOString(),
        description: faker.lorem.word(),
        password: faker.internet.password(),
        title: faker.lorem.word(),
      },
    ];
    const mockFetchPromise = Promise.resolve({
      json: () => Promise.resolve({ items: fakeData }),
    }) as Promise<Response>;
    global.fetch = jest.fn().mockImplementation(() => mockFetchPromise);

    expect(await getUserItems()).toEqual(fakeData);
  });
  it('return empty array on error', async () => {
    const mockFetchPromise = Promise.resolve({
      json: () => Promise.reject({  }),
    }) as Promise<Response>;
    global.fetch = jest.fn().mockImplementation(() => mockFetchPromise);

    await expect(getUserItems()).resolves.toEqual([]);
  });
});
