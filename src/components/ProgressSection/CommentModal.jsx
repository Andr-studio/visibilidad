import React, { useEffect } from 'react';
import CommentSystem from './CommentSystem';

const CommentModal = ({ isOpen, onClose, milestoneId, milestoneTitle, comments, setComments }) => {
 
  // Cerrar modal con Escape
  useEffect(() => {
    const handleEscape = (e) => {
      if (e.key === 'Escape') {
        onClose();
      }
    };

    if (isOpen) {
      document.addEventListener('keydown', handleEscape);
      document.body.style.overflow = 'unset'; // Permitir scroll del body
      
    }

    return () => {
      document.removeEventListener('keydown', handleEscape);
      document.body.style.overflow = 'unset';
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const handleBackdropClick = (e) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

   return (
    <div className="comment-modal" onClick={handleBackdropClick}>
      <div className="comment-modal__content">
        <CommentSystem 
          milestoneId={milestoneId}
          milestoneTitle={milestoneTitle}
          onClose={onClose}
          // --- AÑADIDO: Pasa las props hacia abajo ---
          comments={comments}
          setComments={setComments}
        />
      </div>
    </div>
  );
};

export default CommentModal;