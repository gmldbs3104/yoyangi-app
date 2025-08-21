// src/components/ConfirmModal.jsx
import React from 'react';
import '../App.css';

function ConfirmModal({ isOpen, onClose, onConfirm, message }) {
  if (!isOpen) {
    return null;
  }

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content confirm-modal" onClick={(e) => e.stopPropagation()}>
        <p className="modal-message">{message}</p>
        <div className="modal-button-group">
          <button className="modal-button secondary" onClick={onClose}>
            아니오
          </button>
          <button className="modal-button primary" onClick={onConfirm}>
            예
          </button>
        </div>
      </div>
    </div>
  );
}

export default ConfirmModal;
