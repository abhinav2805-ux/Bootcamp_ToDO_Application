const pool = require('../config/db');

// Get all todos
const getAllTodos = async (req, res) => {
  try {
    const connection = await pool.getConnection();
    const [todos] = await connection.query('SELECT * FROM todos ORDER BY created_at DESC');
    connection.release();
    res.json(todos);
  } catch (err) {
    console.error('Error fetching todos:', err);
    res.status(500).json({ message: 'Error fetching todos', error: err.message });
  }
};

// Get a single todo by ID
const getTodoById = async (req, res) => {
  try {
    const { id } = req.params;
    const connection = await pool.getConnection();
    const [todo] = await connection.query('SELECT * FROM todos WHERE id = ?', [id]);
    connection.release();
    
    if (todo.length === 0) {
      return res.status(404).json({ message: 'Todo not found' });
    }
    res.json(todo[0]);
  } catch (err) {
    console.error('Error fetching todo:', err);
    res.status(500).json({ message: 'Error fetching todo', error: err.message });
  }
};

// Create a new todo
const createTodo = async (req, res) => {
  try {
    const { title, description } = req.body;
    
    if (!title) {
      return res.status(400).json({ message: 'Title is required' });
    }

    const connection = await pool.getConnection();
    const [result] = await connection.query(
      'INSERT INTO todos (title, description) VALUES (?, ?)',
      [title, description || '']
    );
    connection.release();

    res.status(201).json({
      id: result.insertId,
      title,
      description: description || '',
      completed: false,
      message: 'Todo created successfully'
    });
  } catch (err) {
    console.error('Error creating todo:', err);
    res.status(500).json({ message: 'Error creating todo', error: err.message });
  }
};

// Update a todo
const updateTodo = async (req, res) => {
  try {
    const { id } = req.params;
    const { title, description, completed } = req.body;

    const connection = await pool.getConnection();
    
    // Check if todo exists
    const [check] = await connection.query('SELECT * FROM todos WHERE id = ?', [id]);
    if (check.length === 0) {
      connection.release();
      return res.status(404).json({ message: 'Todo not found' });
    }

    // Update todo
    await connection.query(
      'UPDATE todos SET title = ?, description = ?, completed = ? WHERE id = ?',
      [title || check[0].title, description !== undefined ? description : check[0].description, completed !== undefined ? completed : check[0].completed, id]
    );
    connection.release();

    res.json({ message: 'Todo updated successfully' });
  } catch (err) {
    console.error('Error updating todo:', err);
    res.status(500).json({ message: 'Error updating todo', error: err.message });
  }
};

// Delete a todo
const deleteTodo = async (req, res) => {
  try {
    const { id } = req.params;
    const connection = await pool.getConnection();
    
    // Check if todo exists
    const [check] = await connection.query('SELECT * FROM todos WHERE id = ?', [id]);
    if (check.length === 0) {
      connection.release();
      return res.status(404).json({ message: 'Todo not found' });
    }

    // Delete todo
    await connection.query('DELETE FROM todos WHERE id = ?', [id]);
    connection.release();

    res.json({ message: 'Todo deleted successfully' });
  } catch (err) {
    console.error('Error deleting todo:', err);
    res.status(500).json({ message: 'Error deleting todo', error: err.message });
  }
};

module.exports = {
  getAllTodos,
  getTodoById,
  createTodo,
  updateTodo,
  deleteTodo
};
