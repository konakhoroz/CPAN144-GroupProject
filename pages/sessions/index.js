// Import React hooks and Next.js tools
import { useState, useEffect } from 'react';
import dynamic from 'next/dynamic';
import { useRouter } from 'next/router';

// Dynamically import the Navbar component with a loading fallback
const Navbar = dynamic(() => import('../../components/Navbar'), {
  loading: () => <p>Loading Navbar...</p>,
});

// Dynamically import the Footer component with a loading fallback
const Footer = dynamic(() => import('../../components/Footer'), {
  loading: () => <p>Loading Footer...</p>,
});

// Dynamically import the SessionCard component with a loading fallback
const SessionCard = dynamic(() => import('../../components/SessionCard'), {
  loading: () => <p>Loading Session Card...</p>,
});

// Main Sessions component
export default function Sessions() {
  const [sessions, setSessions] = useState([]); // State to store all sessions
  const [newSession, setNewSession] = useState({ subject: '', duration: '', notes: '' }); // State for creating a new session
  const [editId, setEditId] = useState(null); // State to hold the ID of the session being edited
  const [editSession, setEditSession] = useState(null); // State to hold the values of the session being edited
  const router = useRouter(); // Router instance for navigation

  // Fetch all sessions on initial render
  useEffect(() => {
    const fetchSessions = async () => {
      const response = await fetch('/api/sessions');
      const data = await response.json();
      setSessions(data); // Update sessions state with fetched data
    };

    fetchSessions();
  }, []);

  // Handle form input changes for both creating and editing sessions
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    if (editId !== null && editSession) {
      // Update editSession if we're in edit mode
      setEditSession((prev) => ({ ...prev, [name]: value }));
    } else {
      // Otherwise, update the new session state
      setNewSession((prev) => ({ ...prev, [name]: value }));
    }
  };

  // Handle adding a new session
  const handleAddSession = async (e) => {
    e.preventDefault();
    if (newSession.subject && newSession.duration && newSession.notes) {
      await fetch('/api/sessions', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(newSession), // Send new session data
      });
      // Fetch updated sessions list
      const response = await fetch('/api/sessions');
      const data = await response.json();
      setSessions(data); // Update session list
      setNewSession({ subject: '', duration: '', notes: '' }); // Clear form
    }
  };

  // Handle deleting a session
  const handleDelete = async (id) => {
    await fetch(`/api/sessions?id=${id}`, {
      method: 'DELETE',
    });
    // Refresh sessions after deletion
    const response = await fetch('/api/sessions');
    const data = await response.json();
    setSessions(data);
  };

  // Handle clicking the edit button
  const handleEdit = (id) => {
    const sessionToEdit = sessions.find((s) => s.id === id);
    if (sessionToEdit) {
      setEditId(id); // Set the ID of the session being edited
      setEditSession({ ...sessionToEdit }); // Pre-fill the form with session data
    }
  };

  // Handle updating a session after editing
  const handleUpdateSession = async () => {
    if (editSession && editId !== null) {
      await fetch(`/api/sessions?id=${editId}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(editSession), // Send updated session data
      });
      // Refresh sessions list
      const response = await fetch('/api/sessions');
      const data = await response.json();
      setSessions(data); // Update state
      setEditId(null); // Exit edit mode
      setEditSession(null);
    }
  };

  // Navigate to the session detail page
  const handleView = (id) => {
    router.push(`/sessions/${id}`);
  };

  // Determine whether to use the new session or the one being edited
  const currentSession =
    editId !== null ? editSession || { subject: '', duration: '', notes: '' } : newSession;

  return (
    <div>
      <Navbar /> {/* Render Navbar */}
      <h2>My Study Sessions</h2>

      {/* Form for adding or editing a session */}
      <form onSubmit={handleAddSession}>
        <input
          name="subject"
          value={currentSession.subject}
          onChange={handleInputChange}
          placeholder="Subject"
        />
        <input
          name="duration"
          value={currentSession.duration}
          onChange={handleInputChange}
          placeholder="Duration"
        />
        <textarea
          name="notes"
          value={currentSession.notes}
          onChange={handleInputChange}
          placeholder="Notes"
        />
        {/* Show appropriate button depending on whether we are editing or adding */}
        {editId !== null ? (
          <button type="button" onClick={handleUpdateSession}>
            Update Session
          </button>
        ) : (
          <button type="submit">Add Session</button>
        )}
      </form>

      {/* Display each session using the SessionCard component */}
      <div>
        {sessions.map((session) => (
          <div key={session.id}>
            <SessionCard session={session} />
            <button onClick={() => handleView(session.id)}>View Session</button>
            <button onClick={() => handleEdit(session.id)}>Edit</button>
            <button onClick={() => handleDelete(session.id)}>Delete</button>
          </div>
        ))}
      </div>

      <Footer /> {/* Render Footer */}
    </div>
  );
}
