import { IItem } from '~/services/getUserItems';
import itemHasOldPassword from '../itemHasOldPassword';

test('should return true if createdAt is more than 30 days', () => {
  const items: IItem[] = [
    {
      id: '000',
      title: 'discord',
      description: 'rumors',
      password: 'discordPassword123.',
      createdAt: new Date(2020).toISOString(),
    },
    {
      id: '010',
      title: 'Nintendo',
      description: 'Lets play',
      password: 'pass1',
      createdAt: new Date().toISOString(),
    },
  ];
  expect(itemHasOldPassword(items[0])).toBe(true);
  expect(itemHasOldPassword(items[1])).toBe(false);
});
