import { useNavigate } from 'react-router-dom'
import { useState } from 'react'

function Login() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [message, setMessage] = useState('')
  const navigate = useNavigate()
  
  const handleLogin = (e) => {
    e.preventDefault()

    fetch('http://localhost:8080/api/users/login', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email, password })
    })
      .then(response => {
        if (!response.ok) {
          throw new Error('Invalid email or password')
        }
        return response.text()
      })
           .then(data => {
        setMessage(data)
        setTimeout(() => navigate('/'), 1000)
      })
      .catch(error => setMessage(error.message))
  }

    return (
    <div className="page-container">
      <h1>Login</h1>
      <p className="subtitle">Welcome back to MediBook</p>
      <form onSubmit={handleLogin}>
        <div>
          <label>Email</label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>
        <div>
          <label>Password</label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>
        <button type="submit">Login</button>
      </form>
      {message && <p className="message">{message}</p>}
    </div>
  )
}

export default Login