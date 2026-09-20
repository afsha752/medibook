import { useState, useEffect } from 'react'

function BookAppointment() {
  const [doctors, setDoctors] = useState([])
  const [patients, setPatients] = useState([])
  const [doctorId, setDoctorId] = useState('')
  const [patientId, setPatientId] = useState('')
  const [date, setDate] = useState('')
  const [time, setTime] = useState('')
  const [symptoms, setSymptoms] = useState('')
  const [message, setMessage] = useState('')

  useEffect(() => {
    fetch('http://localhost:8080/api/doctors')
      .then(res => res.json())
      .then(data => setDoctors(data))

    fetch('http://localhost:8080/api/users')
      .then(res => res.json())
      .then(data => setPatients(data.filter(u => u.role === 'PATIENT')))
  }, [])

  const handleBooking = (e) => {
    e.preventDefault()

    fetch('http://localhost:8080/api/appointments', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        patient: { id: patientId },
        doctor: { id: doctorId },
        appointmentDate: date,
        appointmentTime: time,
        symptomsText: symptoms
      })
    })
      .then(response => {
        if (!response.ok) {
          throw new Error('Booking failed')
        }
        return response.json()
      })
      .then(() => {
        setMessage('Appointment booked successfully!')
        setDate('')
        setTime('')
        setSymptoms('')
      })
      .catch(error => setMessage(error.message))
  }

  return (
    <div className="page-container">
      <h1>Book Appointment</h1>
      <p className="subtitle">Choose a doctor and schedule your visit</p>
      <form onSubmit={handleBooking}>
        <div>
          <label>Patient</label>
          <select value={patientId} onChange={(e) => setPatientId(e.target.value)} required>
            <option value="">Select patient</option>
            {patients.map(p => (
              <option key={p.id} value={p.id}>{p.name}</option>
            ))}
          </select>
        </div>
        <div>
          <label>Doctor</label>
          <select value={doctorId} onChange={(e) => setDoctorId(e.target.value)} required>
            <option value="">Select doctor</option>
            {doctors.map(d => (
              <option key={d.id} value={d.id}>{d.user.name} — {d.specialization.name}</option>
            ))}
          </select>
        </div>
        <div>
          <label>Date</label>
          <input
  type="date"
  value={date}
  onChange={(e) => setDate(e.target.value)}
  min={new Date().toISOString().split('T')[0]}
  max="2027-12-31"
  required
/>
        </div>
        <div>
          <label>Time</label>
          <input type="time" value={time} onChange={(e) => setTime(e.target.value)} required />
        </div>
        <div>
          <label>Symptoms</label>
          <input type="text" value={symptoms} onChange={(e) => setSymptoms(e.target.value)} placeholder="e.g. fever, headache" required />
        </div>
        <button type="submit">Book Appointment</button>
      </form>
      {message && <p className="message">{message}</p>}
    </div>
  )
}

export default BookAppointment