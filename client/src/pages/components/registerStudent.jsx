import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { addStudent } from "../../api";

function RegisterStudent() {
  const navigate = useNavigate()

  // Local state for form inputs
  const [student, setStudent] = useState({
    id: '',
    firstName: '',
    lastName: '',
    email: '',
    gradeLevel: ''
  })

  // Handle input changes
  const handleChange = (e) => {
    const { name, value } = e.target
    setStudent(prev => ({ ...prev, [name]: value }))
  }

  const handleSubmit = async (e) => {
    e.preventDefault()

    try {
      await addStudent({
        first_name: student.firstName,
        last_name: student.lastName,
        email: student.email,
        grade_level: student.gradeLevel,
      })
      alert('Student registered successfully!')
      navigate('/enroll-student')
    } catch (error) {
      alert('Error: ' + error.message)
      console.error(error)
    }
  }

  const handleEnrollClick = () => {
    navigate('/enroll-student')
  }

  return (
    <div style={{ padding: '2rem' }}>
      <h1>Register Student</h1>
      <form onSubmit={handleSubmit}>
        <div>
          <label>First Name:</label>
          <input 
            type="text" 
            name="firstName" 
            value={student.firstName} 
            onChange={handleChange} 
            required
          />
        </div>

        <div>
          <label>Last Name:</label>
          <input 
            type="text" 
            name="lastName" 
            value={student.lastName} 
            onChange={handleChange} 
            required
          />
        </div>

        <div>
          <label>Email:</label>
          <input 
            type="email" 
            name="email" 
            value={student.email} 
            onChange={handleChange} 
            required
          />
        </div>

        <div>
          <label>Grade Level:</label>
          <select name="gradeLevel" value={student.gradeLevel} onChange={handleChange} required>
            <option value="">-- Select grade level --</option>
            <option value="Freshman">Freshman</option>
            <option value="Sophomore">Sophomore</option>
            <option value="Junior">Junior</option>
            <option value="Senior">Senior</option>
          </select>
        </div>

        <button 
          type="submit"
          style={{ marginTop: '1rem', marginRight: '0.75rem' }}>
          Register Student
        </button>

        <button 
          type="button" 
          onClick={handleEnrollClick} 
          style={{ marginTop: '1rem' }}>
          Enroll Student
        </button>
      </form>
    </div>
  )
}

export default RegisterStudent