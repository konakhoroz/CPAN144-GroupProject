import { firestore } from '@/lib/firebase';
import { collection, getDocs, doc, getDoc, addDoc, setDoc, deleteDoc } from 'firebase/firestore';

const goalsCollection = collection(firestore, 'goals');

// Fetch all goals
export const fetchAllGoals = async (req, res) => {
  try {
    const snapshot = await getDocs(goalsCollection);
    const goals = snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
    res.status(200).json(goals);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching goals', error });
  }
};

// Fetch a goal by ID
export const fetchGoalById = async (req, res) => {
  const { id } = req.query;
  try {
    const goalRef = doc(firestore, 'goals', id);
    const docSnap = await getDoc(goalRef);
    if (!docSnap.exists()) {
      return res.status(404).json({ message: 'Goal not found' });
    }
    res.status(200).json({ id: docSnap.id, ...docSnap.data() });
  } catch (error) {
    res.status(500).json({ message: 'Error fetching goal', error });
  }
};

// Create a new goal
export const createGoal = async (req, res) => {
  try {
    const newGoal = req.body;
    const docRef = await addDoc(goalsCollection, newGoal);
    const savedGoal = await getDoc(docRef);
    res.status(201).json({ id: docRef.id, ...savedGoal.data() });
  } catch (error) {
    res.status(500).json({ message: 'Error creating goal', error });
  }
};

// Update a goal by ID
export const updateGoalById = async (req, res) => {
  const { id } = req.query;
  const updatedGoal = req.body;
  try {
    const goalRef = doc(firestore, 'goals', id);
    await setDoc(goalRef, updatedGoal, { merge: true });
    res.status(200).json({ id, ...updatedGoal });
  } catch (error) {
    res.status(500).json({ message: 'Error updating goal', error });
  }
};

// Delete a goal by ID
export const deleteGoalById = async (req, res) => {
  const { id } = req.query;
  try {
    const goalRef = doc(firestore, 'goals', id);
    await deleteDoc(goalRef);
    res.status(204).end();
  } catch (error) {
    res.status(500).json({ message: 'Error deleting goal', error });
  }
};

// Main handler
export default function handler(req, res) {
  switch (req.method) {
    case 'GET':
      return req.query.id ? fetchGoalById(req, res) : fetchAllGoals(req, res);
    case 'POST':
      return createGoal(req, res);
    case 'PUT':
      return updateGoalById(req, res);
    case 'DELETE':
      return deleteGoalById(req, res);
    default:
      res.status(405).json({ message: 'Method Not Allowed' });
  }
}
