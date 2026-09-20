import { useState, useEffect } from 'react'

function MyAppointments() {
  const [patients, setPatients] = useState([])
  const [patientId, setPatientId] = useState('')
  const [appointments, setAppointments] = useState([])
  const [allAppointments, setAllAppointments] = useState([])

  useEffect(() => {
    fetch('http://localhost:8080/api/users')
      .then(res => res.json())
      .then(data => setPatients(data.filter(u => u.role === 'PATIENT')))

    fetch('http://localhost:8080/api/appointments')
      .then(res => res.json())
      .then(data => setAllAppointments(data))
  }, [])

  useEffect(() => {
    if (patientId) {
      const filtered = allAppointments.filter(a => a.patient.id === parseInt(patientId))
      setAppointments(filtered)
    } else {
      setAppointments([])
    }
  }, [patientId, allAppointments])

  return (
    <div className="page-container">
      <h1>My Appointments</h1>
      <p className="subtitle">View your booked appointments</p>

      <div>
        <label>Select Patient</label>
        <select value={patientId} onChange={(e) => setPatientId(e.target.value)}>
          <option value="">Select patient</option>
          {patients.map(p => (
            <option key={p.id} value={p.id}>{p.name}</option>
          ))}
        </select>
      </div>

      <div style={{ marginTop: '24px' }}>
        {patientId && appointments.length === 0 && (
          <p className="subtitle">No appointments found.</p>
        )}
        {appointments.map(a => (
          <div className="card" key={a.id}>
           <div className="doctor-name">{a.doctor.user.name}</div>
            <div className="doctor-specialization">{a.doctor.specialization.name}</div>
            <p style={{ margin: '8px 0 4px', fontSize: '14px' }}>
              📅 {a.appointmentDate} at {a.appointmentTime}
            </p>
            <p style={{ margin: '4px 0', fontSize: '14px', color: '#6c757d' }}>
              Symptoms: {a.symptomsText}
            </p>
            <span style={{
              display: 'inline-block',
              marginTop: '8px',
              padding: '4px 10px',
              borderRadius: '12px',
              fontSize: '12px',
              fontWeight: '600',
              background: a.status === 'CONFIRMED' ? '#d1e7dd' : '#fff3cd',
              color: a.status === 'CONFIRMED' ? '#0f5132' : '#664d03'
            }}>
              {a.status}
            </span>
          </div>
        ))}
      </div>
    </div>
  )
}

export default MyAppointments