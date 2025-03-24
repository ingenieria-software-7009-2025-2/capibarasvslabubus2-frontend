import { useState } from 'react'
import './App.css'

function App() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [message, setMessage] = useState('')

  const handleSubmit = async (e) => {
    e.preventDefault()

    // Preparamos la data a enviar, acorde a tu LoginRequest
    const loginData = {
      email: email,
      password: password
    }

    try {
      const response = await fetch('http://localhost:8080/v1/users/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(loginData)
      })

      if (response.ok) {
        const user = await response.json()
        
        setMessage(`Bienvenido, ${user.email}`)
      } else if (response.status === 404) {
        setMessage('Usuario o contraseña incorrectos')
      } else {
        setMessage('Ocurrió un error al iniciar sesión')
      }
    } catch (error) {
      console.error('Error al conectar con el backend:', error)
      setMessage('Error en la conexión al servidor')
    }
  }

  return (
    <div className="login-container">
      <h1>Iniciar Sesión</h1>
      <form onSubmit={handleSubmit} className="login-form">
        <div className="form-group">
          <label htmlFor="email">Correo:</label>
          <input
            type="email"
            id="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Ingresa tu correo"
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="password">Contraseña:</label>
          <input
            type="password"
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Ingresa tu contraseña"
            required
          />
        </div>
        <button type="submit">Entrar</button>
      </form>
      {message && <p>{message}</p>}
    </div>
  )
}

export default App
