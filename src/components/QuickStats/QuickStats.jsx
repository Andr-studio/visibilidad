import React from 'react';
import { CheckCircle, Clock, TrendingUp, Users } from 'lucide-react';
import './QuickStats.css';

const QuickStats = ({ stats }) => {
  const statsConfig = [
    {
      key: 'tasksCompleted',
      label: 'Tareas Completadas',
      value: stats.tasksCompleted,
      icon: CheckCircle,
      color: 'green',
      trend: '+2'
    },
    {
      key: 'daysRemaining',
      label: 'Días Restantes',
      value: stats.daysRemaining,
      icon: Clock,
      color: 'orange',
      trend: null
    },
    {
      key: 'weeklyProgress',
      label: 'Progreso Semanal',
      value: stats.weeklyProgress,
      icon: TrendingUp,
      color: 'blue',
      trend: '+12%'
    },
    {
      key: 'activeMembers',
      label: 'Miembros Activos',
      value: stats.activeMembers,
      icon: Users,
      color: 'purple',
      trend: '100%'
    }
  ];

  const getColorClass = (color) => {
    return `quick-stat--${color}`;
  };

  return (
    <div className="quick-stats">
      <h3 className="quick-stats__title">Estadísticas Rápidas</h3>
      <div className="quick-stats__list">
        {statsConfig.map((stat) => {
          const IconComponent = stat.icon;
          return (
            <div key={stat.key} className={`quick-stat ${getColorClass(stat.color)}`}>
              <div className="quick-stat__content">
                <div className="quick-stat__icon-container">
                  <IconComponent className="quick-stat__icon" />
                </div>
                <div className="quick-stat__info">
                  <div className="quick-stat__header">
                    <span className="quick-stat__value">{stat.value}</span>
                    {stat.trend && (
                      <span className="quick-stat__trend">{stat.trend}</span>
                    )}
                  </div>
                  <span className="quick-stat__label">{stat.label}</span>
                </div>
              </div>
              <div className="quick-stat__progress-ring">
                <svg className="quick-stat__ring-svg" width="60" height="60">
                  <circle
                    className="quick-stat__ring-bg"
                    cx="30"
                    cy="30"
                    r="25"
                  />
                  <circle
                    className="quick-stat__ring-progress"
                    cx="30"
                    cy="30"
                    r="25"
                  />
                </svg>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default QuickStats;