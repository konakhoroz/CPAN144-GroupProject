// This is the second phase of migration (first one being lib/api.js), 
// lib/api.js used in memory storage (literal simple in-file arrays [])and did not persist after reloads
// This one moved onto actual real Next.js api but the memory was still using 
// in memory arrays as you see "let sessions = []", but the true sessions.js
// now uses a full on sessions.json file that is file based (kind of almost
// like database based) 


let sessions = []; // Store sessions here (in-memory for now)

const generateId = () => Date.now().toString(); // Helper function to generate unique IDs based on the current timestamp

// Fetch all sessions
export const fetchAllSessions = async (req, res) => {
  res.status(200).json(sessions); // Respond with the list of all sessions
};

// Fetch a session by ID
export const fetchSessionById = async (req, res) => {
  const { id } = req.query; // Extract the session ID from the request query
  const session = sessions.find((s) => s.id === id); // Search for the session by its ID
  if (session) {
    res.status(200).json(session); // If session is found, return it
  } else {
    res.status(404).json({ message: "Session not found" }); // If not found, return an error
  }
};

// Create a new session
export const createSession = async (req, res) => {
  const newSession = { ...req.body, id: generateId() }; // Generate a new session with the data from the request body and a unique ID
  sessions.push(newSession); // Add the new session to the in-memory sessions array
  res.status(201).json(newSession); // Respond with the newly created session
};

// Update a session by ID
export const updateSessionById = async (req, res) => {
  const { id } = req.query; // Extract the session ID from the request query
  const updated = req.body; // Get the updated session data from the request body

  sessions = sessions.map((s) => (s.id === id ? { ...updated, id } : s)); // Update the session in the array with the new data
  res.status(200).json(updated); // Respond with the updated session data
};

// Delete a session by ID
export const deleteSessionById = async (req, res) => {
  const { id } = req.query; // Extract the session ID from the request query
  sessions = sessions.filter((s) => s.id !== id); // Filter out the session with the specified ID
  res.status(204).end(); // No content response after successful deletion
};

// Main API handler that routes to specific methods based on HTTP request
export default function handler(req, res) {
  switch (req.method) {
    case 'GET':
      if (req.query.id) {
        return fetchSessionById(req, res); // If an ID is provided, fetch a single session
      }
      return fetchAllSessions(req, res); // Otherwise, fetch all sessions
    case 'POST':
      return createSession(req, res); // Handle creation of a new session
    case 'PUT':
      return updateSessionById(req, res); // Handle updating an existing session by ID
    case 'DELETE':
      return deleteSessionById(req, res); // Handle deletion of a session by ID
    default:
      res.status(405).json({ message: 'Method Not Allowed' }); // If the method is not recognized, return a 405 error
  }
}
