import ReactNativeAsyncStorage from '@react-native-async-storage/async-storage';
import { initializeApp } from "firebase/app";
import { getReactNativePersistence, initializeAuth } from 'firebase/auth/react-native';
import { getFirestore } from "firebase/firestore";
import { getStorage } from 'firebase/storage';

const firebaseConfig = {
  apiKey: "AIzaSyCveF-gB_dpa6UXSKIzieljLFM_1O4SVh8",
  authDomain: "adaptive-fitness-agent.firebaseapp.com",
  projectId: "adaptive-fitness-agent",
  storageBucket: "adaptive-fitness-agent.firebasestorage.app",
  messagingSenderId: "663763796029",
  appId: "1:663763796029:web:4d98357c48a6c75ee86a54",
  measurementId: "G-PT4GSE444X",
};

const app = initializeApp(firebaseConfig);

export const auth = initializeAuth(app, {
  persistence: getReactNativePersistence(ReactNativeAsyncStorage),
});
export const db = getFirestore(app);
export const storage = getStorage(app);