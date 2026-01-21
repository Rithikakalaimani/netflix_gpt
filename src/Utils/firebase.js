// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth, createUserWithEmailAndPassword } from "firebase/auth";
import {
  getFirestore,
  collection,
  doc,
  setDoc,
  getDoc,
  deleteDoc,
} from "firebase/firestore";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional

const firebaseConfig = {
  apiKey: process.env.REACT_APP_FIREBASE_API_KEY || "AIzaSyD-m8IRCgCmKcSGFkIDkKNejpK8-PQua0s",
  authDomain: process.env.REACT_APP_FIREBASE_AUTH_DOMAIN || "netflixgpt-c1547.firebaseapp.com",
  projectId: process.env.REACT_APP_FIREBASE_PROJECT_ID || "netflixgpt-c1547",
  storageBucket: process.env.REACT_APP_FIREBASE_STORAGE_BUCKET || "netflixgpt-c1547.firebasestorage.app",
  messagingSenderId: process.env.REACT_APP_FIREBASE_MESSAGING_SENDER_ID || "681806232346",
  appId: process.env.REACT_APP_FIREBASE_APP_ID || "1:681806232346:web:09edf33d8aa589a1e14aa3",
  measurementId: process.env.REACT_APP_FIREBASE_MEASUREMENT_ID || "G-VJ9VQRHCRT",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
export const auth = getAuth();
export const db = getFirestore(app);

// Watchlist functions
export const addToWatchlist = async (userId, movie) => {
  try {
    if (!userId || !movie || !movie.id) {
      console.error("Invalid parameters for addToWatchlist:", {
        userId,
        movie,
      });
      return false;
    }

    const watchlistRef = doc(db, "watchlists", userId);
    const watchlistDoc = await getDoc(watchlistRef);

    if (watchlistDoc.exists()) {
      const currentWatchlist = watchlistDoc.data().movies || [];
      const movieExists = currentWatchlist.some((m) => m && m.id === movie.id);

      if (!movieExists) {
        await setDoc(
          watchlistRef,
          {
            movies: [...currentWatchlist, movie],
          },
          { merge: true },
        );
        return true;
      }
      // Movie already exists - still return true
      return true;
    } else {
      await setDoc(watchlistRef, {
        movies: [movie],
      });
      return true;
    }
  } catch (error) {
    console.error("Error adding to watchlist:", error);
    console.error("Error code:", error.code);
    console.error("Error message:", error.message);
    // Check for common Firebase errors
    if (error.code === "permission-denied") {
      console.error(
        "❌ Firebase permission denied. Check Firestore security rules in Firebase Console.",
      );
      console.error("Go to: Firebase Console → Firestore Database → Rules");
      console.error(
        "Make sure authenticated users can write to /watchlists/{userId}",
      );
    } else if (error.code === "unavailable") {
      console.error(
        "❌ Firebase service is temporarily unavailable. Please try again later.",
      );
    } else if (error.code === "unauthenticated") {
      console.error("❌ User is not authenticated. Please sign in again.");
    }
    throw error; // Re-throw to get error details in the component
  }
};

export const removeFromWatchlist = async (userId, movieId) => {
  try {
    if (!userId || !movieId) {
      console.error("Invalid parameters for removeFromWatchlist:", {
        userId,
        movieId,
      });
      return false;
    }

    const watchlistRef = doc(db, "watchlists", userId);
    const watchlistDoc = await getDoc(watchlistRef);

    if (watchlistDoc.exists()) {
      const currentWatchlist = watchlistDoc.data().movies || [];
      const updatedWatchlist = currentWatchlist.filter(
        (m) => m && m.id !== movieId,
      );

      await setDoc(
        watchlistRef,
        {
          movies: updatedWatchlist,
        },
        { merge: true },
      );
      return true;
    }
    return true;
  } catch (error) {
    console.error("Error removing from watchlist:", error);
    console.error("Error details:", error.code, error.message);
    return false;
  }
};

export const getWatchlist = async (userId) => {
  try {
    const watchlistRef = doc(db, "watchlists", userId);
    const watchlistDoc = await getDoc(watchlistRef);

    if (watchlistDoc.exists()) {
      return watchlistDoc.data().movies || [];
    }
    return [];
  } catch (error) {
    console.error("Error getting watchlist:", error);
    return [];
  }
};

export const isInWatchlist = async (userId, movieId) => {
  try {
    const watchlist = await getWatchlist(userId);
    return watchlist.some((m) => m.id === movieId);
  } catch (error) {
    console.error("Error checking watchlist:", error);
    return false;
  }
};
