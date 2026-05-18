# React + Vite

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react) uses [Oxc](https://oxc.rs)
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react-swc) uses [SWC](https://swc.rs/)

## React Compiler

The React Compiler is enabled on this template. See [this documentation](https://react.dev/learn/react-compiler) for more information.

Note: This will impact Vite dev & build performances.

## Expanding the ESLint configuration

If you are developing a production application, we recommend using TypeScript with type-aware lint rules enabled. Check out the [TS template](https://github.com/vitejs/vite/tree/main/packages/create-vite/template-react-ts) for information on how to integrate TypeScript and [`typescript-eslint`](https://typescript-eslint.io) in your project.

##How to get it running
run backend:
    cd '/Users/jenninekedir/Documents/Database /BlueSteel/Backend'
    python3 app.py

run frontend:
    cd '/Users/jenninekedir/Documents/Database /BlueSteel/comp-sci-registration-system'
    npm install
    npm run dev

    run from frontend 

    
To add Courses: 
curl -X POST http://localhost:8000/api/courses \
  -H "Content-Type: application/json" \
  -d '{"course_name": "Algorithms", "professor": "John Smith", "credit_hours": 4}'



To Delete all registration:
First check the id: 
sqlite3 Backend/university.db "SELECT student_id, first_name, last_name FROM students;"

then find id ex: id|name|lastname
delete by id
 sqlite3 Backend/university.db "DELETE FROM students WHERE student_id = 3;"

 this is a test 


to remove coruse:
curl -X DELETE http://localhost:8000/api/courses/6


# First find the course ID
sqlite3 Backend/university.db "SELECT * FROM courses;"

# Then delete by ID
sqlite3 Backend/university.db "DELETE FROM courses WHERE course_id = 6;"


