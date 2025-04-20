import { useRouter } from 'next/router'; // Next.js router for accessing dynamic route parameters
import { useEffect, useState } from 'react'; // React hooks for managing side effects and state
import dynamic from 'next/dynamic'; // Next.js dynamic import for code splitting

// Dynamically import Navbar component with a loading fallback
const Navbar = dynamic(() => import('../../components/Navbar'), {
  loading: () => <p>Loading Navbar...</p>,
});

// Dynamically import Footer component with a loading fallback
const Footer = dynamic(() => import('../../components/Footer'), {
  loading: () => <p>Loading Footer...</p>,
});

import styles from './GoalDetail.module.css'; // Import CSS module for styling this component

export default function GoalDetail() {
  const router = useRouter(); // Get access to route object
  const { id } = router.query; // Extract the 'id' parameter from the URL query

  const [goal, setGoal] = useState(null); // State to store goal data

  // useEffect to fetch goal data when the component mounts or when 'id' changes
  useEffect(() => {
    if (id) {
      const fetchGoal = async () => {
        const response = await fetch(`/api/goals?id=${id}`); // API call to fetch goal by ID
        if (response.ok) {
          const data = await response.json(); // Parse response JSON
          setGoal(data); // Update state with goal data
        }
      };
      fetchGoal(); // Invoke the asynchronous function
    }
  }, [id]); // Dependency array: re-run when 'id' changes

  // If the goal hasn't loaded yet, show a loading message
  if (!goal) return <p>Loading...</p>;

  // Render the goal details once data is available
  return (
    <div>
      <Navbar /> {/* Navigation bar at the top */}

      <div className={styles.detailsContainer}> {/* Styled container for goal details */}
        <h2 className={styles.goalTitle}>{goal.title}</h2> {/* Goal title */}
        <p>
          <strong>Target Date:</strong>{' '}
          <span className={styles.targetDate}>{goal.targetDate}</span> {/* Display target date */}
        </p>
        <p className={styles.goalDescription}>{goal.description}</p> {/* Goal description */}
      </div>

      <Footer /> {/* Footer component */}
    </div>
  );
}
