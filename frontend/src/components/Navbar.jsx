import { Link, useNavigate, useLocation } from 'react-router-dom'

function Navbar() {
  const navigate = useNavigate()
  useLocation() // makes the navbar refresh after login/logout navigation

  let user = null
  try {
    user = JSON.parse(localStorage.getItem('user'))
  } catch (e) {
    user = null
  }

  const handleLogout = () => {
    localStorage.removeItem('user')
    navigate('/login')
  }

  return (
    <nav>
      <Link to="/">MediBook</Link>
      <Link to="/book">Book Appointment</Link>
      <Link to="/my-appointments">My Appointments</Link>
      {user ? (
        <>
          <span className="nav-user">Hi, {user.name}</span>
          <button className="logout-btn" onClick={handleLogout}>Logout</button>
        </>
      ) : (
        <>
          <Link to="/register">Register</Link>
          <Link to="/login">Login</Link>
        </>
      )}
    </nav>
  )
}

export default Navbar