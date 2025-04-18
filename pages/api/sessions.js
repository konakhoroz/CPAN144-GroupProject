// pages/api/sessions.js

let sessions = []; // Store sessions here (in-memory for now)

const generateId = () => Date.now().toString();

// Fetch all sessions
export const fetchAllSessions = async (req, res) => {
  res.status(200).json(sessions);
};

// Fetch a session by ID
export const fetchSessionById = async (req, res) => {
  const { id } = req.query;
  const session = sessions.find((s) => s.id === id);
  if (session) {
    res.status(200).json(session);
  } else {
    res.status(404).json({ message: "Session not found" });
  }
};

// Create a new session
export const createSession = async (req, res) => {
  const newSession = { ...req.body, id: generateId() };
  sessions.push(newSession);
  res.status(201).json(newSession);
};

// Update a session by ID
export const updateSessionById = async (req, res) => {
  const { id } = req.query;
  const { updated } = req.body;

  sessions = sessions.map((s) => (s.id === id ? { ...updated, id } : s));
  res.status(200).json(updated);
};

// Delete a session by ID
export const deleteSessionById = async (req, res) => {
  const { id } = req.query;
  sessions = sessions.filter((s) => s.id !== id);
  res.status(204).end();
};

export default function handler(req, res) {
  switch (req.method) {
    case 'GET':
      if (req.query.id) {
        return fetchSessionById(req, res); // Single session
      }
      return fetchAllSessions(req, res); // All sessions
    case 'POST':
      return createSession(req, res); // Create session
    case 'PUT':
      return updateSessionById(req, res); // Update session
    case 'DELETE':
      return deleteSessionById(req, res); // Delete session
    default:
      res.status(405).json({ message: 'Method Not Allowed' });
  }
}
