const handleResponse = async (res) => {
  const data = await res.json().catch(() => null)
  if (!res.ok) {
    const error = data?.message || res.statusText || 'API request failed'
    throw new Error(error)
  }
  return data
}

export const getStudents = async () => {
  const res = await fetch('/api/students')
  return handleResponse(res)
}

export const getCourses = async () => {
  const res = await fetch('/api/courses')
  return handleResponse(res)
}

export const getEnrollments = async () => {
  const res = await fetch('/api/enrollments')
  return handleResponse(res)
}

export const addStudent = async (student) => {
  const res = await fetch('/api/students', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(student),
  })
  return handleResponse(res)
}

export const enrollStudent = async (enrollment) => {
  const res = await fetch('/api/enrollments', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(enrollment),
  })
  return handleResponse(res)
}

export const deleteEnrollment = async (enrollmentId) => {
  const res = await fetch(`/api/enrollments/${enrollmentId}`, {
    method: 'DELETE',
  })
  return handleResponse(res)
}
