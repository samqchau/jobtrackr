import firebase from 'firebase';

const firebaseConfig = {
  apiKey: 'AIzaSyAFR1OJZbSnm8KuINSeAUb-tmSiSa3uQ5g',
  authDomain: 'jobtrackr-9e291.firebaseapp.com',
  projectId: 'jobtrackr-9e291',
  storageBucket: 'jobtrackr-9e291.appspot.com',
  messagingSenderId: '322734507800',
  appId: '1:322734507800:web:0564323defd25f13fc006d',
  measurementId: 'G-H4WPFNYCH5',
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);
firebase.analytics();

export default firebase;
