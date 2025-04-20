// pages/api/sessions/index.js

import { firestore } from '@/lib/firebase';
import {
  collection,
  getDocs,
  addDoc,
  getDoc,
  doc,
  setDoc,
  deleteDoc
} from 'firebase/firestore';

const sessionsCollection = collection(firestore, 'sessions');

// Fetch all sessions
export const fetchAllSessions = async (req, res) => {
  try {
    const snapshot = await getDocs(sessionsCollection);
    const sessions = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
    res.status(200).json(sessions);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching sessions', error });
  }
};

// Fetch a session by ID
export const fetchSessionById = async (req, res) => {
  const { id } = req.query;
  try {
    const docRef = doc(firestore, 'sessions', id);
    const docSnap = await getDoc(docRef);

    if (!docSnap.exists()) {
      return res.status(404).json({ message: 'Session not found' });
    }

    res.status(200).json({ id: docSnap.id, ...docSnap.data() });
  } catch (error) {
    res.status(500).json({ message: 'Error fetching session', error });
  }
};

// Create a new session
export const createSession = async (req, res) => {
  try {
    const newSession = req.body;
    const docRef = await addDoc(sessionsCollection, newSession);
    const savedSession = await getDoc(docRef);
    res.status(201).json({ id: docRef.id, ...savedSession.data() });
  } catch (error) {
    res.status(500).json({ message: 'Error creating session', error });
  }
};

// Update a session by ID
export const updateSessionById = async (req, res) => {
  const { id } = req.query;
  const updatedSession = req.body;
  try {
    const docRef = doc(firestore, 'sessions', id);
    await setDoc(docRef, updatedSession, { merge: true });
    res.status(200).json({ id, ...updatedSession });
  } catch (error) {
    res.status(500).json({ message: 'Error updating session', error });
  }
};

// Delete a session by ID
export const deleteSessionById = async (req, res) => {
  const { id } = req.query;
  try {
    const docRef = doc(firestore, 'sessions', id);
    await deleteDoc(docRef);
    res.status(204).end();
  } catch (error) {
    res.status(500).json({ message: 'Error deleting session', error });
  }
};

// Main API handler
export default function handler(req, res) {
  switch (req.method) {
    case 'GET':
      return req.query.id ? fetchSessionById(req, res) : fetchAllSessions(req, res);
    case 'POST':
      return createSession(req, res);
    case 'PUT':
      return updateSessionById(req, res);
    case 'DELETE':
      return deleteSessionById(req, res);
    default:
      res.status(405).json({ message: 'Method Not Allowed' });
  }
}
