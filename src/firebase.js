import firebase from 'firebase'

const firebaseConfig = {
    apiKey: "AIzaSyAhwbdaPngTNAnt3GIVTvJBFYqYIr1OjK4",
    authDomain: "whatsapp-clone-388dd.firebaseapp.com",
    projectId: "whatsapp-clone-388dd",
    storageBucket: "whatsapp-clone-388dd.appspot.com",
    messagingSenderId: "483718948989",
    appId: "1:483718948989:web:60d13115b4a786056ae914"
  };

  const firebaseApp = firebase.initializeApp(firebaseConfig);

  const db = firebase.firestore();
  const auth = firebase.auth();
  const provider = new firebase.auth.GoogleAuthProvider();

  export { auth, provider };
  export default db;