import { initializeApp } from 'firebase/app';
import { getDatabase } from 'firebase/database';
import service from '../../service.json';
import { getFirestore } from 'firebase/firestore';

const firebaseConfig = {
  apiKey: service.apiKey,
  authDomain: service.authDomain,
  databaseURL: service.databaseURL,
  projectId: service.projectId,
  storageBucket: service.storageBucket,
  messagingSenderId: service.messagingSenderId,
  appId: service.appId,
};

const app = initializeApp(firebaseConfig);
export const database = getFirestore(app);
