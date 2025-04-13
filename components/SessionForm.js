// components/SessionForm.js
import { useState } from 'react';

export default function SessionForm({ onAdd }) {
  const [newSession, setNewSession] = useState({
    subject: '',
    duration: '',
    notes: ''
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setNewSession({ ...newSession, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onAdd(newSession);
    setNewSession({ subject: '', duration: '', notes: '' });
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        name="subject"
        placeholder="Subject"
        value={newSession.subject}
        onChange={handleChange}
      />
      <input
        type="text"
        name="duration"
        placeholder="Duration (e.g., 1 hour)"
        value={newSession.duration}
        onChange={handleChange}
      />
      <textarea
        name="notes"
        placeholder="Notes"
        value={newSession.notes}
        onChange={handleChange}
      />
      <button type="submit">Add Session</button>
    </form>
  );
}
