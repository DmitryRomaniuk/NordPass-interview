import updateItem from '../updateItem';
import faker from 'faker';
import { IItem } from '../getUserItems';

describe('updateItem should', () => {
  it('return item', async () => {
    const fakeData: IItem = {
      id: faker.datatype.uuid(),
      createdAt: faker.date.future().toISOString(),
      description: faker.lorem.word(),
      password: faker.internet.password(),
      title: faker.lorem.word(),
    };
    const response = {
      status: 200,
    };
    const mockFetchPromise = Promise.resolve(response) as Promise<Response>;
    global.fetch = jest.fn().mockImplementation(() => mockFetchPromise);

    expect(await updateItem(fakeData)).toEqual(response);
  });
});
