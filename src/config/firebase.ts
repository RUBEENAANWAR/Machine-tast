// Firebase configuration
// Using demo/mock mode since no real Firebase project is configured
// Replace these values with your actual Firebase config

import { initializeApp, FirebaseApp } from 'firebase/app';
import { getAuth, Auth } from 'firebase/auth';

const firebaseConfig = {
  apiKey: "AIzaSyDEMO-placeholder-replace-with-real",
  authDomain: "healthsync-demo.firebaseapp.com",
  projectId: "healthsync-demo",
  storageBucket: "healthsync-demo.appspot.com",
  messagingSenderId: "123456789",
  appId: "1:123456789:web:abcdef123456"
};

let app: FirebaseApp | null = null;
let auth: Auth | null = null;

try {
  app = initializeApp(firebaseConfig);
  auth = getAuth(app);
} catch (error) {
  console.warn('Firebase initialization failed – running in demo mode');
}

export { auth };
export default app;
