import React, { useState } from 'react';
import './Comments.css';

const Comments = ({ milestoneId, comments, onAddComment }) => {
  const [newComment, setNewComment] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (newComment.trim()) {
      onAddComment(milestoneId, {
        id: Date.now(),
        user: 'Usuario Actual',
        avatar: 'UA',
        text: newComment,
        timestamp: new Date().toISOString(),
        replies: [],
      });
      setNewComment('');
    }
  };

  return (
    <div className="comments-section">
      <h6 className="comments-title">Comentarios</h6>
      <div className="comments-list">
        {comments.map((comment) => (
          <div key={comment.id} className="comment">
            <div className="comment-avatar">{comment.avatar}</div>
            <div className="comment-content">
              <div className="comment-header">
                <span className="comment-user">{comment.user}</span>
                <span className="comment-timestamp">
                  {new Date(comment.timestamp).toLocaleString()}
                </span>
              </div>
              <p className="comment-text">{comment.text}</p>
            </div>
          </div>
        ))}
      </div>
      <form className="comment-form" onSubmit={handleSubmit}>
        <input
          type="text"
          className="comment-input"
          placeholder="Añadir un comentario..."
          value={newComment}
          onChange={(e) => setNewComment(e.target.value)}
        />
        <button type="submit" className="comment-submit-btn">
          Enviar
        </button>
      </form>
    </div>
  );
};

export default Comments;
