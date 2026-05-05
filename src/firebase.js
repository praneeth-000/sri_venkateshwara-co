import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

// ── Startup sanity check ─────────────────────────────────────────────────────
// Open browser DevTools → Console to see these on every page load.
// If Project ID shows "NOT SET", your .env file is missing VITE_FIREBASE_* keys.
console.log(
  '[Firebase] Initializing with Project ID:',
  import.meta.env.VITE_FIREBASE_PROJECT_ID || '❌ NOT SET — add keys to .env file!'
);
if (!import.meta.env.VITE_FIREBASE_API_KEY) {
  console.warn(
    '⚠ Firebase config is MISSING.\n' +
    'Auth and Firestore will NOT work.\n' +
    'Fix: Add VITE_FIREBASE_* keys to your .env file in the project root,\n' +
    'then restart the dev server (npm run dev).'
  );
}

// ── Firebase config (Modular SDK v9+) ────────────────────────────────────────
// Values come from .env via Vite's import.meta.env (VITE_ prefix required).
const firebaseConfig = {
  apiKey:            import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain:        import.meta.env.VITE_FIREBASE_AUTH_DOMAIN,
  projectId:         import.meta.env.VITE_FIREBASE_PROJECT_ID,
  storageBucket:     import.meta.env.VITE_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID,
  appId:             import.meta.env.VITE_FIREBASE_APP_ID,
};

// Initialize
const app = initializeApp(firebaseConfig);

// Exported services
export const auth = getAuth(app);
export const db   = getFirestore(app);
export default app;
