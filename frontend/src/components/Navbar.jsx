import { Link } from 'react-router-dom'

function Navbar() {
  return (
    <nav>
      <Link to="/">MediBook</Link>
      <Link to="/book">Book Appointment</Link>
      <Link to="/my-appointments">My Appointments</Link>
      <Link to="/register">Register</Link>
      <Link to="/login">Login</Link>
    </nav>
  )
}

export default Navbar