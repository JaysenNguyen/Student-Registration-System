import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { getStudents, getCourses, enrollStudent } from "../../api";

function EnrollStudent() {
  const navigate = useNavigate()

  const [students, setStudents] = useState([])
  const [courses, setCourses] = useState([])
  const [studentId, setStudentId] = useState('')
  const [courseId, setCourseId] = useState('')
  const [semester, setSemester] = useState('Fall 2026')

  useEffect(() => {
    const fetchOptions = async () => {
      try {
        const [students, courses] = await Promise.all([
          getStudents(),
          getCourses()
        ])

        setStudents(students)
        setCourses(courses)

        if (!studentId && students.length > 0) setStudentId(students[0].student_id)
        if (!courseId && courses.length > 0) setCourseId(courses[0].course_id)
      } catch (err) {
        alert('Unable to load selection data: ' + err.message)
      }
    }
    fetchOptions()
  }, [])

  const handleSubmit = async (e) => {
    e.preventDefault()

    if (!studentId || !courseId || !semester) {
      alert('Please select student, course, and semester')
      return
    }

    try {
      await enrollStudent({
        student_id: Number(studentId),
        course_id: Number(courseId),
        semester,
      })
      alert('Enrollment successful!')
      navigate('/')
    } catch (error) {
      alert('Enrollment error: ' + error.message)
      console.error(error)
    }
  }

  return (
    <div style={{ padding: '2rem' }}>
      <h1>Enroll Student</h1>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Student:</label>
          <select value={studentId} onChange={(e) => setStudentId(e.target.value)} required>
            <option value="">-- Select student --</option>
            {students.map((s) => (
              <option key={s.student_id} value={s.student_id}>
                {s.student_id} - {s.first_name} {s.last_name}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label>Course:</label>
          <select value={courseId} onChange={(e) => setCourseId(e.target.value)} required>
            <option value="">-- Select course --</option>
            {courses.map((c) => (
              <option key={c.course_id} value={c.course_id}>
                {c.course_id} - {c.course_name}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label>Semester:</label>
          <input
            type="text"
            value={semester}
            onChange={(e) => setSemester(e.target.value)}
            required
          />
        </div>

        <button type="submit" style={{ marginTop: '1rem' }}>
          Submit Enrollment
        </button>
      </form>
    </div>
  )
}

export default EnrollStudent