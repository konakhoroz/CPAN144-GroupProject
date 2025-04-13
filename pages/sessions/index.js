import { useState, useEffect } from 'react';
import Navbar from '../../components/Navbar';
import Footer from '../../components/Footer';
import SessionCard from '../../components/SessionCard';
import {
  createSession,
  fetchAllSessions,
  deleteSessionById,
  updateSessionById,
} from '../../lib/api';
import { useRouter } from 'next/router';

export default function Sessions() {
  const [sessions, setSessions] = useState([]);
  const [newSession, setNewSession] = useState({ subject: '', duration: '', notes: '' });
  const [editId, setEditId] = useState(null);
  const [editSession, setEditSession] = useState(null);
  const router = useRouter();

  useEffect(() => {
    fetchAllSessions().then(setSessions);
  }, []);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    if (editId !== null && editSession) {
      setEditSession((prev) => ({ ...prev, [name]: value }));
    } else {
      setNewSession((prev) => ({ ...prev, [name]: value }));
    }
  };

  const handleAddSession = async (e) => {
    e.preventDefault();
    if (newSession.subject && newSession.duration && newSession.notes) {
      await createSession(newSession);
      setSessions(await fetchAllSessions());
      setNewSession({ subject: '', duration: '', notes: '' });
    }
  };

  const handleDelete = async (id) => {
    await deleteSessionById(id);
    setSessions(await fetchAllSessions());
  };

  const handleEdit = (id) => {
    const sessionToEdit = sessions.find((s) => s.id === id);
    if (sessionToEdit) {
      setEditId(id);
      setEditSession({ ...sessionToEdit });
    }
  };

  const handleUpdateSession = async () => {
    if (editSession && editId !== null) {
      await updateSessionById(editId, editSession);
      setSessions(await fetchAllSessions());
      setEditId(null);
      setEditSession(null);
    }
  };

  const handleView = (id) => {
    router.push(`/sessions/${id}`);
  };

  const currentSession =
    editId !== null ? editSession || { subject: '', duration: '', notes: '' } : newSession;

  return (
    <div>
      <Navbar />
      <h2>My Study Sessions</h2>

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
        {editId !== null ? (
          <button type="button" onClick={handleUpdateSession}>
            Update Session
          </button>
        ) : (
          <button type="submit">Add Session</button>
        )}
      </form>

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

      <Footer />
    </div>
  );
}
