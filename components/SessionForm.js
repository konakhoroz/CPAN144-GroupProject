import { useState } from 'react';

export default function SessionForm({ onAdd }) {
  // State to store the input values for subject, duration, and notes
  const [newSession, setNewSession] = useState({
    subject: '',
    duration: '',
    notes: ''
  });

  // Handles input changes and updates the corresponding field in state
  const handleChange = (e) => {
    const { name, value } = e.target;
    setNewSession({ ...newSession, [name]: value });
  };

  // Handles form submission, prevents default behavior, and calls onAdd with the new session data
  const handleSubmit = (e) => {
    e.preventDefault();
    onAdd(newSession); // Passes the session data to the parent component
    setNewSession({ subject: '', duration: '', notes: '' }); // Clears the form fields after submission
  };

  return (
    <form onSubmit={handleSubmit}>
      {/* Input for the subject of the session */}
      <input
        type="text"
        name="subject"
        placeholder="Subject"
        value={newSession.subject}
        onChange={handleChange}
      />
      {/* Input for the duration of the session */}
      <input
        type="text"
        name="duration"
        placeholder="Duration (e.g., 1 hour)"
        value={newSession.duration}
        onChange={handleChange}
      />
      {/* Textarea for notes related to the session */}
      <textarea
        name="notes"
        placeholder="Notes"
        value={newSession.notes}
        onChange={handleChange}
      />
      {/* Button to submit the form and add a session */}
      <button type="submit">Add Session</button>
    </form>
  );
}
