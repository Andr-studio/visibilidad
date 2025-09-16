import React, { useState } from 'react'
// Importa los estilos modulares. 'styles' será un objeto con las clases CSS.
import { Link } from 'react-router-dom'
import { useNavigate } from 'react-router-dom'
import styles from './Login.module.css'

// Iconos SVG como componentes de React para control y optimización.
const EyeIcon = (props) => (
  <svg
    {...props}
    xmlns="http://www.w3.org/2000/svg"
    fill="none"
    viewBox="0 0 24 24"
    stroke="currentColor"
    strokeWidth={1.5}
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      d="M2.036 12.322a1.012 1.012 0 010-.639C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.573 3.007 9.963 7.178.07.207.07.431 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.638 0-8.573-3.007-9.963-7.178z"
    />
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
    />
  </svg>
)

const EyeSlashIcon = (props) => (
  <svg
    {...props}
    xmlns="http://www.w3.org/2000/svg"
    fill="none"
    viewBox="0 0 24 24"
    stroke="currentColor"
    strokeWidth={1.5}
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      d="M3.98 8.223A10.477 10.477 0 001.934 12C3.226 16.338 7.244 19.5 12 19.5c.993 0 1.953-.138 2.863-.395M6.228 6.228A10.45 10.45 0 0112 4.5c4.756 0 8.773 3.162 10.065 7.498a10.523 10.523 0 01-4.293 5.774M6.228 6.228L3 3m3.228 3.228l3.65 3.65m7.894 7.894L21 21m-3.228-3.228l-3.65-3.65m0 0a3 3 0 10-4.243-4.243m4.243 4.243L6.228 6.228"
    />
  </svg>
)

const Login = ({ onLoginSuccess}) => {
  // --- ESTADO DEL COMPONENTE ---
  const navigate = useNavigate()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [isPasswordVisible, setIsPasswordVisible] = useState(false)
  const [error, setError] = useState(null)
  const [isLoading, setIsLoading] = useState(false)

  // --- MANEJADORES DE EVENTOS ---
  const validateEmail = (email) => {
    // Expresión regular simple para validación de formato de email.
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    return regex.test(email)
  }

  const handleSubmit = (e) => {
    e.preventDefault() // Previene el comportamiento por defecto del formulario.
    setError(null) // Resetea los errores previos.

    // --- VALIDACIÓN DE CAMPOS ---
    if (!email || !password) {
      setError('Por favor, completa todos los campos.')
      return
    }
    if (!validateEmail(email)) {
      setError('El formato del correo electrónico no es válido.')
      return
    }
    if (password.length < 8) {
      setError('La contraseña debe tener al menos 8 caracteres.')
      return
    }

    // --- SIMULACIÓN DE LLAMADA A API ---
    setIsLoading(true)
    setTimeout(() => {
      // Aquí iría la lógica de autenticación real (p. ej., con fetch o axios).
      console.log('Autenticando usuario:', { email, password })

      // Simula una respuesta de error del servidor.
     if (email === 'demo@example.com' && password === 'password') {
        
        // 1. Crea un objeto con los datos del usuario
        const user = { 
          nombre: "Cliente Demo", 
          email: "demo@example.com" 
        };
        
        // 2. Llama a la función del componente App para "avisarle" del éxito
        onLoginSuccess(user);

      } else {
        // Manejo de error
        setError('Las credenciales son incorrectas.');
        setIsLoading(false);
      }
    }, 100) // Simula una demora de red de 2 segundos.
  }

  return (
    <div className={styles.loginContainer}>
      <div className={styles.loginFormWrapper}>
        <div className={styles.header}>
          <h1 className={styles.title}>Iniciar Sesión</h1>
          <p className={styles.subtitle}>
            Ingresa tus credenciales para acceder a tu cuenta.
          </p>
        </div>

        <form onSubmit={handleSubmit} noValidate>
          {/* Muestra un mensaje de error general si existe */}
          {error && (
            <div className={styles.errorBanner} role="alert">
              {error}
            </div>
          )}

          <div className={styles.inputGroup}>
            <label htmlFor="email" className={styles.label}>
              Correo Electrónico
            </label>
            <input
              type="email"
              id="email"
              name="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className={styles.input}
              placeholder="nombre@ejemplo.com"
              autoComplete="email"
              required
            />
          </div>

          <div className={styles.inputGroup}>
            <label htmlFor="password" className={styles.label}>
              Contraseña
            </label>
            <div className={styles.passwordInputWrapper}>
              <input
                type={isPasswordVisible ? 'text' : 'password'}
                id="password"
                name="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className={styles.input}
                placeholder="Mínimo 8 caracteres"
                autoComplete="current-password"
                required
              />
              {/* Botón para alternar la visibilidad de la contraseña */}
              <button
                type="button"
                onClick={() => setIsPasswordVisible(!isPasswordVisible)}
                className={styles.passwordVisibilityToggle}
                aria-label={
                  isPasswordVisible
                    ? 'Ocultar contraseña'
                    : 'Mostrar contraseña'
                }
              >
                {isPasswordVisible ? (
                  <EyeSlashIcon />
                ) : (
                  <EyeIcon />
                )}
              </button>
            </div>
            <Link to="/forgot-password" className={styles.link}>
              ¿Olvidaste tu contraseña?
            </Link>
          </div>

          <button
            type="submit"
            className={styles.submitButton}
            disabled={isLoading}
          >
            {isLoading ? (
              <div className={styles.spinner}></div>
            ) : (
              'Iniciar Sesión'
            )}
          </button>
        </form>

      </div>
    </div>
  )
}

export default Login