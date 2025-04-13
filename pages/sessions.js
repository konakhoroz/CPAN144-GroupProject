import { useState } from 'react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';

export default function Sessions() {
  const [sessions, setSessions] = useState([]);
  const [newSession, setNewSession] = useState({ subject: '', duration: '', notes: '' });

  const handleAddSession = (e) => {
    e.preventDefault();
    setSessions([...sessions, newSession]);
    setNewSession({ subject: '', duration: '', notes: '' });
  };

  return (
    <div>
      <Navbar />
      <h2>My Study Sessions</h2>
      <form onSubmit={handleAddSession}>
        <input
          type="text"
          placeholder="Subject"
          value={newSession.subject}
          onChange={(e) => setNewSession({ ...newSession, subject: e.target.value })}
        />
        <input
          type="text"
          placeholder="Duration (e.g. 1h)"
          value={newSession.duration}
          onChange={(e) => setNewSession({ ...newSession, duration: e.target.value })}
        />
        <textarea
          placeholder="Notes"
          value={newSession.notes}
          onChange={(e) => setNewSession({ ...newSession, notes: e.target.value })}
        ></textarea>
        <button type="submit">Add Session</button>
      </form>
      <ul>
        {sessions.map((session, index) => (
          <li key={index}>
            <h3>{session.subject}</h3>
            <p>{session.duration}</p>
            <p>{session.notes}</p>
          </li>
        ))}
      </ul>
      <Footer />
    </div>
  );
}
