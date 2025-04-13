// lib/api.js

// Fake data store (in-memory array for now)
let sessions = [];
let goals = [];

// Utility to generate a unique ID
const generateId = () => Date.now().toString();

// --- Sessions ---

export const fetchAllSessions = async () => {
  return sessions;
};

export const fetchSessionById = async (id) => {
  return sessions.find((s) => s.id === id);
};

export const createSession = async (session) => {
  const newSession = { ...session, id: generateId() };
  sessions.push(newSession);
  return newSession;
};

export const updateSessionById = async (id, updated) => {
  sessions = sessions.map((s) => (s.id === id ? { ...updated, id } : s));
  return updated;
};

export const deleteSessionById = async (id) => {
  sessions = sessions.filter((s) => s.id !== id);
  return true;
};

// Legacy (index-based) functions - now deprecated
export const deleteSession = async (id) => {
  console.warn("deleteSession (index-based) is deprecated. Use deleteSessionById.");
  return deleteSessionById(id);
};

export const updateSession = async (id, updatedSession) => {
  console.warn("updateSession (index-based) is deprecated. Use updateSessionById.");
  return updateSessionById(id, updatedSession);
};

// --- Goals ---

export const fetchAllGoals = async () => {
  return goals;
};

export const fetchGoalById = async (id) => {
  return goals.find((g) => g.id === id);
};

export const createGoal = async (goal) => {
  const newGoal = { ...goal, id: generateId() };
  goals.push(newGoal);
  return newGoal;
};

export const updateGoalById = async (id, updatedGoal) => {
  goals = goals.map((g) => (g.id === id ? { ...updatedGoal, id } : g));
  return updatedGoal;
};

export const deleteGoalById = async (id) => {
  goals = goals.filter((g) => g.id !== id);
  return true;
};

// Legacy (index-based) functions - now deprecated
export const deleteGoal = async (id) => {
  console.warn("deleteGoal (index-based) is deprecated. Use deleteGoalById.");
  return deleteGoalById(id);
};

export const updateGoal = async (id, updatedGoal) => {
  console.warn("updateGoal (index-based) is deprecated. Use updateGoalById.");
  return updateGoalById(id, updatedGoal);
};
