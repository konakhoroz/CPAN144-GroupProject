import { useState } from 'react';

export default function GoalForm({ onAdd }) {
  // State to track the new goal being added (title, target date, and description)
  const [newGoal, setNewGoal] = useState({
    title: '',
    targetDate: '',
    description: ''
  });

  // Handles input changes to update the state of the new goal
  const handleChange = (e) => {
    const { name, value } = e.target; // Destructures the input field name and value
    setNewGoal({ ...newGoal, [name]: value }); // Updates the respective field in the goal state
  };

  // Handles form submission, adds new goal, and resets the form fields
  const handleSubmit = (e) => {
    e.preventDefault(); // Prevents the default form submission behavior
    onAdd(newGoal);  // Passes the new goal to the parent component for adding to the list
    setNewGoal({ title: '', targetDate: '', description: '' }); // Resets form fields after submitting
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        name="title"
        placeholder="Goal Title"
        value={newGoal.title} // Binds input value to the goal title state
        onChange={handleChange} // Triggers handleChange on input change
      />
      <input
        type="date"
        name="targetDate"
        value={newGoal.targetDate} // Binds input value to the goal target date state
        onChange={handleChange} // Triggers handleChange on input change
      />
      <textarea
        name="description"
        placeholder="Goal Description"
        value={newGoal.description} // Binds input value to the goal description state
        onChange={handleChange} // Triggers handleChange on textarea change
      />
      <button type="submit">Add Goal</button> {/* Submits the form to add the new goal */}
    </form>
  );
}
