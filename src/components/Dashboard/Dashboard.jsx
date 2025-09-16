import React from 'react';
import ProjectHeader from '../ProjectHeader/ProjectHeader';
import ProgressSection from '../ProgressSection/ProgressSection';
import RecentActivity from '../RecentActivity/RecentActivity';
import NotificationsPreferences from '../NotificationsPreferences/NotificationsPreferences';
import QuickStats from '../QuickStats/QuickStats';
import './Dashboard.css';

export default function Dashboard({ user, onLogout }) {
  const handleLogout = () => {
    onLogout?.();             // ← App borrará 'currentUser' y te redirigirá
  };
  


  // Data del proyecto
  const projectData = {
    name: "Plataforma e-commerce",
    description: "Desarrollo de una plataforma e-commerce B2C con pasarela de pagos y gestión de inventario.",
    status: "En Desarrollo Avanzado",
    startDate: "2025-01-15",
    endDate: "2025-07-30",
    budget: "$50,000",
    team: ["Andrés Rivera (Líder)", "Fabián García (Frontend)", "Fredy Carrizo (Backend)"],
    technologies: ["React", "Node.js", "PostgreSQL", "AWS"]
  };

  const milestones = [
    { id: 1, title: "Definición de Alcance Completa", progress: 100, status: "completed", dueDate: "2025-02-01", assignee: "Andrés Rivera" },
    { id: 2, title: "Diseño UI/UX Prototipos Finales", progress: 100, status: "completed", dueDate: "2025-03-15", assignee: "Fabián García" },
    { id: 3, title: "Desarrollo Frontend (Módulos Clave)", progress: 70, status: "in-progress", dueDate: "2025-05-20", assignee: "Fabián García" },
    { id: 4, title: "Desarrollo Backend API", progress: 45, status: "in-progress", dueDate: "2025-06-10", assignee: "Fredy Carrizo" },
    { id: 5, title: "Integración Pasarela de Pagos", progress: 0, status: "pending", dueDate: "2025-07-05", assignee: "Fredy Carrizo" }
  ];

  const recentActivity = [
    { user: "Fredy Carrizo", action: "Actualizó la tarea", detail: "Desarrollo Backend", time: "Hace 2 horas", avatar: "FC" },
    { user: "Andrés Rivera", action: "Añadió un comentario en", detail: "Integración Pasarela de Pagos", time: "Hace 4 horas", avatar: "AR" },
    { user: "Sistema", action: "Hito completado", detail: "Diseño UI/UX Prototipos Finales", time: "Hace 1 día", avatar: "S" },
    { user: "Fabián García", action: "Actualizó el progreso de", detail: "Desarrollo Frontend", time: "Hace 2 días", avatar: "FG" }
  ];

  const quickStats = { tasksCompleted: "2/5", daysRemaining: "138", weeklyProgress: "+12%", activeMembers: "3/3" };
  const progress = 71;

  return (
    <div className="dashboard">
      {/* Header */}
      <div className="dashboard__header">
        <div className="dashboard__header-content">
          <div className="dashboard__user">
            <div className="dashboard__avatar">
              <span className="dashboard__avatar-text">UC</span>
            </div>
            <div className="dashboard__user-info">
              <h1 className="dashboard__user-name">Usuario</h1>
              <p className="dashboard__user-role">Cliente</p>
            </div>
          </div>

          {/* Acciones: solo botón Cerrar sesión */}
          <div className="dashboard__actions">
            <button
              className="dashboard__action-btn dashboard__logout-btn"
              onClick={handleLogout}
              aria-label="Cerrar sesión"
              title="Cerrar sesión"
            >
              Cerrar sesión
            </button>
          </div>
        </div>
      </div>

      {/* Contenido */}
      <div className="dashboard__content">
        <div className="dashboard__main">
          <ProjectHeader projectData={projectData} />
          <ProgressSection progress={progress} milestones={milestones} />
        </div>

        <div className="dashboard__sidebar">
          <RecentActivity activities={recentActivity} />
          <NotificationsPreferences />
          <QuickStats stats={quickStats} />
        </div>
      </div>
    </div>
  );
}


