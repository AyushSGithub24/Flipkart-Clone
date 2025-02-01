import React from "react";
// import "./DeleteAccountModal.css";

const DeleteAccountModal = ({ isOpen, onClose, onDelete }) => {
  if (!isOpen) return null;

  return (
    <div className="modal-overlay">
      <div className="modal">
        <h2>Are you sure?</h2>
        <p>Do you really want to delete your account? This action is irreversible.</p>
        <div className="modal-buttons">
          <button className="cancel-btn" onClick={onClose}>Cancel</button>
          <button className="delete-button" onClick={onDelete}>Delete</button>
        </div>
      </div>
    </div>
  );
};

export default DeleteAccountModal;
