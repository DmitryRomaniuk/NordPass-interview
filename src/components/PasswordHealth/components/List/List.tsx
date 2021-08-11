import { FC, useCallback, useState } from 'react';
import { IItem } from '~/services/getUserItems';
import ItemIcon from './components/ItemIcon';
import updateItem from '../../../../services/updateItem';

import './list-style.scss';
import { UpdateModal } from './components/UpdateModal';

interface IList {
  items: Array<IItem>;
}

const List: FC<IList> = ({ items }) => {
  const [item, setItem] = useState<IItem | null>(null);
  const handleCloseModal = useCallback(() => {
    setItem(null);
  }, []);
  const handleSubmitModal = useCallback(
    async (newPass) => {
      try {
        await updateItem({
          ...item,
          password: newPass,
        });
        setItem(null);
      } catch (error) {
        console.log(error);
      }
    },
    [item]
  );

  return (
    <>
      <ul className="list">
        {items.map((item) => (
          <li key={item.id} className="item">
            <ItemIcon title={item.title} />
            <div>
              <div className="title">{item.title}</div>
              <div className="description">{item.description}</div>
            </div>
            <button className="update" onClick={() => setItem(item)}>
              Update Password
            </button>
          </li>
        ))}
      </ul>

      <UpdateModal
        item={item}
        handleCloseModal={handleCloseModal}
        handleSubmitModal={handleSubmitModal}
      />
    </>
  );
};

export default List;
