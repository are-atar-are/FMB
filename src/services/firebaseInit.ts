import { useEffect, useState } from 'react';
import firestore from '@react-native-firebase/firestore';
import auth from '@react-native-firebase/auth';

export const useFirebaseInit = () => {
  const [initialized, setInitialized] = useState(false);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    // Check if Firebase is initialized by trying to access Firestore
    try {
      // Test Firestore connection
      const testConnection = async () => {
        await firestore().collection('test').doc('test').get();
        setInitialized(true);
      };
      
      testConnection();
    } catch (err) {
      console.error('Firebase initialization error:', err);
      setError(err as Error);
    }
  }, []);

  return { initialized, error };
};

export const isFirebaseReady = () => {
  try {
    // Check if we can access firestore
    firestore().collection('test');
    return true;
  } catch {
    return false;
  }
};