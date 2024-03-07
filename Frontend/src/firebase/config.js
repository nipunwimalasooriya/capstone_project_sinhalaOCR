// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";


// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBM3evaQAPXbl77NhyL4nTiTiH_eRc5ibY",
  authDomain: "ocr-sinhala-f2628.firebaseapp.com",
  projectId: "ocr-sinhala-f2628",
  storageBucket: "ocr-sinhala-f2628.appspot.com",
  messagingSenderId: "833521742255",
  appId: "1:833521742255:web:548b55bb48129ff6e87f5a"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);