import React from 'react';
import '../CSS/DeleteConfirmationModal.css';

const DeleteConfirmationModal = ({ onConfirm, onCancel }) => {
  return (
    <div className="modal-overlay">
      <div className="modal-content delete-confirm-modal">
        <h2>Delete Invoice</h2>
        <p>Are you sure you want to delete this invoice? This action cannot be undone.</p>
        <div className="button-group">
          <button className="confirm-btn" onClick={onConfirm}>Yes, Delete</button>
          <button className="cancel-btn" onClick={onCancel}>Cancel</button>
        </div>
      </div>
    </div>
  );
};

export default DeleteConfirmationModal;