import { useState } from 'react'; // Importing useState hook to manage component state
import styles from './SessionCard.module.css'; // Importing styles for the session card component; CSS modules

export default function SessionCard({ session }) {
  // State to track whether the session card is selected or not
  const [isSelected, setIsSelected] = useState(false);

  // Function to toggle the selection state
  const toggleSelection = () => {
    setIsSelected(prevState => !prevState); // Toggles the selection between true and false
  };

  return (
    <div
      className={`${styles['session-card']} ${isSelected ? styles.selected : ''}`} // Combines base styles with 'selected' style if active
      onClick={toggleSelection} // Triggers toggleSelection on click
    >
      <h3>{session.subject}</h3> {/* Displays the subject of the session */}
      <p>Duration: {session.duration}</p> {/* Displays the duration of the session */}
      <p>Notes: {session.notes}</p> {/* Displays the notes for the session */}
      <button>{isSelected ? 'Deselect' : 'Select'}</button> {/* Button to toggle selection state */}
    </div>
  );
}
