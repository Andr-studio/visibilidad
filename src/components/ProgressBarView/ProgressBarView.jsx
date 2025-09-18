import React, { useState } from 'react';
import './ProgressBarView.css';
import Comments from '../Comments/Comments';

const ProgressBarView = ({ milestones, comments, onAddComment }) => {
  const [expandedComments, setExpandedComments] = useState(null);

  const toggleComments = (milestoneId) => {
    setExpandedComments(expandedComments === milestoneId ? null : milestoneId);
  };

  return (
    <div className="progress-bar-view">
      {milestones.map((milestone) => (
        <div key={milestone.id} className="progress-bar-milestone">
          <div className="progress-bar-milestone__info">
            <span className="progress-bar-milestone__title">{milestone.title}</span>
            <div className="progress-bar-milestone__meta">
              <span className="progress-bar-milestone__percentage">{milestone.progress}%</span>
              <button onClick={() => toggleComments(milestone.id)} className="comment-toggle-btn">
                Comentarios ({comments[milestone.id]?.length || 0})
              </button>
            </div>
          </div>
          <div className="progress-bar-milestone__bar">
            <div
              className="progress-bar-milestone__fill"
              style={{ width: `${milestone.progress}%` }}
            ></div>
          </div>
          {expandedComments === milestone.id && (
            <Comments
              milestoneId={milestone.id}
              comments={comments[milestone.id] || []}
              onAddComment={onAddComment}
            />
          )}
        </div>
      ))}
    </div>
  );
};

export default ProgressBarView;
