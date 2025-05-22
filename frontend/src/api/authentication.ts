import { initializeApp } from "firebase/app";
import {
  getAuth,
  onAuthStateChanged,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  getIdToken,
} from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyDlzt07hSKeHuFJ3_xanqHfH8UNrkpV0lk",
  authDomain: "easy-cook-29b62.firebaseapp.com",
  projectId: "easy-cook-29b62",
  storageBucket: "easy-cook-29b62.firebasestorage.app",
  messagingSenderId: "432864886630",
  appId: "1:432864886630:web:dda296a4b54f7b8ddcd2a7",
};
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
export { app, auth, onAuthStateChanged };

export async function registerUser(email: string, password: string) {
  try {
    const userCredential = await createUserWithEmailAndPassword(
      auth,
      email,
      password
    );
    const user = userCredential.user;
    console.log(`user signed up: ${user}`);
    return user;
  } catch (error) {
    console.log(`error registering account ${email}:`, error);
    throw error;
  }
}

export async function logInUser(email: string, password: string) {
  try {
    const userCredential = await signInWithEmailAndPassword(
      auth,
      email,
      password
    );
    const user = userCredential.user;
    console.log(`user signed in: ${user}`);
    return user;
  } catch (error) {
    console.log(`error registering account ${email}:`, error);
    throw error;
  }
}

export async function logOutUser() {
  try {
    await signOut(auth);
  } catch (error) {
    console.log(`error logging out of account:`, error);
    throw error;
  }
}

export async function getUserID(forceRefresh = false) {
  const user = auth.currentUser;
  if (user) {
    try {
      const userId = await getIdToken(user, forceRefresh);
      return userId;
    } catch (error) {
      console.log(`error getting ID token:`, error);
      throw error;
    }
  } else {
    console.log("cannot get user ID because no user is signed in");
  }
}

export function isUserLoggedIn(): boolean {
  return auth.currentUser !== null;
}
