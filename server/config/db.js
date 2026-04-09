const mysql = require('mysql2/promise');
require('dotenv').config();

const pool = mysql.createPool({
  host: process.env.DB_HOST || 'localhost',
  user: process.env.DB_USER || 'root',
  password: process.env.DB_PASSWORD || '',
  database: process.env.DB_NAME || 'todo_app',
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0
});

// Create table if it doesn't exist
(async () => {
  const connection = await pool.getConnection();
  try {
    await connection.execute(`
      CREATE TABLE IF NOT EXISTS todos (
        id INT PRIMARY KEY AUTO_INCREMENT,
        title VARCHAR(255) NOT NULL,
        description TEXT,
        completed BOOLEAN DEFAULT FALSE,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
      )
    `);
    console.log('Todos table created or already exists');
  } catch (err) {
    console.error('Error creating todos table:', err);
  } finally {
    connection.release();
  }
})();

module.exports = pool;
