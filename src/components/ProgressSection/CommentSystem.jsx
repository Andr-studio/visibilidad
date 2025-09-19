import React, { useState } from 'react';
import { MessageCircle, Send, Reply, Edit2, Trash2 } from 'lucide-react';

// --- PASO 1: Mover CommentItem fuera de CommentSystem ---
// Lo convertimos en un componente independiente para evitar problemas de re-renderizado.
const CommentItem = ({ 
  comment, 
  isReply = false,
  currentUser,
  formatTimestamp,
  editingComment,
  setEditingComment,
  editContent,
  setEditContent,
  handleEditComment,
  handleDeleteComment,
  replyingTo,
  setReplyingTo,
  replyContent,
  setReplyContent,
  handleAddReply,
  expandedComments,
  toggleReplies
}) => (
  <div className={`comment-item ${isReply ? 'comment-item--reply' : ''}`}>
    <div className="comment-item__avatar">
      <div className="avatar">
        {comment.avatar}
      </div>
    </div>
    
    <div className="comment-item__content">
      <div className="comment-item__header">
        <span className="comment-item__author">{comment.author}</span>
        <span className="comment-item__timestamp">
          {formatTimestamp(comment.timestamp)}
          {comment.edited && <span className="comment-item__edited"> (editado)</span>}
        </span>
      </div>
      
      {editingComment === comment.id ? (
        <div className="comment-edit">
          <textarea
            className="comment-edit__textarea"
            value={editContent}
            onChange={(e) => setEditContent(e.target.value)}
            placeholder="Editar comentario..."
            rows="3"
            autoFocus
          />
          <div className="comment-edit__actions">
            <button 
              className="btn btn--secondary btn--sm"
              onClick={() => {
                setEditingComment(null);
                setEditContent('');
              }}
            >
              Cancelar
            </button>
            <button 
              className="btn btn--primary btn--sm"
              onClick={() => handleEditComment(comment.id)}
              disabled={!editContent.trim()}
            >
              Guardar
            </button>
          </div>
        </div>
      ) : (
        <p className="comment-item__text">{comment.content}</p>
      )}
      
      <div className="comment-item__actions">
        {/* --- PASO 2 (UI): Permitir responder a cualquier comentario --- */}
        <button 
          className="comment-action"
          onClick={() => {
            setReplyingTo(replyingTo === comment.id ? null : comment.id);
            setReplyContent('');
          }}
        >
          <Reply className="comment-action__icon" />
          Responder
        </button>
        
        {comment.author === currentUser.name && !editingComment && (
          <>
            <button 
              className="comment-action"
              onClick={() => {
                setEditingComment(comment.id);
                setEditContent(comment.content);
              }}
            >
              <Edit2 className="comment-action__icon" />
              Editar
            </button>
            <button 
              className="comment-action comment-action--danger"
              onClick={() => handleDeleteComment(comment.id)}
            >
              <Trash2 className="comment-action__icon" />
              Eliminar
            </button>
          </>
        )}
        
        {/* Mostramos el botón para ver/ocultar si hay respuestas */}
        {comment.replies && comment.replies.length > 0 && (
          <button 
            className="comment-action"
            onClick={() => toggleReplies(comment.id)}
          >
            {expandedComments.has(comment.id) ? 'Ocultar' : 'Ver'} respuestas ({comment.replies.length})
          </button>
        )}
      </div>
      
      {replyingTo === comment.id && (
        <div className="comment-reply">
          <div className="comment-reply__avatar">
            <div className="avatar avatar--sm">
              {currentUser.avatar}
            </div>
          </div>
          <div className="comment-reply__input">
            <textarea
              className="comment-reply__textarea"
              value={replyContent}
              onChange={(e) => setReplyContent(e.target.value)}
              placeholder="Escribir una respuesta..."
              rows="2"
              autoFocus
            />
            <div className="comment-reply__actions">
              <button 
                className="btn btn--secondary btn--sm"
                onClick={() => {
                  setReplyingTo(null);
                  setReplyContent('');
                }}
              >
                Cancelar
              </button>
              <button 
                className="btn btn--primary btn--sm"
                onClick={() => handleAddReply(comment.id)}
                disabled={!replyContent.trim()}
              >
                <Send className="btn__icon" />
                Responder
              </button>
            </div>
          </div>
        </div>
      )}
      
      {comment.replies && comment.replies.length > 0 && expandedComments.has(comment.id) && (
        <div className="comment-replies">
          {comment.replies.map(reply => (
            <CommentItem 
              key={reply.id} 
              comment={reply} 
              isReply={true}
              // Pasamos todas las props necesarias al componente anidado
              currentUser={currentUser}
              formatTimestamp={formatTimestamp}
              editingComment={editingComment}
              setEditingComment={setEditingComment}
              editContent={editContent}
              setEditContent={setEditContent}
              handleEditComment={handleEditComment}
              handleDeleteComment={handleDeleteComment}
              replyingTo={replyingTo}
              setReplyingTo={setReplyingTo}
              replyContent={replyContent}
              setReplyContent={setReplyContent}
              handleAddReply={handleAddReply}
              expandedComments={expandedComments}
              toggleReplies={toggleReplies}
            />
          ))}
        </div>
      )}
    </div>
  </div>
);


const CommentSystem = ({ milestoneId, milestoneTitle, onClose, comments, setComments }) => {
  const [newComment, setNewComment] = useState('');
  const [replyingTo, setReplyingTo] = useState(null);
  const [replyContent, setReplyContent] = useState('');
  const [expandedComments, setExpandedComments] = useState(new Set());
  const [editingComment, setEditingComment] = useState(null);
  const [editContent, setEditContent] = useState('');

  const currentUser = {
    name: 'Usuario Actual',
    avatar: 'UA'
  };

  const formatTimestamp = (timestamp) => {
    // ... (sin cambios en esta función)
    const date = new Date(timestamp);
    const now = new Date();
    const diffInMinutes = Math.floor((now - date) / (1000 * 60));
    
    if (diffInMinutes < 60) {
      return `hace ${diffInMinutes} min`;
    } else if (diffInMinutes < 1440) {
      return `hace ${Math.floor(diffInMinutes / 60)} h`;
    } else {
      return date.toLocaleDateString('es-ES', { day: 'numeric', month: 'short', hour: '2-digit', minute: '2-digit' });
    }
  };

  const handleAddComment = () => {
    if (!newComment.trim()) return;
    const comment = {
      id: Date.now(),
      milestoneId,
      author: currentUser.name,
      avatar: currentUser.avatar,
      content: newComment,
      timestamp: new Date().toISOString(),
      replies: []
    };
    setComments([comment, ...comments]);
    setNewComment('');
  };

  // --- PASO 2 (LÓGICA): Función recursiva para añadir respuestas en cualquier nivel ---
  const handleAddReply = (parentId) => {
    if (!replyContent.trim()) return;

    const newReply = {
      id: Date.now(),
      parentId,
      author: currentUser.name,
      avatar: currentUser.avatar,
      content: replyContent,
      timestamp: new Date().toISOString(),
      replies: [] // Las nuevas respuestas también pueden tener respuestas
    };
    
    // Función auxiliar recursiva para encontrar y actualizar el comentario padre
    const addReplyToComment = (commentList) => {
      return commentList.map(comment => {
        if (comment.id === parentId) {
          // Encontrado. Añadir la respuesta aquí.
          return {
            ...comment,
            replies: [...(comment.replies || []), newReply]
          };
        } else if (comment.replies && comment.replies.length > 0) {
          // No es este, pero quizás es uno de sus hijos. Buscar recursivamente.
          return {
            ...comment,
            replies: addReplyToComment(comment.replies)
          };
        }
        // No es este y no tiene hijos, devolverlo como está.
        return comment;
      });
    };

    const updatedComments = addReplyToComment(comments);

    setComments(updatedComments);
    setReplyContent('');
    setReplyingTo(null);
    setExpandedComments(prev => new Set(prev).add(parentId));
  };

  const handleEditComment = (commentId) => {
    // ... (lógica de edición, necesita ser recursiva también para funcionar en respuestas)
    if (!editContent.trim()) return;
    const updateCommentContent = (commentList) => {
       return commentList.map(comment => {
            if (comment.id === commentId) {
                return { ...comment, content: editContent, edited: true };
            }
            if (comment.replies && comment.replies.length > 0) {
                return { ...comment, replies: updateCommentContent(comment.replies) };
            }
            return comment;
        });
    };
    setComments(updateCommentContent(comments));
    setEditingComment(null);
    setEditContent('');
  };

  const handleDeleteComment = (commentId) => {
    // ... (lógica de borrado, necesita ser recursiva también)
     const filterComments = (commentList) => {
        return commentList.filter(comment => comment.id !== commentId).map(comment => {
            if (comment.replies && comment.replies.length > 0) {
                return { ...comment, replies: filterComments(comment.replies) };
            }
            return comment;
        });
    };
    setComments(filterComments(comments));
  };


  const toggleReplies = (commentId) => {
    setExpandedComments(prev => {
      const newSet = new Set(prev);
      if (newSet.has(commentId)) {
        newSet.delete(commentId);
      } else {
        newSet.add(commentId);
      }
      return newSet;
    });
  };

  return (
    <div className="comment-system">
      <div className="comment-system__header">
        <div className="comment-system__title">
          <MessageCircle className="comment-system__title-icon" />
          <div>
            <h3>Comentarios</h3>
            <p className="comment-system__subtitle">{milestoneTitle}</p>
          </div>
        </div>
        <button className="comment-system__close" onClick={onClose}>×</button>
      </div>
      
      <div className="comments-list">
        {(!comments || comments.length === 0) ? (
          <div className="comments-empty">
            <MessageCircle className="comments-empty__icon" />
            <p>No hay comentarios aún. ¡Sé el primero en comentar!</p>
          </div>
        ) : (
          comments.map(comment => (
            <CommentItem 
              key={comment.id} 
              comment={comment}
              // Pasamos todas las props necesarias al componente de primer nivel
              currentUser={currentUser}
              formatTimestamp={formatTimestamp}
              editingComment={editingComment}
              setEditingComment={setEditingComment}
              editContent={editContent}
              setEditContent={setEditContent}
              handleEditComment={handleEditComment}
              handleDeleteComment={handleDeleteComment}
              replyingTo={replyingTo}
              setReplyingTo={setReplyingTo}
              replyContent={replyContent}
              setReplyContent={setReplyContent}
              handleAddReply={handleAddReply}
              expandedComments={expandedComments}
              toggleReplies={toggleReplies}
            />
          ))
        )}
      </div>

      <div className="comment-input">
        <div className="comment-input__avatar">
          <div className="avatar">{currentUser.avatar}</div>
        </div>
        <div className="comment-input__field">
          <textarea
            className="comment-input__textarea"
            value={newComment}
            onChange={(e) => setNewComment(e.target.value)}
            placeholder="Agregar un comentario..."
            rows="3"
          />
          <button 
            className="comment-input__submit"
            onClick={handleAddComment}
            disabled={!newComment.trim()}
          >
            <Send className="comment-input__submit-icon" />
            Comentar
          </button>
        </div>
      </div>
    </div>
  );
};

export default CommentSystem;