import fs from 'fs';
import path from 'path';

const sessionsFilePath = path.resolve(process.cwd(), 'sessions.json'); // Path to your sessions.json file

// Helper function to read sessions from the JSON file
const readSessions = () => {
  try {
    const data = fs.readFileSync(sessionsFilePath); // Read the file synchronously
    return JSON.parse(data); // Parse and return the data as an object
  } catch (error) {
    console.error("Error reading sessions file", error);
    return []; // If the file doesn't exist or there's an error, return an empty array
  }
};

// Helper function to write sessions to the JSON file
const writeSessions = (sessions) => {
  try {
    fs.writeFileSync(sessionsFilePath, JSON.stringify(sessions, null, 2)); // Write sessions to file
  } catch (error) {
    console.error("Error writing to sessions file", error);
  }
};

// Utility to generate a unique ID
const generateId = () => Date.now().toString();

// --- Sessions API Endpoints ---

// Fetch all sessions
export const fetchAllSessions = async (req, res) => {
  const sessions = readSessions(); // Get sessions from the file
  res.status(200).json(sessions); // Send the sessions as a JSON response
};

// Fetch a session by ID
export const fetchSessionById = async (req, res) => {
  const { id } = req.query; // Extract the session ID from the request query
  const sessions = readSessions(); // Get sessions from the file
  const session = sessions.find((s) => s.id === id); // Find the session by ID
  if (session) {
    res.status(200).json(session); // If session is found, return it
  } else {
    res.status(404).json({ message: "Session not found" }); // If not found, return an error
  }
};

// Create a new session
export const createSession = async (req, res) => {
  const newSession = { ...req.body, id: generateId() }; // Generate a new session with the request data and a unique ID
  const sessions = readSessions(); // Get the current sessions
  sessions.push(newSession); // Add the new session
  writeSessions(sessions); // Save the updated sessions to the file
  res.status(201).json(newSession); // Return the new session
};

// Update a session by ID
export const updateSessionById = async (req, res) => {
  const { id } = req.query; // Get the session ID from the request query
  const updatedSession = req.body; // Get the updated session data from the request body
  const sessions = readSessions(); // Get the current sessions
  const sessionIndex = sessions.findIndex((s) => s.id === id); // Find the session by ID
  if (sessionIndex !== -1) {
    sessions[sessionIndex] = { ...updatedSession, id }; // Update the session
    writeSessions(sessions); // Save the updated sessions to the file
    res.status(200).json(updatedSession); // Return the updated session
  } else {
    res.status(404).json({ message: "Session not found" }); // If not found, return an error
  }
};

// Delete a session by ID
export const deleteSessionById = async (req, res) => {
  const { id } = req.query; // Get the session ID from the request query
  let sessions = readSessions(); // Get the current sessions
  sessions = sessions.filter((s) => s.id !== id); // Remove the session with the given ID
  writeSessions(sessions); // Save the updated sessions to the file
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
