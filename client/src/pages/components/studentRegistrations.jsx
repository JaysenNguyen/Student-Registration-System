import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { getEnrollments, deleteEnrollment } from "../../api";

function StudentRegistrations() {
  const navigate = useNavigate()
  const [registrations, setRegistrations] = useState([])

  useEffect(() => {
    const fetchRegistrations = async () => {
      try {
        const data = await getEnrollments()
        setRegistrations(data)
      } catch (error) {
        console.error(error)
      }
    }

    fetchRegistrations()
  }, [])

  const handleRegisterClick = () => {
    navigate('/register-student')
  }

  const handleDelete = async (enrollmentId) => {
    try {
      await deleteEnrollment(enrollmentId)
      setRegistrations((prev) => prev.filter((r) => r.enrollment_id !== enrollmentId))
    } catch (error) {
      console.error(error)
    }
  }

  return (
    <div style={{ padding: '2rem' }}>
      <h1>CS Student Registrations</h1>

      <table border="1" cellPadding="8" style={{ width: '100%', marginBottom: '1rem' }}>
        <thead>
          <tr>
            <th>Student ID</th>
            <th>Student Name</th>
            <th>Grade Level</th>
            <th>Course</th>
            <th>Course ID</th>
            <th>Professor</th>
            <th>Credit Hours</th>
            <th>Semester</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {registrations.map((item) => (
            <tr key={item.enrollment_id}>
              <td>{item.student_id}</td>
              <td>{item.first_name} {item.last_name}</td>
              <td>{item.grade_level}</td>
              <td>{item.course_name}</td>
              <td>{item.course_id}</td>
              <td>{item.professor}</td>
              <td>{item.credit_hours}</td>
              <td>{item.semester}</td>
              <td>
                <button onClick={() => handleDelete(item.enrollment_id)} style={{ color: 'red' }}>
                  Delete
                </button>
              </td>
            </tr>
          ))}
          {registrations.length === 0 && (
            <tr><td colSpan="9">No registrations yet</td></tr>
          )}
        </tbody>
      </table>

      <div style={{ display: 'flex', gap: '1rem' }}>
        <button onClick={handleRegisterClick}>
          Register Student
        </button>

        <button onClick={() => navigate('/enroll-student')}>
          Enroll Student
        </button>
      </div>
    </div>
  )
}

export default StudentRegistrations