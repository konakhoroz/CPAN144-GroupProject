import { useState } from 'react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';

export default function Goals() {
  const [goals, setGoals] = useState([]);
  const [newGoal, setNewGoal] = useState({ title: '', targetDate: '' });

  const handleAddGoal = (e) => {
    e.preventDefault();
    setGoals([...goals, newGoal]);
    setNewGoal({ title: '', targetDate: '' });
  };

  return (
    <div>
      <Navbar />
      <h2>Study Goals</h2>
      <form onSubmit={handleAddGoal}>
        <input
          type="text"
          placeholder="Goal Title"
          value={newGoal.title}
          onChange={(e) => setNewGoal({ ...newGoal, title: e.target.value })}
        />
        <input
          type="date"
          value={newGoal.targetDate}
          onChange={(e) => setNewGoal({ ...newGoal, targetDate: e.target.value })}
        />
        <button type="submit">Add Goal</button>
      </form>
      <ul>
        {goals.map((goal, index) => (
          <li key={index}>
            <h3>{goal.title}</h3>
            <p>{goal.targetDate}</p>
          </li>
        ))}
      </ul>
      <Footer />
    </div>
  );
}
