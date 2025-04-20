import fs from 'fs';
import path from 'path';

const goalsFilePath = path.resolve(process.cwd(), 'goals.json'); // Path to the goals.json file

// Helper function to read goals from the JSON file
const readGoals = () => {
  try {
    const data = fs.readFileSync(goalsFilePath); // Read the file synchronously
    return JSON.parse(data); // Parse and return the data as an object
  } catch (error) {
    console.error("Error reading goals file", error);
    return []; // If the file doesn't exist or there's an error, return an empty array
  }
};

// Helper function to write goals to the JSON file
const writeGoals = (goals) => {
  try {
    fs.writeFileSync(goalsFilePath, JSON.stringify(goals, null, 2)); // Write goals to file
  } catch (error) {
    console.error("Error writing to goals file", error);
  }
};

// Utility to generate a unique ID
const generateId = () => Date.now().toString();

// --- Goals API Endpoints ---

// Fetch all goals
export const fetchAllGoals = async (req, res) => {
  const goals = readGoals(); // Get goals from the file
  res.status(200).json(goals); // Return the list of all goals
};

// Fetch a goal by ID
export const fetchGoalById = async (req, res) => {
  const { id } = req.query; // Extract goal ID from the request query
  const goals = readGoals(); // Get goals from the file
  const goal = goals.find((g) => g.id === id); // Find the goal by ID
  if (goal) {
    res.status(200).json(goal); // Return the goal if found
  } else {
    res.status(404).json({ message: "Goal not found" }); // Return an error if not found
  }
};

// Create a new goal
export const createGoal = async (req, res) => {
  const newGoal = { ...req.body, id: generateId() }; // Create a new goal using the request body data
  const goals = readGoals(); // Get goals from the file
  goals.push(newGoal); // Add the new goal to the array
  writeGoals(goals); // Save the updated goals to the file
  res.status(201).json(newGoal); // Return the newly created goal
};

// Update a goal by ID
export const updateGoalById = async (req, res) => {
  const { id } = req.query; // Extract goal ID from the request query
  const updatedGoal = req.body; // Get the updated goal data from the request body
  const goals = readGoals(); // Get goals from the file
  const goalIndex = goals.findIndex((g) => g.id === id); // Find the goal by ID
  if (goalIndex !== -1) {
    goals[goalIndex] = { ...updatedGoal, id }; // Update the goal
    writeGoals(goals); // Save the updated goals to the file
    res.status(200).json(updatedGoal); // Return the updated goal
  } else {
    res.status(404).json({ message: "Goal not found" }); // Return an error if not found
  }
};

// Delete a goal by ID
export const deleteGoalById = async (req, res) => {
  const { id } = req.query; // Extract goal ID from the request query
  let goals = readGoals(); // Get goals from the file
  goals = goals.filter((g) => g.id !== id); // Remove the goal with the given ID
  writeGoals(goals); // Save the updated goals to the file
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
