import { useState, useEffect } from 'react'

function Home() {
  const [doctors, setDoctors] = useState([])

  useEffect(() => {
    fetch('http://localhost:8080/api/doctors')
      .then(response => response.json())
      .then(data => setDoctors(data))
      .catch(error => console.error('Error fetching doctors:', error))
  }, [])

  return (
    <div>
      <h1>MediBook</h1>
      <p>Doctor Appointment Booking System</p>

      <h2>Available Doctors</h2>
      <ul>
        {doctors.map(doctor => (
          <li key={doctor.id}>
            {doctor.user.name} — {doctor.specialization.name} — ₹{doctor.consultationFee}
          </li>
        ))}
      </ul>
    </div>
  )
}

export default Home