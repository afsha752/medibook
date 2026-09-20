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
    <div className="page-container">
      <h1>MediBook</h1>
      <p className="subtitle">Find and book the right doctor for you</p>

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
  )
}

export default Home