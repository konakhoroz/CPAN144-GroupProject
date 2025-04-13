import { useState, useEffect } from 'react';
import Navbar from '../../components/Navbar';
import Footer from '../../components/Footer';
import GoalCard from '../../components/GoalCard';
import {
  createGoal,
  fetchAllGoals,
  deleteGoalById,
  updateGoalById,
} from '../../lib/api';
import { useRouter } from 'next/router';

export default function Goals() {
  const [goals, setGoals] = useState([]);
  const [newGoal, setNewGoal] = useState({ title: '', description: '', targetDate: '' });
  const [editId, setEditId] = useState(null);
  const [editGoal, setEditGoal] = useState(null);
  const router = useRouter();

  useEffect(() => {
    fetchAllGoals().then(setGoals);
  }, []);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    if (editId !== null && editGoal) {
      setEditGoal((prev) => ({ ...prev, [name]: value }));
    } else {
      setNewGoal((prev) => ({ ...prev, [name]: value }));
    }
  };

  const handleAddGoal = async (e) => {
    e.preventDefault();
    if (newGoal.title && newGoal.description && newGoal.targetDate) {
      await createGoal(newGoal);
      setGoals(await fetchAllGoals());
      setNewGoal({ title: '', description: '', targetDate: '' });
    }
  };

  const handleDelete = async (id) => {
    await deleteGoalById(id);
    setGoals(await fetchAllGoals());
  };

  const handleEdit = (id) => {
    const goalToEdit = goals.find((g) => g.id === id);
    if (goalToEdit) {
      setEditId(id);
      setEditGoal({ ...goalToEdit });
    }
  };

  const handleUpdateGoal = async () => {
    if (editGoal && editId !== null) {
      await updateGoalById(editId, editGoal);
      setGoals(await fetchAllGoals());
      setEditId(null);
      setEditGoal(null);
    }
  };

  const handleView = (id) => {
    router.push(`/goals/${id}`);
  };

  const currentGoal = editId !== null ? editGoal || { title: '', description: '', targetDate: '' } : newGoal;

  return (
    <div>
      <Navbar />
      <h2>My Goals</h2>

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
        {editId !== null ? (
          <button type="button" onClick={handleUpdateGoal}>
            Update Goal
          </button>
        ) : (
          <button type="submit">Add Goal</button>
        )}
      </form>

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
