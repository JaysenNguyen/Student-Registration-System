// import pages for navigation
import './App.css'
import StudentRegistrations from './pages/components/studentRegistrations'
import RegisterStudent from './pages/components/registerStudent'
import EnrollStudent from './pages/components/enrollStudent'
import NavBar from './pages/components/NavBar'

import { Routes, Route, useLocation } from 'react-router-dom'


function App() {
  const location = useLocation()

  return (
    <div className="App">
      <NavBar />
      <Routes>
        <Route path="/" element={<StudentRegistrations />} />
        <Route path="/register-student" element={<RegisterStudent />} />
        <Route path="/enroll-student" element={<EnrollStudent />} />
      </Routes>
    </div>
  )
}

export default App
