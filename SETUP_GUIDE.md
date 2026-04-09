# Todo App Setup Guide

A full-stack todo application with React frontend, Node.js/Express backend, and MySQL database.

## Features
- ✅ Create, Read, Update, Delete (CRUD) tasks
- ✅ Mark tasks as completed/incomplete
- ✅ Add task descriptions
- ✅ Beautiful Tailwind CSS UI
- ✅ Real-time updates
- ✅ No authentication required
- ✅ Responsive design

## Prerequisites
- Node.js (v14+)
- MySQL Server (local or remote)
- npm (comes with Node.js)

## Database Setup

### Create MySQL Database

1. **Open MySQL CLI or MySQL Workbench**

2. **Run these commands:**
```sql
CREATE DATABASE todo_app;
USE todo_app;

CREATE TABLE todos (
  id INT PRIMARY KEY AUTO_INCREMENT,
  title VARCHAR(255) NOT NULL,
  description TEXT,
  completed BOOLEAN DEFAULT FALSE,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);
```

> **Note:** The table will also be created automatically when the server starts if it doesn't exist.

## Server Setup

### 1. Install Dependencies
```bash
cd server
npm install
```

### 2. Configure Environment Variables
Update `.env` file with your MySQL credentials:
```
DB_HOST=localhost
DB_USER=root
DB_PASSWORD=your_password
DB_NAME=todo_app
PORT=5000
```

### 3. Start the Server
```bash
# Production mode
npm start

# Development mode with auto-reload
npm run dev
```

Server runs on: `http://localhost:5000`

## Client Setup

### 1. Install Dependencies
```bash
cd client
npm install
```

### 2. Start Development Server
```bash
npm run dev
```

Client runs on: `http://localhost:5173` (or as shown in terminal)

## API Endpoints

### Base URL: `http://localhost:5000/api`

#### Get All Todos
```
GET /todos
Response: Array of todo objects
```

#### Get Single Todo
```
GET /todos/:id
Response: Single todo object
```

#### Create Todo
```
POST /todos
Body: {
  "title": "Todo title",
  "description": "Optional description"
}
Response: Created todo object
```

#### Update Todo
```
PUT /todos/:id
Body: {
  "title": "Updated title",
  "description": "Updated description",
  "completed": true/false
}
Response: Success message
```

#### Delete Todo
```
DELETE /todos/:id
Response: Success message
```

## Project Structure

```
To-Do/
├── client/                 # React frontend
│   ├── src/
│   │   ├── App.jsx        # Main app component with CRUD logic
│   │   ├── App.css        # App styles
│   │   ├── index.css      # Tailwind imports
│   │   ├── main.jsx       # Entry point
│   │   └── index.html     # HTML template
│   ├── package.json       # Dependencies
│   └── vite.config.js     # Vite configuration
│
└── server/                 # Node.js/Express backend
    ├── config/
    │   └── db.js          # MySQL connection pool
    ├── controllers/
    │   └── todoController.js  # Business logic
    ├── routes/
    │   └── todoRoutes.js   # API routes
    ├── server.js          # Main server file
    ├── .env               # Environment variables
    └── package.json       # Dependencies
```

## Running the Application

### Terminal 1 - Start Backend Server
```bash
cd server
npm run dev      # or npm start
```

### Terminal 2 - Start Frontend Server
```bash
cd client
npm run dev
```

Then open your browser to the URL shown in the client terminal (usually `http://localhost:5173`)

## Features in Detail

### Create Todo
- Enter title (required)
- Add optional description
- Click "Add Todo" button

### View Todos
- All todos displayed in a list
- Completed items show with strikethrough
- Statistics shown at bottom (Total, Completed, Pending)

### Update Todo
- Click "Edit" button on a todo
- Modify title and/or description
- Click "Save" to confirm or "Cancel" to discard

### Complete Todo
- Click checkbox next to todo
- Reflects in database immediately

### Delete Todo
- Click "Delete" button
- Confirm deletion in popup
- Todo removed from list

## Troubleshooting

### "Cannot connect to database"
- Verify MySQL is running
- Check `.env` credentials match your MySQL setup
- Ensure `todo_app` database exists

### "Frontend can't reach backend"
- Verify backend is running on port 5000
- Check if CORS is properly enabled
- Ensure API_BASE_URL in App.jsx matches backend URL

### "Port already in use"
- Change PORT in `.env` file
- Or kill process using the port

### Styling not showing
- Clear browser cache (Ctrl+Shift+Delete)
- Make sure Tailwind CSS is properly imported in index.css

## Built With
- **Frontend:** React 19, Vite, Tailwind CSS
- **Backend:** Node.js, Express.js
- **Database:** MySQL
- **HTTP Client:** Fetch API

## License
MIT
