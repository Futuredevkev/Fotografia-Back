import { initializeApp } from "firebase/app";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
    apiKey: "AIzaSyAg4X5VYj09xasE_rm-bYEeLIPWJs1d5Oo",
    authDomain: "mmpublicidad-f169c.firebaseapp.com",
    projectId: "mmpublicidad-f169c",
    storageBucket: "mmpublicidad-f169c.appspot.com",
    messagingSenderId: "219429400957",
    appId: "1:219429400957:web:14697adb964be11e675c14"
  };

const firebaseApp = initializeApp(firebaseConfig)

 const storage = getStorage(firebaseApp)

 export { storage };
