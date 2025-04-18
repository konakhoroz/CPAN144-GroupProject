import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import dynamic from 'next/dynamic';

const Navbar = dynamic(() => import('../../components/Navbar'), {
  loading: () => <p>Loading Navbar...</p>,
});

const Footer = dynamic(() => import('../../components/Footer'), {
  loading: () => <p>Loading Footer...</p>,
});

import styles from './GoalDetail.module.css'; // Keep this as is

export default function GoalDetail() {
  const router = useRouter();
  const { id } = router.query;

  const [goal, setGoal] = useState(null);

  useEffect(() => {
    if (id) {
      const fetchGoal = async () => {
        const response = await fetch(`/api/goals?id=${id}`);
        if (response.ok) {
          const data = await response.json();
          setGoal(data);
        }
      };
      fetchGoal();
    }
  }, [id]);

  if (!goal) return <p>Loading...</p>;

  return (
    <div>
      <Navbar />

      <div className={styles.detailsContainer}>
        <h2 className={styles.goalTitle}>{goal.title}</h2>
        <p>
          <strong>Target Date:</strong>{' '}
          <span className={styles.targetDate}>{goal.targetDate}</span>
        </p>
        <p className={styles.goalDescription}>{goal.description}</p>
      </div>

      <Footer />
    </div>
  );
}
