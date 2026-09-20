import { useState } from 'react'
import { useNavigate } from 'react-router-dom'

function Register() {
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [message, setMessage] = useState('')
  const navigate = useNavigate()

  const handleRegister = (e) => {
    e.preventDefault()

    fetch('http://localhost:8080/api/users', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ name, email, password, role: 'PATIENT' })
    })
      .then(response => {
        if (!response.ok) {
          throw new Error('Registration failed')
        }
        return response.json()
      })
      .then(() => {
        setMessage('Registration successful! Redirecting to login...')
        setTimeout(() => navigate('/login'), 1500)
      })
      .catch(error => setMessage(error.message))
  }

  return (
    <div className="page-container">
      <h1>Register</h1>
      <p className="subtitle">Create your MediBook account</p>
      <form onSubmit={handleRegister}>
        <div>
          <label>Name</label>
          <input type="text" value={name} onChange={(e) => setName(e.target.value)} required />
        </div>
        <div>
          <label>Email</label>
          <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} required />
        </div>
        <div>
          <label>Password</label>
          <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} required />
        </div>
        <button type="submit">Register</button>
      </form>
      {message && <p className="message">{message}</p>}
    </div>
  )
}

export default Register