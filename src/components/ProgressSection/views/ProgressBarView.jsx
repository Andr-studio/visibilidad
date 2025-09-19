import React, { useState } from 'react';
import CommentButton from '../CommentButton';
import './ProgressBarView.css';
  

const ProgressBarView = ({ milestones, onOpenComments, getCommentCount }) => {
   
  return (
    <div className="progress-bar-view">
      {milestones.map((milestone) => (
        <div key={milestone.id} className="progress-bar-milestone">
          <div className="progress-bar-milestone__info">
            <span className="progress-bar-milestone__title">{milestone.title}</span>
            <div className="progress-bar-milestone__meta">
              <span className="progress-bar-milestone__percentage">{milestone.progress}%</span>
              <CommentButton 
                  milestoneId={milestone.id}
                  commentCount={getCommentCount(milestone.id)}
                  onClick={onOpenComments}
                  variant="full"
                />
            </div>
          </div>
          <div className="progress-bar-milestone__bar">
            <div
              className={`milestone__progress-fill milestone__progress-fill--${milestone.status}`}
              style={{ width: `${milestone.progress}%` }}
            ></div>
          </div>
          <div className="progress-bar-milestone__date">{milestone.dueDate}</div>
        </div>
      ))}
    </div>
  );
};

export default ProgressBarView;
