import { useState, useEffect } from 'react';
import './App.css';

const API_BASE_URL = 'http://localhost:5000/api';

function App() {
  const [todos, setTodos] = useState([]);
  const [input, setInput] = useState('');
  const [description, setDescription] = useState('');
  const [editingId, setEditingId] = useState(null);
  const [editTitle, setEditTitle] = useState('');
  const [editDescription, setEditDescription] = useState('');
  const [loading, setLoading] = useState(false);

  // Fetch all todos
  useEffect(() => {
    fetchTodos();
  }, []);

  const fetchTodos = async () => {
    try {
      setLoading(true);
      const response = await fetch(`${API_BASE_URL}/todos`);
      const data = await response.json();
      setTodos(data);
    } catch (err) {
      console.error('Error fetching todos:', err);
      alert('Error loading todos');
    } finally {
      setLoading(false);
    }
  };

  // Create todo
  const handleAddTodo = async (e) => {
    e.preventDefault();
    
    if (!input.trim()) {
      alert('Please enter a todo title');
      return;
    }

    try {
      const response = await fetch(`${API_BASE_URL}/todos`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          title: input,
          description: description
        })
      });

      if (response.ok) {
        const newTodo = await response.json();
        setTodos([{ ...newTodo, completed: false }, ...todos]);
        setInput('');
        setDescription('');
      } else {
        alert('Error creating todo');
      }
    } catch (err) {
      console.error('Error creating todo:', err);
      alert('Error creating todo');
    }
  };

  // Update todo
  const handleUpdateTodo = async (id) => {
    try {
      const response = await fetch(`${API_BASE_URL}/todos/${id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          title: editTitle,
          description: editDescription
        })
      });

      if (response.ok) {
        setTodos(todos.map(todo =>
          todo.id === id
            ? { ...todo, title: editTitle, description: editDescription }
            : todo
        ));
        setEditingId(null);
        setEditTitle('');
        setEditDescription('');
      } else {
        alert('Error updating todo');
      }
    } catch (err) {
      console.error('Error updating todo:', err);
      alert('Error updating todo');
    }
  };

  // Toggle todo completion
  const handleToggleTodo = async (id, completed) => {
    try {
      const todo = todos.find(t => t.id === id);
      const response = await fetch(`${API_BASE_URL}/todos/${id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          completed: !completed
        })
      });

      if (response.ok) {
        setTodos(todos.map(t =>
          t.id === id ? { ...t, completed: !completed } : t
        ));
      } else {
        alert('Error updating todo');
      }
    } catch (err) {
      console.error('Error toggling todo:', err);
      alert('Error updating todo');
    }
  };

  // Delete todo
  const handleDeleteTodo = async (id) => {
    if (!confirm('Are you sure you want to delete this todo?')) return;

    try {
      const response = await fetch(`${API_BASE_URL}/todos/${id}`, {
        method: 'DELETE'
      });

      if (response.ok) {
        setTodos(todos.filter(todo => todo.id !== id));
      } else {
        alert('Error deleting todo');
      }
    } catch (err) {
      console.error('Error deleting todo:', err);
      alert('Error deleting todo');
    }
  };

  const startEditing = (todo) => {
    setEditingId(todo.id);
    setEditTitle(todo.title);
    setEditDescription(todo.description || '');
  };

  const cancelEditing = () => {
    setEditingId(null);
    setEditTitle('');
    setEditDescription('');
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 py-8 px-4">
      <div className="max-w-2xl mx-auto">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-gray-800 mb-2">My Todo List</h1>
          <p className="text-gray-600">Stay organized and productive</p>
        </div>

        {/* Add Todo Form */}
        <form
          onSubmit={handleAddTodo}
          className="bg-white rounded-lg shadow-lg p-6 mb-8"
        >
          <div className="mb-4">
            <input
              type="text"
              placeholder="Add a new todo..."
              value={input}
              onChange={(e) => setInput(e.target.value)}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>
          <div className="mb-4">
            <textarea
              placeholder="Add description (optional)"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none"
              rows="3"
            />
          </div>
          <button
            type="submit"
            className="w-full bg-blue-500 hover:bg-blue-600 text-white font-bold py-3 rounded-lg transition duration-200"
          >
            Add Todo
          </button>
        </form>

        {/* Loading State */}
        {loading && (
          <div className="text-center py-8">
            <p className="text-gray-600">Loading todos...</p>
          </div>
        )}

        {/* Todos List */}
        {!loading && todos.length === 0 && (
          <div className="bg-white rounded-lg shadow-lg p-8 text-center">
            <p className="text-gray-500 text-lg">No todos yet. Create one to get started!</p>
          </div>
        )}

        {!loading && todos.length > 0 && (
          <div className="space-y-4">
            {todos.map((todo) => (
              <div
                key={todo.id}
                className="bg-white rounded-lg shadow-md p-4 hover:shadow-lg transition duration-200"
              >
                {editingId === todo.id ? (
                  // Edit Mode
                  <div className="space-y-3">
                    <input
                      type="text"
                      value={editTitle}
                      onChange={(e) => setEditTitle(e.target.value)}
                      className="w-full px-3 py-2 border border-blue-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                    <textarea
                      value={editDescription}
                      onChange={(e) => setEditDescription(e.target.value)}
                      className="w-full px-3 py-2 border border-blue-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none"
                      rows="2"
                    />
                    <div className="flex gap-2">
                      <button
                        onClick={() => handleUpdateTodo(todo.id)}
                        className="flex-1 bg-green-500 hover:bg-green-600 text-white font-bold py-2 rounded-lg transition duration-200"
                      >
                        Save
                      </button>
                      <button
                        onClick={cancelEditing}
                        className="flex-1 bg-gray-400 hover:bg-gray-500 text-white font-bold py-2 rounded-lg transition duration-200"
                      >
                        Cancel
                      </button>
                    </div>
                  </div>
                ) : (
                  // View Mode
                  <div>
                    <div className="flex items-start gap-3">
                      <input
                        type="checkbox"
                        checked={todo.completed || false}
                        onChange={() => handleToggleTodo(todo.id, todo.completed)}
                        className="mt-1 w-5 h-5 text-blue-500 rounded focus:ring-2 focus:ring-blue-500 cursor-pointer"
                      />
                      <div className="flex-1">
                        <h3
                          className={`text-lg font-semibold ${
                            todo.completed
                              ? 'text-gray-400 line-through'
                              : 'text-gray-800'
                          }`}
                        >
                          {todo.title}
                        </h3>
                        {todo.description && (
                          <p
                            className={`text-sm mt-1 ${
                              todo.completed
                                ? 'text-gray-300 line-through'
                                : 'text-gray-600'
                            }`}
                          >
                            {todo.description}
                          </p>
                        )}
                      </div>
                    </div>
                    <div className="flex gap-2 mt-3">
                      <button
                        onClick={() => startEditing(todo)}
                        className="flex-1 bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 rounded-lg transition duration-200"
                      >
                        Edit
                      </button>
                      <button
                        onClick={() => handleDeleteTodo(todo.id)}
                        className="flex-1 bg-red-500 hover:bg-red-600 text-white font-bold py-2 rounded-lg transition duration-200"
                      >
                        Delete
                      </button>
                    </div>
                  </div>
                )}
              </div>
            ))}
          </div>
        )}

        {/* Stats */}
        {todos.length > 0 && (
          <div className="mt-8 bg-white rounded-lg shadow-lg p-4 text-center">
            <p className="text-gray-600">
              Total: {todos.length} | Completed: {todos.filter(t => t.completed).length} | 
              Pending: {todos.filter(t => !t.completed).length}
            </p>
          </div>
        )}
      </div>
    </div>
  );
}

export default App
