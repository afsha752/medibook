import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Navbar from './components/Navbar'
import Footer from './components/Footer'
import Home from './pages/Home'
import Login from './pages/Login'
import Register from './pages/Register'
import BookAppointment from './pages/BookAppointment'
import MyAppointments from './pages/MyAppointments'

function App() {
  return (
    <BrowserRouter>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/book" element={<BookAppointment />} />
        <Route path="/my-appointments" element={<MyAppointments />} />
      </Routes>
      <Footer />
    </BrowserRouter>
  )
}

export default App