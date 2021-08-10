import { FC, useState } from "react";
import { IItem } from "~/services/getUserItems";
import Modal from 'react-modal';

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
      <div className="pt-12px text-center">
        <button
          className="button"
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
