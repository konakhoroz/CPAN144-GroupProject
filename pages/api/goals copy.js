//Same thing this one like sessions.js


let goals = []; // In-memory storage for goals

const generateId = () => Date.now().toString(); // Helper function to generate unique IDs

// Fetch all goals
export const fetchAllGoals = async (req, res) => {
  res.status(200).json(goals); // Return the list of all goals
};

// Fetch a goal by ID
export const fetchGoalById = async (req, res) => {
  const { id } = req.query; // Extract goal ID from the request query
  const goal = goals.find((g) => g.id === id); // Find the goal by its ID
  if (goal) {
    res.status(200).json(goal); // Return the goal if found
  } else {
    res.status(404).json({ message: "Goal not found" }); // Return an error if not found
  }
};

// Create a new goal
export const createGoal = async (req, res) => {
  const newGoal = { ...req.body, id: generateId() }; // Create a new goal using the request body data
  goals.push(newGoal); // Add the new goal to the in-memory storage
  res.status(201).json(newGoal); // Return the newly created goal
};

// Update a goal by ID
export const updateGoalById = async (req, res) => {
  const { id } = req.query; // Extract goal ID from the request query
  const updatedGoal = req.body; // Get the updated goal data from the request body

  goals = goals.map((g) => (g.id === id ? { ...updatedGoal, id } : g)); // Update the goal in the array
  res.status(200).json(updatedGoal); // Respond with the updated goal
};

// Delete a goal by ID
export const deleteGoalById = async (req, res) => {
  const { id } = req.query; // Extract goal ID from the request query
  goals = goals.filter((g) => g.id !== id); // Remove the goal from the in-memory array
  res.status(204).end(); // No content response after deletion
};

// Main API handler that routes to specific methods based on the request method
export default function handler(req, res) {
  switch (req.method) {
    case 'GET':
      if (req.query.id) {
        return fetchGoalById(req, res); // Fetch a single goal if an ID is provided
      }
      return fetchAllGoals(req, res); // Otherwise, fetch all goals
    case 'POST':
      return createGoal(req, res); // Handle creating a new goal
    case 'PUT':
      return updateGoalById(req, res); // Handle updating an existing goal by ID
    case 'DELETE':
      return deleteGoalById(req, res); // Handle deleting a goal by ID
    default:
      res.status(405).json({ message: 'Method Not Allowed' }); // If method is not recognized
  }
}
