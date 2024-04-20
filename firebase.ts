import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyBiC3wAOihLzfK99w8koDCnVy57YvqNn7o",
  authDomain: "events-app-1bb79.firebaseapp.com",
  projectId: "events-app-1bb79",
  storageBucket: "events-app-1bb79.appspot.com",
  messagingSenderId: "557951717700",
  appId: "1:557951717700:web:ac260b78d503493d370711",
  measurementId: "G-8L9NMG01KJ",
};

export const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
