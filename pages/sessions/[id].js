// Import the useRouter hook from Next.js for accessing route parameters
import { useRouter } from 'next/router';
// Import React hooks for managing state and side effects
import { useEffect, useState } from 'react';
// Import dynamic from Next.js to enable code-splitting for components
import dynamic from 'next/dynamic';

// Dynamically import Navbar component with a loading fallback
const Navbar = dynamic(() => import('../../components/Navbar'), {
  loading: () => <p>Loading Navbar...</p>,
});

// Dynamically import Footer component with a loading fallback
const Footer = dynamic(() => import('../../components/Footer'), {
  loading: () => <p>Loading Footer...</p>,
});

// Import custom CSS module for styling
import styles from './SessionDetail.module.css'; // Keep this as is

// Main functional component for displaying session details
export default function SessionDetail() {
  const router = useRouter(); // Access the router object
  const { id } = router.query; // Extract 'id' parameter from the route

  const [session, setSession] = useState(null); // State to hold session data

  // Fetch session details when 'id' is available
  useEffect(() => {
    const fetchSessionById = async () => {
      const response = await fetch(`/api/sessions?id=${id}`); // Call API endpoint with query param
      const data = await response.json(); // Parse the response as JSON
      setSession(data); // Update state with session data
    };

    if (id) {
      fetchSessionById(); // Call the fetch function if 'id' is present
    }
  }, [id]); // Re-run effect whenever 'id' changes

  // Display loading message until session data is fetched
  if (!session) return <p>Loading...</p>;

  return (
    <div>
      <Navbar /> {/* Display the Navbar component */}

      {/* Here we add some custom styling */}
      <div className={styles.detailsContainer}>
        <h2 className={styles.sessionTitle}>{session.subject}</h2> {/* Display session title */}
        <p>
          <strong>Duration:</strong>{' '}
          <span className={styles.duration}>{session.duration}</span> {/* Display session duration */}
        </p>
        <p>
          <strong>Notes:</strong>{' '}
          <span className={styles.notes}>{session.notes}</span> {/* Display session notes */}
        </p>
      </div>

      <Footer /> {/* Display the Footer component */}
    </div>
  );
}
