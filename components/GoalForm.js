// components/GoalForm.js
import { useState } from 'react';

export default function GoalForm({ onAdd }) {
  const [newGoal, setNewGoal] = useState({
    title: '',
    targetDate: '',
    description: ''
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setNewGoal({ ...newGoal, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onAdd(newGoal);  // Pass the new goal data to the parent component
    setNewGoal({ title: '', targetDate: '', description: '' }); // Reset form fields after submission
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        name="title"
        placeholder="Goal Title"
        value={newGoal.title}
        onChange={handleChange}
      />
      <input
        type="date"
        name="targetDate"
        value={newGoal.targetDate}
        onChange={handleChange}
      />
      <textarea
        name="description"
        placeholder="Goal Description"
        value={newGoal.description}
        onChange={handleChange}
      />
      <button type="submit">Add Goal</button>
    </form>
  );
}
