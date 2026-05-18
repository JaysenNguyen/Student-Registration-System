from flask import Flask, jsonify, request
from flask_cors import CORS
import sqlite3

app = Flask(__name__)
CORS(app)  # allows React to talk to this API

DB = 'university.db'

def get_db():
    conn = sqlite3.connect(DB)
    conn.row_factory = sqlite3.Row
    conn.execute('PRAGMA foreign_keys = ON')  # Enable cascading deletes
    return conn

def init_db():
    conn = get_db()
    # Drop enrollments table to ensure constraints are applied
    conn.execute('DROP TABLE IF EXISTS enrollments')
    conn.executescript('''
        CREATE TABLE IF NOT EXISTS students (
            student_id  INTEGER PRIMARY KEY AUTOINCREMENT,
            first_name  TEXT NOT NULL,
            last_name   TEXT NOT NULL,
            email       TEXT NOT NULL UNIQUE,
            major       TEXT NOT NULL DEFAULT '',
            grade_level TEXT NOT NULL DEFAULT ''
        );

        CREATE TABLE IF NOT EXISTS courses (
            course_id    INTEGER PRIMARY KEY AUTOINCREMENT,
            course_name  TEXT NOT NULL,
            professor    TEXT NOT NULL,
            credit_hours INTEGER NOT NULL DEFAULT 3
        );

        CREATE TABLE IF NOT EXISTS enrollments (
            enrollment_id INTEGER PRIMARY KEY AUTOINCREMENT,
            student_id    INTEGER NOT NULL,
            course_id     INTEGER NOT NULL,
            semester      TEXT NOT NULL,
            FOREIGN KEY (student_id) REFERENCES students(student_id) ON DELETE CASCADE,
            FOREIGN KEY (course_id)  REFERENCES courses(course_id) ON DELETE CASCADE,
            UNIQUE(student_id, course_id, semester)
        );
    ''')
    conn.commit()
    # Migrate existing DB if grade_level column is missing
    try:
        conn.execute("ALTER TABLE students ADD COLUMN grade_level TEXT NOT NULL DEFAULT ''")
        conn.commit()
    except Exception:
        pass
    try:
        conn.execute("ALTER TABLE courses ADD COLUMN credit_hours INTEGER NOT NULL DEFAULT 3")
        conn.commit()
    except Exception:
        pass
    conn.close()

# ── Students ──────────────────────────────────

@app.route('/api/students', methods=['GET'])
def get_students():
    conn = get_db()
    rows = conn.execute('SELECT * FROM students').fetchall()
    conn.close()
    return jsonify([dict(r) for r in rows])

@app.route('/api/students', methods=['POST'])
def add_student():
    data = request.get_json()
    conn = get_db()
    try:
        conn.execute('INSERT INTO students (first_name, last_name, email, major, grade_level) VALUES (?, ?, ?, ?, ?)',
                     (data['first_name'], data['last_name'], data['email'], data.get('major', ''), data.get('grade_level', '')))
        conn.commit()
        conn.close()
        return jsonify({'message': 'Student added'}), 201
    except sqlite3.IntegrityError as e:
        conn.close()
        return jsonify({'message': 'Email already exists'}), 400

@app.route('/api/students/<int:student_id>', methods=['DELETE'])
def delete_student(student_id):
    conn = get_db()
    conn.execute('DELETE FROM students WHERE student_id = ?', (student_id,))
    conn.commit()
    conn.close()
    return jsonify({'message': 'Student deleted'}), 200

# ── Courses ───────────────────────────────────

@app.route('/api/courses', methods=['GET'])
def get_courses():
    conn = get_db()
    rows = conn.execute('SELECT * FROM courses').fetchall()
    conn.close()
    return jsonify([dict(r) for r in rows])

@app.route('/api/courses', methods=['POST'])
def add_course():
    data = request.get_json()
    conn = get_db()
    conn.execute('INSERT INTO courses (course_name, professor, credit_hours) VALUES (?, ?, ?)',
                 (data['course_name'], data['professor'], data.get('credit_hours', 3)))
    conn.commit()
    conn.close()
    return jsonify({'message': 'Course added'}), 201

@app.route('/api/courses/<int:course_id>', methods=['DELETE'])
def delete_course(course_id):
    conn = get_db()
    conn.execute('DELETE FROM courses WHERE course_id = ?', (course_id,))
    conn.commit()
    conn.close()
    return jsonify({'message': 'Course deleted'}), 200

# ── Enrollments ───────────────────────────────

@app.route('/api/enrollments', methods=['GET'])
def get_enrollments():
    conn = get_db()
    rows = conn.execute('''
        SELECT students.student_id, students.first_name, students.last_name, students.grade_level,
               courses.course_id, courses.course_name, courses.professor, courses.credit_hours,
               enrollments.semester, enrollments.enrollment_id
        FROM enrollments
        JOIN students ON enrollments.student_id = students.student_id
        JOIN courses  ON enrollments.course_id  = courses.course_id
    ''').fetchall()
    conn.close()
    return jsonify([dict(r) for r in rows])

@app.route('/api/enrollments', methods=['POST'])
def enroll_student():
    data = request.get_json()
    conn = get_db()
    try:
        conn.execute('INSERT INTO enrollments (student_id, course_id, semester) VALUES (?, ?, ?)',
                     (data['student_id'], data['course_id'], data['semester']))
        conn.commit()
        conn.close()
        return jsonify({'message': 'Student enrolled'}), 201
    except sqlite3.IntegrityError as e:
        conn.close()
        return jsonify({'message': 'Student already enrolled in this course for the specified semester'}), 400

@app.route('/api/enrollments/<int:enrollment_id>', methods=['DELETE'])
def delete_enrollment(enrollment_id):
    conn = get_db()
    conn.execute('DELETE FROM enrollments WHERE enrollment_id = ?', (enrollment_id,))
    conn.commit()
    conn.close()
    return jsonify({'message': 'Enrollment deleted'}), 200

# ── Run ───────────────────────────────────────

if __name__ == '__main__':
    init_db()
    app.run(debug=True, port=8000)