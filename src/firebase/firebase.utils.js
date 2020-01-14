import firebase from 'firebase/app';
import 'firebase/firestore';
import 'firebase/auth';
import { reject } from 'q';




const config = {
  apiKey: "AIzaSyC7VutcokddsAGlMAKlD6h1T0jcCGlUE_8",
  authDomain: "crwn-db-5f640.firebaseapp.com",
  databaseURL: "https://crwn-db-5f640.firebaseio.com",
  projectId: "crwn-db-5f640",
  storageBucket: "crwn-db-5f640.appspot.com",
  messagingSenderId: "777317718604",
  appId: "1:777317718604:web:80a16c58f51dfff7"
  };



  export const createUserProfileDocument = async  (userAuth, additionalData) => {

    if(!userAuth) return;

    const userRef = firestore.doc(`users/${userAuth.uid}`);

    const snapShot = await userRef.get();

    if(!snapShot.exists) {
      const {displayName,email} = userAuth;
      const createdAt = new Date();

      try {
        await userRef.set({
          displayName, 
          email,
          createdAt,
          ...additionalData
        })
      } catch(error) {
        console.log('error creating user', error.message);
      }
      


     

    }


    return userRef;

  };


  export const addCollectionAndDocuments = async (collectionKey, objectsToAdd) => {
    const collectionRef = firestore.collection(collectionKey);
    console.log(collectionRef);

    const batch = firestore.batch();

    objectsToAdd.forEach(obj => {
      const newDocRef = collectionRef.doc();
      console.log(newDocRef);
      batch.set(newDocRef,obj);
      
    });

    return await batch.commit();
  };


 export  const convertCollectionSnapshotToMap = (collections) => {
    const transforemedCollection = collections.docs.map(doc => {
      
      const {title, items} = doc.data();

      console.log("docs data" + title);

      return {
        routeName: encodeURI(title.toLowerCase()),
        id: doc.id,
        title,
        items
      }
    });

    console.log("transforemedCollection"+transforemedCollection)

   return transforemedCollection.reduce((accumulator, collection) => {
      accumulator[collection.title.toLowerCase()] = collection;
      return accumulator;

    },{});
    

  };


  export const getCurrentUser = () => {
    return new Promise((resolve,reject) => {

      const unscribe = auth.onAuthStateChanged(userAuth => {
        unscribe();
        resolve(userAuth);
      },reject)

    });
  }



  firebase.initializeApp(config);

  export const auth = firebase.auth();
  export const firestore = firebase.firestore();

  export const googleProvider = new firebase.auth.GoogleAuthProvider();
  googleProvider.setCustomParameters({prompt : 'select_account'});
  export const signInWithGoogle = () => auth.signInWithPopup(googleProvider);

  export default firebase;

