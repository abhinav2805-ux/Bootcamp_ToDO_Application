# Todo App - Full Stack Application

A simple yet powerful todo application built with modern web technologies. Create, read, update, and delete your tasks with a beautiful, responsive interface.

## 🚀 Quick Start

### Prerequisites
- Node.js v14+
- MySQL Server

### 1. Database Setup
```sql
CREATE DATABASE todo_app;
```

### 2. Configure Backend
```bash
cd server
npm install
```
Edit `server\.env`:
```
DB_HOST=localhost
DB_USER=root
DB_PASSWORD=your_password
DB_NAME=todo_app
PORT=5000
```

### 3. Start Backend
```bash
cd server
npm run dev  # runs on http://localhost:5000
```

### 4. Start Frontend
```bash
cd client
npm install
npm run dev  # runs on http://localhost:5173
```

## ✨ Features

- **Create Tasks** - Add new todos with title and description
- **Read Tasks** - View all your todos in a beautiful list
- **Update Tasks** - Edit task title and description inline
- **Delete Tasks** - Remove completed or unwanted tasks
- **Mark Complete** - Check off tasks as you complete them
- **Statistics** - See total, completed, and pending task counts
- **Responsive Design** - Works on desktop, tablet, and mobile
- **No Authentication** - Get started immediately, no login required
- **Real-time Updates** - Changes sync instantly

## 📁 Project Structure

```
To-Do/
├── client/              # React Frontend
│   ├── src/
│   │   ├── App.jsx     # Main component with CRUD operations
│   │   └── index.css   # Tailwind CSS imports
│   ├── vite.config.js
│   └── package.json
│
├── server/              # Node.js/Express Backend
│   ├── config/db.js    # MySQL connection
│   ├── controllers/    # Business logic
│   ├── routes/         # API endpoints
│   ├── server.js       # Main server
│   ├── .env            # Configuration
│   └── package.json
│
├── SETUP_GUIDE.md      # Detailed setup instructions
└── QUICKSTART.md       # Quick reference guide
```

## 🔧 Technologies

**Frontend:**
- React 19
- Vite
- Tailwind CSS

**Backend:**
- Node.js
- Express.js
- MySQL2

## 📋 API Endpoints

All endpoints prefixed with `/api`

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/todos` | Get all todos |
| GET | `/todos/:id` | Get single todo |
| POST | `/todos` | Create new todo |
| PUT | `/todos/:id` | Update todo |
| DELETE | `/todos/:id` | Delete todo |

## 🎨 UI Features

- Clean, modern design with Tailwind CSS
- Blue gradient background
- Card-based todo layout
- Inline editing capability
- Checkbox for task completion
- Delete confirmation dialog
- Real-time statistics dashboard
- Smooth hover effects and transitions
- Responsive layout for all screen sizes

## 💾 Database Schema

```sql
CREATE TABLE todos (
  id INT PRIMARY KEY AUTO_INCREMENT,
  title VARCHAR(255) NOT NULL,
  description TEXT,
  completed BOOLEAN DEFAULT FALSE,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);
```

## 🐛 Troubleshooting

**Backend won't start:**
- Check MySQL is running
- Verify `.env` credentials
- Ensure port 5000 is available

**Frontend can't reach backend:**
- Check backend is running on port 5000
- Verify CORS is enabled
- Check API_BASE_URL in App.jsx

**Styling issues:**
- Clear browser cache
- Restart dev server
- Verify Tailwind CSS import in index.css

## 📖 Documentation

- [Setup Guide](./SETUP_GUIDE.md) - Detailed setup with troubleshooting
- [Quick Start](./QUICKSTART.md) - Quick reference for Windows users

## 📄 License

MIT License

## 👨‍💻 Usage

1. **Add a Todo:** Type title and description, click "Add Todo"
2. **Complete a Todo:** Click the checkbox next to a todo
3. **Edit a Todo:** Click "Edit", modify fields, click "Save"
4. **Delete a Todo:** Click "Delete" and confirm

## 🎯 Next Steps

Consider adding these features:
- User authentication
- Todo categories/tags
- Due dates
- Priority levels
- Persistent app theme
- Export/Import functionality
- Dark mode toggle

---

Built with ❤️ using React, Node.js, and MySQL
