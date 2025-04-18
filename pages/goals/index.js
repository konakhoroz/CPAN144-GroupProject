import { useState, useEffect } from 'react';
import dynamic from 'next/dynamic';

// Dynamically import Navbar with fallback loading message
const Navbar = dynamic(() => import('../../components/Navbar'), {
  loading: () => <p>Loading Navbar...</p>,
});

// Dynamically import Footer with fallback loading message
const Footer = dynamic(() => import('../../components/Footer'), {
  loading: () => <p>Loading Footer...</p>,
});

// Dynamically import GoalCard component for individual goal display
const GoalCard = dynamic(() => import('../../components/GoalCard'), {
  loading: () => <p>Loading Goal Card...</p>,
});

import { useRouter } from 'next/router'; // For navigation to individual goal pages

export default function Goals() {
  // State to hold all goal records
  const [goals, setGoals] = useState([]);

  // State to hold values for a new goal
  const [newGoal, setNewGoal] = useState({ title: '', description: '', targetDate: '' });

  // State to keep track of the currently edited goal's ID
  const [editId, setEditId] = useState(null);

  // State to hold the goal currently being edited
  const [editGoal, setEditGoal] = useState(null);

  const router = useRouter();

  // Fetch all goals from the API and update state
  const fetchAllGoals = async () => {
    const response = await fetch('/api/goals');
    const data = await response.json();
    setGoals(data);
  };

  // Initial fetch when component mounts
  useEffect(() => {
    fetchAllGoals();
  }, []);

  // Handle form input changes for both add and edit modes
  const handleInputChange = (e) => {
    const { name, value } = e.target;

    // If editing, update editGoal
    if (editId !== null && editGoal) {
      setEditGoal((prev) => ({ ...prev, [name]: value }));
    } else {
      // Otherwise, update newGoal
      setNewGoal((prev) => ({ ...prev, [name]: value }));
    }
  };

  // Submit new goal to API
  const handleAddGoal = async (e) => {
    e.preventDefault();

    // Only proceed if all fields are filled
    if (newGoal.title && newGoal.description && newGoal.targetDate) {
      const response = await fetch('/api/goals', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(newGoal),
      });

      // On success, refetch goals and clear form
      if (response.ok) {
        await fetchAllGoals();
        setNewGoal({ title: '', description: '', targetDate: '' });
      }
    }
  };

  // Delete a goal by ID
  const handleDelete = async (id) => {
    await fetch(`/api/goals?id=${id}`, {
      method: 'DELETE',
    });
    await fetchAllGoals(); // Refresh goal list
  };

  // Set a goal into edit mode
  const handleEdit = (id) => {
    const goalToEdit = goals.find((g) => g.id === id);
    if (goalToEdit) {
      setEditId(id);
      setEditGoal({ ...goalToEdit });
    }
  };

  // Send updated goal data to API
  const handleUpdateGoal = async () => {
    if (editGoal && editId !== null) {
      await fetch(`/api/goals?id=${editId}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(editGoal),
      });

      // Reset edit states and refetch goals
      await fetchAllGoals();
      setEditId(null);
      setEditGoal(null);
    }
  };

  // Navigate to detail view for a single goal
  const handleView = (id) => {
    router.push(`/goals/${id}`);
  };

  // Determine which goal object to use in form inputs
  const currentGoal =
    editId !== null ? editGoal || { title: '', description: '', targetDate: '' } : newGoal;

  return (
    <div>
      <Navbar />
      <h2>My Goals</h2>

      {/* Goal creation/edit form */}
      <form onSubmit={handleAddGoal}>
        <input
          name="title"
          value={currentGoal.title}
          onChange={handleInputChange}
          placeholder="Goal Title"
        />
        <input
          type="date"
          name="targetDate"
          value={currentGoal.targetDate}
          onChange={handleInputChange}
          placeholder="Target Date"
        />
        <textarea
          name="description"
          value={currentGoal.description}
          onChange={handleInputChange}
          placeholder="Goal Description"
        />

        {/* Switch between Add and Update based on edit mode */}
        {editId !== null ? (
          <button type="button" onClick={handleUpdateGoal}>
            Update Goal
          </button>
        ) : (
          <button type="submit">Add Goal</button>
        )}
      </form>

      {/* Render all goals */}
      <div>
        {goals.map((goal) => (
          <div key={goal.id}>
            <GoalCard goal={goal} />
            <button onClick={() => handleView(goal.id)}>View Goal</button>
            <button onClick={() => handleEdit(goal.id)}>Edit</button>
            <button onClick={() => handleDelete(goal.id)}>Delete</button>
          </div>
        ))}
      </div>

      <Footer />
    </div>
  );
}
