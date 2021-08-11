import { FC, useState } from 'react';
import { IItem } from '~/services/getUserItems';
import Modal from 'react-modal';
import itemHasWeakPassword from '~/utils/itemHasWeakPassword';
import ErrorBlock from '~/components/ErrorBlock/ErrorBlock';

import './update-modal-style.scss';

interface IUpdateModal {
  item: IItem;
  handleCloseModal: () => void;
  handleSubmitModal: (value: string) => void;
}

export const UpdateModal: FC<IUpdateModal> = ({
  item,
  handleCloseModal,
  handleSubmitModal,
}) => {
  const [newPass, setNewPass] = useState('');

  const isWeakPassword = itemHasWeakPassword(newPass);
  const errorMessage =
    'The password is not strong enough (it must contain lowercase, uppercase letters, numbers and special characters)';
  const isDisabled = isWeakPassword || !newPass;

  return (
    <Modal
      className="modal"
      appElement={document.getElementById('app')}
      isOpen={!!item}
      onRequestClose={handleCloseModal}
      contentLabel="Update Password Modal"
    >
      <h1>Update Password</h1>
      <input
        placeholder="new password"
        className="input"
        value={newPass}
        onChange={(event) => setNewPass(event.target.value)}
      />
      {isWeakPassword && newPass && <ErrorBlock error={errorMessage} />}
      <div className="pt-12px text-center">
        <button
          className={`button ${isDisabled ? 'disabled' : ''}`}
          disabled={isDisabled}
          onClick={() => {
            handleSubmitModal(newPass);
          }}
        >
          Change
        </button>
        <button className="button ml-12px" onClick={handleCloseModal}>
          Cancel
        </button>
      </div>
    </Modal>
  );
};
