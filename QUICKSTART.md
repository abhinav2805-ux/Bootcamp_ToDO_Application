# Quick Start Guide

## Windows Users - Quick Setup

### Step 1: Install MySQL Database
1. Download MySQL Community Server from: https://dev.mysql.com/downloads/mysql/
2. Run installer and follow setup wizard
3. Install MySQL Server (keep default port 3306)
4. Create a local database

### Step 2: Create Database
Open Command Prompt and run:
```bash
mysql -u root -p
```
Enter your MySQL password, then run:
```sql
CREATE DATABASE todo_app;
```

### Step 3: Update Server Configuration
Open `server\.env` and update:
```
DB_HOST=localhost
DB_USER=root
DB_PASSWORD=your_mysql_password
DB_NAME=todo_app
PORT=5000
```

### Step 4: Install & Run Backend
```bash
# In one terminal/PowerShell window
cd server
npm install
npm run dev
```

You should see: `Server running on http://localhost:5000`

### Step 5: Install & Run Frontend
```bash
# In another terminal/PowerShell window
cd client
npm install
npm run dev
```

You'll see something like: `Local: http://localhost:5173`

### Step 6: Open in Browser
- Click the local URL shown in client terminal
- Start creating todos!

## API Status
- Backend: http://localhost:5000/health (returns status)
- Frontend: http://localhost:5173 (returns app)

## Need Help?
See `SETUP_GUIDE.md` for detailed troubleshooting and API documentation.
