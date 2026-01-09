// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth, GoogleAuthProvider, GithubAuthProvider, signInWithPopup, signInWithEmailAndPassword, createUserWithEmailAndPassword, sendPasswordResetEmail, signOut } from "firebase/auth";
import { getFirestore, query, getDocs, collection, where, addDoc } from "firebase/firestore";
import { getStorage } from "firebase/storage";

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyA4mGwMIXGFuayZk0Kso4jDCq66Ah8YvRE",
  authDomain: "gig-worker-e6313.firebaseapp.com",
  projectId: "gig-worker-e6313",
  storageBucket: "gig-worker-e6313.firebasestorage.app",
  messagingSenderId: "795829803574",
  appId: "1:795829803574:web:4c84f3860c5b42a7445697",
  measurementId: "G-CYTP2RS14W"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const auth = getAuth(app);
const db = getFirestore(app);
const storage = getStorage(app);

// Auth Providers
const googleProvider = new GoogleAuthProvider();
const githubProvider = new GithubAuthProvider();

// Sign in with Google
const signInWithGoogle = async (userType = 'user') => {
  try {
    const res = await signInWithPopup(auth, googleProvider);
    const user = res.user;
    const q = query(collection(db, "users"), where("uid", "==", user.uid));
    const querySnapshot = await getDocs(q);
    
    if (querySnapshot.empty) {
      // Create new user document with userType
      await addDoc(collection(db, "users"), {
        uid: user.uid,
        name: user.displayName,
        email: user.email,
        userType,
        authProvider: "google",
        createdAt: new Date().toISOString()
      });
    } else {
      // Update existing user document with userType if not set
      const userDoc = querySnapshot.docs[0];
      if (!userDoc.data().userType) {
        await updateDoc(doc(db, "users", userDoc.id), {
          userType
        });
      }
    }
    
    return { success: true, user };
  } catch (err) {
    console.error("Google sign in error:", err);
    throw err;
  }
};

// Sign in with GitHub
const signInWithGitHub = async () => {
  try {
    const res = await signInWithPopup(auth, githubProvider);
    const user = res.user;
    const q = query(collection(db, "users"), where("uid", "==", user.uid));
    const docs = await getDocs(q);
    if (docs.docs.length === 0) {
      await addDoc(collection(db, "users"), {
        uid: user.uid,
        name: user.displayName,
        authProvider: "github",
        email: user.email,
      });
    }
  } catch (err) {
    console.error(err);
    alert(err.message);
  }
};

// Sign in with email and password
const logInWithEmailAndPassword = async (email, password) => {
  try {
    if (!email || !password) {
      throw { code: 'auth/missing-credentials', message: 'Please enter both email and password.' };
    }

    const userCredential = await signInWithEmailAndPassword(auth, email, password);
    const user = userCredential.user;
    
    // Verify the user exists in Firestore
    const q = query(collection(db, "users"), where("uid", "==", user.uid));
    const querySnapshot = await getDocs(q);
    
    if (querySnapshot.empty) {
      // Sign out the user if they don't exist in Firestore
      await signOut(auth);
      throw { 
        code: 'auth/user-not-found', 
        message: 'No account found with this email. Please sign up first.' 
      };
    }
    
    return { success: true, user: user };
  } catch (err) {
    console.error("Login error:", err);
    
    // Handle specific error cases
    if (err.code === 'auth/wrong-password') {
      throw { 
        code: err.code, 
        message: 'Incorrect password. Please try again.' 
      };
    } else if (err.code === 'auth/user-not-found') {
      throw { 
        code: err.code, 
        message: 'No account found with this email. Please sign up first.' 
      };
    } else if (err.code === 'auth/invalid-credential') {
      throw { 
        code: err.code, 
        message: 'Invalid email or password. Please check your credentials and try again.' 
      };
    } else if (err.code === 'auth/too-many-requests') {
      throw { 
        code: err.code,
        message: 'Access to this account has been temporarily disabled due to many failed login attempts. Please try again later or reset your password.'
      };
    } else if (err.code === 'auth/user-disabled') {
      throw {
        code: err.code,
        message: 'This account has been disabled. Please contact support.'
      };
    } else {
      // For any other errors, provide a generic message
      throw { 
        code: err.code || 'auth/login-failed', 
        message: err.message || 'Failed to sign in. Please try again later.' 
      };
    }
  }
};

// Register with email and password
const registerWithEmailAndPassword = async (name, email, password, userType = 'user') => {
  try {
    // First check if user already exists
    const usersRef = collection(db, 'users');
    const q = query(usersRef, where('email', '==', email));
    const querySnapshot = await getDocs(q);
    
    if (!querySnapshot.empty) {
      throw { code: 'auth/email-already-in-use', message: 'This email is already registered.' };
    }
    
    // If email is not in use, create the user
    const res = await createUserWithEmailAndPassword(auth, email, password);
    const user = res.user;
    
    // Add user to Firestore with userType
    await addDoc(collection(db, "users"), {
      uid: user.uid,
      name,
      email,
      userType,
      authProvider: "local",
      createdAt: new Date().toISOString()
    });
    
    return { success: true, user: user };
  } catch (err) {
    console.error("Registration error:", err);
    // If it's a Firebase auth error, rethrow it with the code
    if (err.code && err.code.startsWith('auth/')) {
      throw err;
    }
    // For other errors, wrap them in a similar format
    throw { code: 'auth/registration-failed', message: err.message };
  }
};

// Send password reset email
const sendPasswordReset = async (email) => {
  try {
    await sendPasswordResetEmail(auth, email);
    alert("Password reset link sent!");
  } catch (err) {
    console.error(err);
    alert(err.message);
  }
};

// Logout
const logout = () => {
  signOut(auth);
};

export {
  auth,
  db,
  storage,
  signInWithGoogle,
  signInWithGitHub,
  logInWithEmailAndPassword,
  registerWithEmailAndPassword,
  sendPasswordReset,
  logout,
};