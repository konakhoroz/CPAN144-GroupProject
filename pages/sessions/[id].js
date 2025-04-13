import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import Navbar from '../../components/Navbar';
import Footer from '../../components/Footer';
import { fetchSessionById } from '../../lib/api';
import styles from './SessionDetail.module.css'; // Import your CSS module for styling

export default function SessionDetail() {
  const router = useRouter();
  const { id } = router.query;

  const [session, setSession] = useState(null);

  useEffect(() => {
    if (id) {
      fetchSessionById(id).then(setSession);
    }
  }, [id]);

  if (!session) return <p>Loading...</p>;

  return (
    <div>
      <Navbar />
      
      
      {/* Here we add some custom styling */}
      <div className={styles.detailsContainer}>
      <h2 className={styles.sessionTitle}> {session.subject}</h2>
        <p><strong>Duration:</strong> <span className={styles.duration}>{session.duration}</span></p>
        <p><strong>Notes:</strong> <span className={styles.notes}>{session.notes}</span></p>
      </div>
      
      <Footer />
    </div>
  );
}
