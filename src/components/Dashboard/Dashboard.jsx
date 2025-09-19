import React, { useState } from 'react';
import ProjectHeader from '../ProjectHeader/ProjectHeader';
import ProgressSection from '../ProgressSection/ProgressSection';
import RecentActivity from '../RecentActivity/RecentActivity';
import NotificationsPreferences from '../NotificationsPreferences/NotificationsPreferences';
import QuickStats from '../QuickStats/QuickStats';
import './Dashboard.css';

const ALL_DEVELOPERS = ["Andrés Rivera", "Fabián García", "Fredy Carrizo", "Melanny Vecino"];

/**
 * Obtiene un subconjunto aleatorio de desarrolladores.
 * @param {string[]} developers - La lista completa de desarrolladores.
 * @param {number} count - El número de desarrolladores a seleccionar.
 * @returns {string[]} Un array con los nombres de los desarrolladores seleccionados.
 */
const getRandomTeam = (developers, count) => {
  const shuffled = [...developers].sort(() => 0.5 - Math.random());
  return shuffled.slice(0, count);
};

/**
 * Genera un número aleatorio de comentarios para simular actividad
 * @param {string} status - Estado del hito (completed, in-progress, pending)
 * @returns {number} Número de comentarios
 */
const getRandomCommentCount = (status) => {
  if (status === 'completed') {
    return Math.floor(Math.random() * 8) + 1; // 1-8 comentarios para completados
  } else if (status === 'in-progress') {
    return Math.floor(Math.random() * 12) + 2; // 2-13 comentarios para en progreso
  } else {
    return Math.floor(Math.random() * 4); // 0-3 comentarios para pendientes
  }
};

/**
 * Crea los datos de los proyectos con equipos y asignaciones aleatorias.
 * @returns {Object} Un objeto con los datos de todos los proyectos.
 */
const createProjectData = () => {
  const team1 = getRandomTeam(ALL_DEVELOPERS, 3);
  const team2 = getRandomTeam(ALL_DEVELOPERS, 2);
  const team3 = getRandomTeam(ALL_DEVELOPERS, 3);

  return {
    "Plataforma e-commerce": {
      name: "Plataforma e-commerce",
      description: "Desarrollo de una plataforma e-commerce B2C con pasarela de pagos y gestión de inventario.",
      status: "En Desarrollo Avanzado",
      budget: "$50,000",
      team: team1,
      technologies: ["React", "Node.js", "PostgreSQL", "AWS"],
      progress: 71,
      milestones: [
        { 
          id: 1, 
          title: "Definición de Alcance Completa", 
          progress: 100, 
          status: "completado", 
          dueDate: "2025-02-01", 
          assignee: team1[0],
          commentCount: getRandomCommentCount("completado")
        },
        { 
          id: 2, 
          title: "Diseño UI/UX Prototipos Finales", 
          progress: 100, 
          status: "completado", 
          dueDate: "2025-03-15", 
          assignee: team1[1],
          commentCount: getRandomCommentCount("completado")
        },
        { 
          id: 3, 
          title: "Desarrollo Frontend (Módulos Clave)", 
          progress: 70, 
          status: "en-progreso", 
          dueDate: "2025-05-20", 
          assignee: team1[1],
          commentCount: getRandomCommentCount("en-progreso")
        },
        { 
          id: 4, 
          title: "Desarrollo Backend API", 
          progress: 45, 
          status: "en-progreso", 
          dueDate: "2025-06-10", 
          assignee: team1[2],
          commentCount: getRandomCommentCount("en-progreso")
        },
        { 
          id: 5, 
          title: "Integración Pasarela de Pagos", 
          progress: 0, 
          status: "pendiente", 
          dueDate: "2025-07-05", 
          assignee: team1[2],
          commentCount: getRandomCommentCount("pendiente")
        }
      ],
      recentActivity: [
        { user: team1[2], action: "Actualizó la tarea", detail: "Desarrollo Backend", time: "Hace 2 horas", avatar: team1[2].split(' ').map(n=>n[0]).join('') },
        { user: team1[0], action: "Añadió un comentario en", detail: "Integración Pasarela de Pagos", time: "Hace 4 horas", avatar: team1[0].split(' ').map(n=>n[0]).join('') }
      ],
      quickStats: { tasksCompleted: "2/5", daysRemaining: "45", weeklyProgress: "+8%", activeMembers: "3/3" }
    },
    "App Bienestar Móvil": {
      name: "App Bienestar Móvil",
      description: "Aplicación móvil para seguimiento de hábitos saludables y meditación.",
      status: "Planificación",
      budget: "$28,000",
      team: team2,
      technologies: ["React Native", "Firebase", "Google Fit"],
      progress: 25,
      milestones: [
        { 
          id: 1, 
          title: "Investigación de Mercado", 
          status: "completado", 
          progress: 100, 
          dueDate: "2025-09-01", 
          assignee: team2[0],
          commentCount: getRandomCommentCount("completado")
        },
        { 
          id: 2, 
          title: "Definición de Features", 
          status: "en-progreso", 
          progress: 50, 
          dueDate: "2025-09-30", 
          assignee: team2[1],
          commentCount: getRandomCommentCount("en-progreso")
        },
        { 
          id: 3, 
          title: "Diseño de Prototipos", 
          status: "pendiente", 
          progress: 0, 
          dueDate: "2025-10-10", 
          assignee: team2[0],
          commentCount: getRandomCommentCount("pendiente")
        },
      ],
      recentActivity: [
        { user: team2[1], action: "Inició la tarea", detail: "Definición de Features", time: "Hace 5 horas", avatar: team2[1].split(' ').map(n=>n[0]).join('') },
        { user: team2[0], action: "Subió el archivo", detail: "Reporte de Competencia.pdf", time: "Hace 1 día", avatar: team2[0].split(' ').map(n=>n[0]).join('') }
      ],
      quickStats: { tasksCompleted: "1/3", daysRemaining: "89", weeklyProgress: "+5%", activeMembers: "2/2" }
    },
    "Sistema LMS Corporativo": {
      name: "Sistema LMS Corporativo",
      description: "Plataforma de e-learning para capacitación de empleados con seguimiento.",
      status: "Completado",
      budget: "$75,000",
      team: team3,
      technologies: ["Vue.js", "Django", "SCORM"],
      progress: 100,
      milestones: [
        { 
          id: 1, 
          title: "Análisis de Requisitos", 
          status: "completado", 
          progress: 100, 
          dueDate: "2025-06-20", 
          assignee: team3[0],
          commentCount: getRandomCommentCount("completado")
        },
        { 
          id: 2, 
          title: "Desarrollo de Módulos", 
          status: "completado", 
          progress: 100, 
          dueDate: "2025-07-30", 
          assignee: team3[1],
          commentCount: getRandomCommentCount("completado")
        },
        { 
          id: 3, 
          title: "Pruebas y QA", 
          status: "completado", 
          progress: 100, 
          dueDate: "2025-08-10", 
          assignee: team3[2],
          commentCount: getRandomCommentCount("completado")
        },
      ],
      recentActivity: [
        { user: "Sistema", action: "Proyecto marcado como", detail: "Completado", time: "Hace 3 días", avatar: "S" },
        { user: team3[0], action: "Generó el reporte final", detail: "Reporte_LMS.pdf", time: "Hace 3 días", avatar: team3[0].split(' ').map(n=>n[0]).join('') }
      ],
      quickStats: { tasksCompleted: "3/3", daysRemaining: "0", weeklyProgress: "+100%", activeMembers: "3/3" }
    }
  }
};

const PROJECTS_DATA = createProjectData();

export default function Dashboard({ user, onLogout }) {
  
  const [currentProject, setCurrentProject] = useState(PROJECTS_DATA["Plataforma e-commerce"]);

  const handleLogout = () => {
    onLogout?.();             // ← App borrará 'currentUser' y te redirigirá
  };
   const handleProjectSelect = (projectName) => {
    setCurrentProject(PROJECTS_DATA[projectName]);
  };

  // Nombres de los proyectos para el selector
  const projectNames = Object.keys(PROJECTS_DATA);


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
          <ProjectHeader
            projectNames={projectNames}
            currentProject={currentProject}
            onProjectSelect={handleProjectSelect}
          />
          <ProgressSection
            progress={currentProject.progress}
            milestones={currentProject.milestones}
            projectName={currentProject.name} />
        </div>

        <div className="dashboard__sidebar">
          <RecentActivity activities={currentProject.recentActivity} />
          <NotificationsPreferences />
          <QuickStats stats={currentProject.quickStats} />
        </div>
      </div>
    </div>
  );
};
