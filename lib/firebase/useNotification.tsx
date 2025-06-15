import * as Notifications from 'expo-notifications';
import { useEffect, useRef, useState } from 'react';
import * as Device from 'expo-device';
import { Platform } from 'react-native';
import Constants from 'expo-constants';
import { initializeApp } from 'firebase/app';
import service from '../../service.json';
import { addDoc, collection, doc, getDocs, getFirestore, query, serverTimestamp, updateDoc, where } from 'firebase/firestore';

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
const db = getFirestore(app);

Notifications.setNotificationHandler({
  handleNotification: async () => ({
    shouldPlaySound: true,
    shouldSetBadge: true,
    shouldShowAlert: true,
    shouldShowBanner: true,
    shouldShowList: true,
  }),
});

export const useNotification = () => {
  const [expoPushToken, setExpoPushToken] = useState<string>('');
  const [notification, setNotification] = useState<Notifications.Notification>();
  const notificationListener = useRef<Notifications.Subscription>(null);
  const responseListener = useRef<Notifications.Subscription>(null);


  const saveExpoToken = async (token: string) => {
    try {
      const expoTokensRef = collection(db, 'expoTokens');

      // Check if device_id already exists
      const q = query(expoTokensRef, where('device_id', '==', 'wheelchair_sensor_01'));
      const querySnapshot = await getDocs(q);

      if (querySnapshot.empty) {
        // Add new token document
        await addDoc(expoTokensRef, {
          token: token,
          device_id: 'wheelchair_sensor_01',
          createdAt: serverTimestamp(),
          lastUsed: serverTimestamp(),
          platform: Platform.OS,
          isActive: true,
        });
        console.log('New ExpoToken saved successfully');
      } else {
        // Update existing token document
        const docRef = doc(db, 'expoTokens', querySnapshot.docs[0].id);
        await updateDoc(docRef, {
          token: token,
          lastUsed: serverTimestamp(),
          platform: Platform.OS,
          isActive: true,
        });
        console.log('ExpoToken updated successfully');
      }
    } catch (error) {
      console.error('Error saving expo token:', error);
    }
  };


  const updateDeviceToken = async (token: string) => {
    try {
      // Create query to find device by device_id
      const devicesRef = collection(db, 'devices');
      const q = query(devicesRef, where('device_id', '==', 'wheelchair_sensor_01'));

      // Get the matching documents
      const querySnapshot = await getDocs(q);

      if (querySnapshot.empty) {
        console.error('No device found with device_id: wheelchair_sensor_01');
        return;
      }

      // Update each matching device (should be only one)
      const updates = querySnapshot.docs.map(async (document) => {
        const deviceRef = doc(db, 'devices', document.id);
        await updateDoc(deviceRef, {
          expoToken: token,
          lastTokenUpdate: new Date(),
        });
      });

      await Promise.all(updates);
      console.log('Device token updated successfully');
    } catch (error) {
      console.error('Error updating device token:', error);
    }
  };

  async function registerForPushNotificationsAsync() {
    try {
      if (!Device.isDevice) {
        console.log('Must use physical device for Push Notifications');
        return null;
      }

      // Request permissions first
      const { status: existingStatus } = await Notifications.getPermissionsAsync();
      let finalStatus = existingStatus;

      if (existingStatus !== 'granted') {
        const { status } = await Notifications.requestPermissionsAsync();
        finalStatus = status;
      }

      if (finalStatus !== 'granted') {
        console.log('Failed to get push token for push notification!');
        return null;
      }

      // Set up Android channel
      if (Platform.OS === 'android') {
        await Notifications.setNotificationChannelAsync('default', {
          name: 'default',
          importance: Notifications.AndroidImportance.MAX,
          vibrationPattern: [0, 250, 250, 250],
          lightColor: '#FF231F7C',
        });
      }

      // Get the token with proper configuration
      const token = await Notifications.getExpoPushTokenAsync({
        projectId: Constants.expoConfig?.extra?.eas?.projectId || 'your-project-id',
      });

      console.log('Push token:', token.data);
      return token.data;
    } catch (error) {
      console.error('Error getting push token:', error);
      return null;
    }
  }

  // ...existing sendPushNotification function...
  const sendPushNotification = async (title: string, body: string) => {
    await Notifications.scheduleNotificationAsync({
      content: {
        title,
        body,
        sound: 'default',
      },
      trigger: null,
    });
  };

  useEffect(() => {
    let isMounted = true;

    registerForPushNotificationsAsync().then((token) => {
      if (isMounted && token) {
        console.log('Setting token:', token);
        setExpoPushToken(token);
        updateDeviceToken(token);
        saveExpoToken(token);
      }
    });

    notificationListener.current = Notifications.addNotificationReceivedListener((notification) => {
      if (isMounted) {
        setNotification(notification);
      }
    });

    responseListener.current = Notifications.addNotificationResponseReceivedListener((response) => {
      console.log('Notification response:', response);
    });

    return () => {
      isMounted = false;
      if (notificationListener.current) {
        Notifications.removeNotificationSubscription(notificationListener.current);
      }
      if (responseListener.current) {
        Notifications.removeNotificationSubscription(responseListener.current);
      }
    };
  }, []);

  return {
    expoPushToken,
    notification,
    sendPushNotification,
  };
};
