// pages/api/goals.js

let goals = []; // Store goals here (in-memory for now)

const generateId = () => Date.now().toString(); // Helper function to generate unique IDs based on the current timestamp

// Fetch all goals
export const fetchAllGoals = async (req, res) => {
  res.status(200).json(goals); // Respond with the list of all goals
};

// Fetch a goal by ID
export const fetchGoalById = async (req, res) => {
  const { id } = req.query; // Extract the goal ID from the request query
  const goal = goals.find((g) => g.id === id); // Search for the goal by its ID
  if (goal) {
    res.status(200).json(goal); // If goal is found, return it
  } else {
    res.status(404).json({ message: "Goal not found" }); // If not found, return an error
  }
};

// Create a new goal
export const createGoal = async (req, res) => {
  const newGoal = { ...req.body, id: generateId() }; // Generate a new goal with the data from the request body and a unique ID
  goals.push(newGoal); // Add the new goal to the in-memory goals array
  res.status(201).json(newGoal); // Respond with the newly created goal
};

// Update a goal by ID
export const updateGoalById = async (req, res) => {
  const { id } = req.query; // Extract the goal ID from the request query
  const { updated } = req.body; // Get the updated goal data from the request body

  goals = goals.map((g) => (g.id === id ? { ...updated, id } : g)); // Update the goal in the array with the new data
  res.status(200).json(updated); // Respond with the updated goal data
};

// Delete a goal by ID
export const deleteGoalById = async (req, res) => {
  const { id } = req.query; // Extract the goal ID from the request query
  goals = goals.filter((g) => g.id !== id); // Filter out the goal with the specified ID
  res.status(204).end(); // No content response after successful deletion
};

// Main API handler that routes to specific methods based on HTTP request
export default function handler(req, res) {
  switch (req.method) {
    case 'GET':
      if (req.query.id) {
        return fetchGoalById(req, res); // If an ID is provided, fetch a single goal
      }
      return fetchAllGoals(req, res); // Otherwise, fetch all goals
    case 'POST':
      return createGoal(req, res); // Handle creation of a new goal
    case 'PUT':
      return updateGoalById(req, res); // Handle updating an existing goal by ID
    case 'DELETE':
      return deleteGoalById(req, res); // Handle deletion of a goal by ID
    default:
      res.status(405).json({ message: 'Method Not Allowed' }); // If the method is not recognized, return a 405 error
  }
}
