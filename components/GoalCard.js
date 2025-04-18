import { useState } from 'react';
import styles from './GoalCard.module.css'; // CSS module scoped to this component

// GoalCard - displays info about a single goal and lets user select/deselect it
export default function GoalCard({ goal }) {
  const [isSelected, setIsSelected] = useState(false); // tracks whether the card is selected

  const toggleSelection = () => {
    // toggles the isSelected state between true and false
    setIsSelected(prevState => !prevState);
  };

  return (
    <div
      // combines base card style with 'selected' style if it's active
      className={`${styles['goal-card']} ${isSelected ? styles.selected : ''}`}
      onClick={toggleSelection} // clicking the card toggles selection state
    >
      <h3>{goal.title}</h3> {/* displays the goal's title */}
      <p>Target Date: {goal.targetDate}</p> {/* shows target completion date */}
      <p>Description: {goal.description}</p> {/* shows the goal's description */}
      <button 
        aria-label={isSelected ? 'Deselect goal' : 'Select goal'} // accessible label for screen readers
      >
        {isSelected ? 'Deselect' : 'Select'} {/* changes text based on state */}
      </button>
    </div>
  );
}
