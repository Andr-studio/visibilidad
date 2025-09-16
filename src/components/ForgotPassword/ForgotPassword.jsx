import React, { useState } from 'react';
import { Link } from 'react-router-dom'; // Para el enlace de "Volver al inicio"
import styles from './ForgotPassword.module.css'; // Estilos específicos
import loginStyles from '../Login/Login.module.css'; // Reutilizamos estilos del login

// Icono SVG para el mensaje de éxito
const MailIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" d="M21.75 6.75v10.5a2.25 2.25 0 01-2.25 2.25h-15a2.25 2.25 0 01-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25m19.5 0v.243a2.25 2.25 0 01-1.07 1.916l-7.5 4.615a2.25 2.25 0 01-2.36 0L3.32 8.91a2.25 2.25 0 01-1.07-1.916V6.75" />
  </svg>
);


const ForgotPassword = () => {
  const [email, setEmail] = useState('');
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  // Estado para cambiar la vista al mensaje de éxito
  const [isSubmitted, setIsSubmitted] = useState(false);

  const validateEmail = (email) => {
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return regex.test(email);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setError(null);

    if (!validateEmail(email)) {
      setError('Por favor, ingresa un correo electrónico válido.');
      return;
    }

    setIsLoading(true);
    // Simulación de llamada a la API
    setTimeout(() => {
      console.log('Enviando enlace de restablecimiento a:', email);
      setIsLoading(false);
      setIsSubmitted(true); // Cambia a la vista de éxito
    }, 1500);
  };

  return (
    // Reutilizamos el contenedor principal del Login para centrar el contenido
    <div className={loginStyles.loginContainer}>
      {/* Reutilizamos el contenedor de la tarjeta con efecto glassmorphism */}
      <div className={loginStyles.loginFormWrapper}>
        
        {isSubmitted ? (
          // --- VISTA DE ÉXITO ---
          <div className={styles.successContainer}>
            <div className={styles.successIcon}>
              <MailIcon />
            </div>
            <h1 className={loginStyles.title}>Revisa tu correo</h1>
            <p className={loginStyles.subtitle}>
              Si existe una cuenta asociada a <strong>{email}</strong>, hemos enviado un enlace para restablecer tu contraseña.
            </p>
            <Link to="/login" className={loginStyles.link}>
              &larr; Volver a Iniciar Sesión
            </Link>
          </div>
        ) : (
          // --- VISTA DEL FORMULARIO ---
          <>
            <div className={loginStyles.header}>
              <h1 className={loginStyles.title}>Restablecer Contraseña</h1>
              <p className={loginStyles.subtitle}>
                Ingresa tu correo electrónico y te enviaremos un enlace para recuperarla.
              </p>
            </div>

            <form onSubmit={handleSubmit} noValidate>
              {error && (
                <div className={loginStyles.errorBanner} role="alert">
                  {error}
                </div>
              )}

              <div className={loginStyles.inputGroup}>
                <label htmlFor="email" className={loginStyles.label}>
                  Correo Electrónico
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className={loginStyles.input}
                  placeholder="nombre@ejemplo.com"
                  autoComplete="email"
                  required
                />
              </div>

              <button
                type="submit"
                className={loginStyles.submitButton}
                disabled={isLoading}
              >
                {isLoading ? (
                  <div className={loginStyles.spinner}></div>
                ) : (
                  'Enviar Enlace'
                )}
              </button>
            </form>

            <p className={loginStyles.signupText}>
              ¿Recordaste tu contraseña?{' '}
              <Link to="/login" className={loginStyles.link}>
                Iniciar Sesión
              </Link>
            </p>
          </>
        )}
      </div>
    </div>
  );
};

export default ForgotPassword;