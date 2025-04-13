import { useState } from 'react';
import styles from './SessionCard.module.css'; 

export default function SessionCard({ session }) {
  const [isSelected, setIsSelected] = useState(false);

  const toggleSelection = () => {
    setIsSelected(prevState => !prevState);
  };

  return (
    <div
      className={`${styles['session-card']} ${isSelected ? styles.selected : ''}`}
      onClick={toggleSelection}
    >
      <h3>{session.subject}</h3>
      <p>Duration: {session.duration}</p>
      <p>Notes: {session.notes}</p>
      <button>{isSelected ? 'Deselect' : 'Select'}</button>
    </div>
  );
}
