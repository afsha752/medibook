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
      <div className="hero">
        <h1>Your Health, One Click Away</h1>
        <p>Find the right doctor and book an appointment in minutes.</p>
      </div>

      <div className="page-container">
        <h2 className="section-title">Available Doctors</h2>
        {doctors.map(doctor => (
          <div className="card doctor-card" key={doctor.id}>
            <div>
              <div className="doctor-name">{doctor.user.name}</div>
              <div className="doctor-specialization">{doctor.specialization.name}</div>
            </div>
            <div className="doctor-fee">₹{doctor.consultationFee}</div>
          </div>
        ))}
      </div>
    </div>
  )
}

export default Home