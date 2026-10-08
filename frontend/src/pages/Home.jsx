import { useState, useEffect } from 'react'

const symptomMap = {
  'Cardiologist': ['chest pain', 'heart', 'breathless', 'shortness of breath', 'palpitation', 'blood pressure', 'bp', 'cholesterol'],
  'Dermatologist': ['skin', 'rash', 'acne', 'pimple', 'itch', 'hair', 'allergy', 'eczema', 'dandruff'],
  'General Physician': ['fever', 'cold', 'cough', 'headache', 'body pain', 'vomiting', 'stomach', 'weakness', 'fatigue', 'flu', 'sore throat']
}

function detectSpecialization(text) {
  const input = text.toLowerCase()
  for (const [specialization, keywords] of Object.entries(symptomMap)) {
    if (keywords.some(word => input.includes(word))) {
      return specialization
    }
  }
  return null
}

function Home() {
  const [doctors, setDoctors] = useState([])
  const [selected, setSelected] = useState('All')
  const [search, setSearch] = useState('')

  useEffect(() => {
    fetch('http://localhost:8080/api/doctors')
      .then(response => response.json())
      .then(data => setDoctors(data))
      .catch(error => console.error('Error fetching doctors:', error))
  }, [])

  const specializations = ['All', ...new Set(doctors.map(d => d.specialization.name))]

  const searching = search.trim() !== ''
  const suggested = searching ? detectSpecialization(search) : null

  let visibleDoctors
  if (searching) {
    visibleDoctors = suggested
      ? doctors.filter(d => d.specialization.name === suggested)
      : []
  } else {
    visibleDoctors = selected === 'All'
      ? doctors
      : doctors.filter(d => d.specialization.name === selected)
  }

  return (
    <div>
      <div className="hero">
        <h1>Your Health, One Click Away</h1>
        <p>Find the right doctor and book an appointment in minutes.</p>
      </div>

      <div className="page-container">
        <input
          className="search-box"
          type="text"
          placeholder="Search by symptom or disease, e.g. chest pain, skin rash, fever"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />

        {searching && suggested && (
          <p className="message">Based on your symptoms, we suggest a <b>{suggested}</b></p>
        )}
        {searching && !suggested && (
          <p className="message">No match found. Try words like fever, chest pain, or skin rash.</p>
        )}

        <h2 className="section-title">Available Doctors</h2>

        {!searching && (
          <div className="filter-bar">
            {specializations.map(name => (
              <button
                key={name}
                className={selected === name ? 'filter-btn active' : 'filter-btn'}
                onClick={() => setSelected(name)}
              >
                {name}
              </button>
            ))}
          </div>
        )}

        {visibleDoctors.map(doctor => (
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