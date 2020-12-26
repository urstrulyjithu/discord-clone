import firebase from "firebase" ;

const firebaseConfig = {
  apiKey: "AIzaSyABVHq1G_jnn5F-QP9v_9mjAHuPQqgPyJY",
  authDomain: "discord-clone-fe83d.firebaseapp.com",
  projectId: "discord-clone-fe83d",
  storageBucket: "discord-clone-fe83d.appspot.com",
  messagingSenderId: "901806205913",
  appId: "1:901806205913:web:f88848b0bfaf6cf6de07c8",
  measurementId: "G-VY2XCK46L5"
};

const firebaseApp = firebase.initializeApp(firebaseConfig);
const db = firebaseApp.firestore();
const auth = firebase.auth();
const provider = new firebase.auth.GoogleAuthProvider();

export {auth , provider};
export default db;
