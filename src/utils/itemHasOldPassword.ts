import { IItem } from '~/services/getUserItems';

const itemHasOldPassword = ({ createdAt }: IItem) => {
  const expiration = new Date();

  expiration.setDate(expiration.getDate() - 30);

  return new Date(createdAt) < expiration;
};

export default itemHasOldPassword;
