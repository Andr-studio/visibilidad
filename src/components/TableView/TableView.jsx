import React, { useState } from 'react';
import './TableView.css';
import { ChevronUp, ChevronDown } from 'lucide-react';
import Comments from '../Comments/Comments';

const TableView = ({ milestones, comments, onAddComment }) => {
  const [sortConfig, setSortConfig] = useState({ key: 'dueDate', direction: 'ascending' });
  const [expandedComments, setExpandedComments] = useState(null);

  const toggleComments = (milestoneId) => {
    setExpandedComments(expandedComments === milestoneId ? null : milestoneId);
  };

  const sortedMilestones = React.useMemo(() => {
    let sortableItems = [...milestones];
    if (sortConfig !== null) {
      sortableItems.sort((a, b) => {
        if (a[sortConfig.key] < b[sortConfig.key]) {
          return sortConfig.direction === 'ascending' ? -1 : 1;
        }
        if (a[sortConfig.key] > b[sortConfig.key]) {
          return sortConfig.direction === 'ascending' ? 1 : -1;
        }
        return 0;
      });
    }
    return sortableItems;
  }, [milestones, sortConfig]);

  const requestSort = (key) => {
    let direction = 'ascending';
    if (sortConfig.key === key && sortConfig.direction === 'ascending') {
      direction = 'descending';
    }
    setSortConfig({ key, direction });
  };

  const getSortIcon = (key) => {
    if (sortConfig.key !== key) {
      return null;
    }
    if (sortConfig.direction === 'ascending') {
      return <ChevronUp className="sort-icon" />;
    }
    return <ChevronDown className="sort-icon" />;
  };

  return (
    <div className="table-view">
      <table className="milestone-table">
        <thead>
          <tr>
            <th onClick={() => requestSort('title')}>
              Hito {getSortIcon('title')}
            </th>
            <th onClick={() => requestSort('assignee')}>
              Responsable {getSortIcon('assignee')}
            </th>
            <th onClick={() => requestSort('dueDate')}>
              Fecha Límite {getSortIcon('dueDate')}
            </th>
            <th onClick={() => requestSort('progress')}>
              Progreso {getSortIcon('progress')}
            </th>
            <th onClick={() => requestSort('status')}>
              Estado {getSortIcon('status')}
            </th>
            <th>Acciones</th>
          </tr>
        </thead>
        <tbody>
          {sortedMilestones.map((milestone) => (
            <React.Fragment key={milestone.id}>
              <tr>
                <td>{milestone.title}</td>
                <td>{milestone.assignee}</td>
                <td>{milestone.dueDate}</td>
                <td>
                  <div className="progress-cell">
                    <span>{milestone.progress}%</span>
                    <div className="progress-cell__bar">
                      <div
                        className="progress-cell__fill"
                        style={{ width: `${milestone.progress}%` }}
                      ></div>
                    </div>
                  </div>
                </td>
                <td>
                  <span className={`status-badge status-badge--${milestone.status}`}>
                    {milestone.status}
                  </span>
                </td>
                <td>
                  <button onClick={() => toggleComments(milestone.id)} className="comment-toggle-btn">
                    Comentarios ({comments[milestone.id]?.length || 0})
                  </button>
                </td>
              </tr>
              {expandedComments === milestone.id && (
                <tr className="comments-row">
                  <td colSpan="6">
                    <Comments
                      milestoneId={milestone.id}
                      comments={comments[milestone.id] || []}
                      onAddComment={onAddComment}
                    />
                  </td>
                </tr>
              )}
            </React.Fragment>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default TableView;
