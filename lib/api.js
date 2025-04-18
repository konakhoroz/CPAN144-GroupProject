// lib/api.js

// Fake data store (in-memory array for now)
let sessions = []; // Array to hold session data
let goals = []; // Array to hold goal data

// Utility to generate a unique ID
const generateId = () => Date.now().toString(); // Uses the current timestamp as a unique identifier

// --- Sessions ---

// Fetch all sessions
export const fetchAllSessions = async () => {
  return sessions; // Returns the array of all sessions
};

// Fetch a single session by its ID
export const fetchSessionById = async (id) => {
  return sessions.find((s) => s.id === id); // Finds and returns a session by its ID
};

// Create a new session
export const createSession = async (session) => {
  const newSession = { ...session, id: generateId() }; // Create a new session with a unique ID
  sessions.push(newSession); // Add the new session to the sessions array
  return newSession; // Return the new session
};

// Update an existing session by its ID
export const updateSessionById = async (id, updated) => {
  sessions = sessions.map((s) => (s.id === id ? { ...updated, id } : s)); // Replace the session with the updated session
  return updated; // Return the updated session
};

// Delete a session by its ID
export const deleteSessionById = async (id) => {
  sessions = sessions.filter((s) => s.id !== id); // Remove the session with the given ID from the array
  return true; // Return true indicating the deletion was successful
};

// Legacy (index-based) functions - now deprecated

// Deprecated: Use deleteSessionById instead
export const deleteSession = async (id) => {
  console.warn("deleteSession (index-based) is deprecated. Use deleteSessionById.");
  return deleteSessionById(id); // Calls the updated delete function
};

// Deprecated: Use updateSessionById instead
export const updateSession = async (id, updatedSession) => {
  console.warn("updateSession (index-based) is deprecated. Use updateSessionById.");
  return updateSessionById(id, updatedSession); // Calls the updated update function
};

// --- Goals ---

// Fetch all goals
export const fetchAllGoals = async () => {
  return goals; // Returns the array of all goals
};

// Fetch a single goal by its ID
export const fetchGoalById = async (id) => {
  return goals.find((g) => g.id === id); // Finds and returns a goal by its ID
};

// Create a new goal
export const createGoal = async (goal) => {
  const newGoal = { ...goal, id: generateId() }; // Create a new goal with a unique ID
  goals.push(newGoal); // Add the new goal to the goals array
  return newGoal; // Return the new goal
};

// Update an existing goal by its ID
export const updateGoalById = async (id, updatedGoal) => {
  goals = goals.map((g) => (g.id === id ? { ...updatedGoal, id } : g)); // Replace the goal with the updated goal
  return updatedGoal; // Return the updated goal
};

// Delete a goal by its ID
export const deleteGoalById = async (id) => {
  goals = goals.filter((g) => g.id !== id); // Remove the goal with the given ID from the array
  return true; // Return true indicating the deletion was successful
};

// Legacy (index-based) functions - now deprecated

// Deprecated: Use deleteGoalById instead
export const deleteGoal = async (id) => {
  console.warn("deleteGoal (index-based) is deprecated. Use deleteGoalById.");
  return deleteGoalById(id); // Calls the updated delete function
};

// Deprecated: Use updateGoalById instead
export const updateGoal = async (id, updatedGoal) => {
  console.warn("updateGoal (index-based) is deprecated. Use updateGoalById.");
  return updateGoalById(id, updatedGoal); // Calls the updated update function
};
