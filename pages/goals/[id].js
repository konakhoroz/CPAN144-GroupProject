import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import Navbar from '../../components/Navbar';
import Footer from '../../components/Footer';
import { fetchGoalById } from '../../lib/api';
import styles from './GoalDetail.module.css'; // Import the updated CSS module

export default function GoalDetail() {
  const router = useRouter();
  const { id } = router.query;

  const [goal, setGoal] = useState(null);

  useEffect(() => {
    if (id) {
      fetchGoalById(id).then(setGoal);
    }
  }, [id]);

  if (!goal) return <p>Loading...</p>;

  return (
    <div>
      <Navbar />
      
      <div className={styles.detailsContainer}>
      <h2 className={styles.goalTitle}>{goal.title}</h2>
        <p><strong>Target Date:</strong> <span className={styles.targetDate}>{goal.targetDate}</span> </p>
        <p className={styles.goalDescription}>{goal.description}</p>
      </div>
      <Footer />
    </div>
  );
}
