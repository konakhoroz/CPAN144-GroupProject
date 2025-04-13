import { useState } from 'react';
import styles from './GoalCard.module.css'; 

export default function GoalCard({ goal }) {
  const [isSelected, setIsSelected] = useState(false);

  const toggleSelection = () => {
    setIsSelected(prevState => !prevState);
  };

  return (
    <div
      className={`${styles['goal-card']} ${isSelected ? styles.selected : ''}`}
      onClick={toggleSelection}
    >
      <h3>{goal.title}</h3>
      <p>Target Date: {goal.targetDate}</p>
      <p>Description: {goal.description}</p>
      <button 
  aria-label={isSelected ? 'Deselect goal' : 'Select goal'}  // Added aria-label for accessibility
>
  {isSelected ? 'Deselect' : 'Select'}
</button>

    </div>
  );
}
