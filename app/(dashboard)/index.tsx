import Button from 'components/Button';
import { Container } from 'components/Container';
import HomeIcon from 'components/Icons/home';
import Menu from 'components/Icons/menu';
import { useAudioPlayer } from 'expo-audio';
import { useRouter } from 'expo-router';
import { onValue, ref } from 'firebase/database';
import { collection, onSnapshot, orderBy, query, where } from 'firebase/firestore';
import { database } from 'lib/firebase/config';
import React, { useEffect, useState } from 'react';
import { View, Text, Image, ScrollView } from 'react-native';

import Ilustration from '../../assets/icons/ilustration.png';

const audioSource = require('../../assets/audio/sound.mp3');

const Dashboard = () => {
  const [deviceData, setDeviceData] = useState({
    name: 'WheelChair 2',
    status: 'Offline',
    message: 'No data',
    latitude: -6.2,
    longitude: 106.816666,
  });

  const [notifications, setNotifications] = useState([]);

  const navigate = useRouter();

  const player = useAudioPlayer(audioSource);

  useEffect(() => {
    const devicesRef = collection(database, 'devices');
    const q = query(devicesRef, where('device_id', '==', 'wheelchair_sensor_01'));
    const notificationsRef = collection(database, 'notifications');
    const notificationsQuery = query(
      notificationsRef,
      where('device_id', '==', 'wheelchair_sensor_01'),
      // orderBy('timestamp', 'desc')
    );

    const unsubscribeNotifications = onSnapshot(
      notificationsQuery,
      (snapshot) => {
        const notificationsList = [];
        snapshot.forEach((doc) => {
          notificationsList.push({
            id: doc.id,
            ...doc.data(),
          });
        });
        setNotifications(notificationsList);
      },
      (error) => {
        console.error('Error fetching notifications:', error);
      }
    );

    const unsubscribe = onSnapshot(
      q,
      (snapshot) => {
        snapshot.forEach((doc) => {
          const data = doc.data();
          console.log('Device data:', data);
          if (data.status == 'Online') {
            player.loop = true;
            player.volume = 1;
            player.play();
          } else {
            player.pause();
          }
          setDeviceData({
            name: data.device_id || 'WheelChair 2',
            status: data.status || 'Offline',
            message: data.message || 'No data',
            latitude: data.location?.lat || -6.2,
            longitude: data.location?.long || 106.816666,
          });
        });
      },
      (error) => {
        console.error('Error fetching device data:', error);
      }
    );
    return () => {
      unsubscribe()
      unsubscribeNotifications();
    };
  }, []);
  return (
    <Container>
      <ScrollView className="flex-1">
        <View className="-m-2 flex flex-row items-center justify-between rounded-lg bg-white p-4">
          <Menu width={30} height={30} />

          <View className="h-10 w-10 rounded-full bg-slate-400" />
        </View>
        <View>
          <Text className="mt-10 text-left text-5xl font-normal">Hi User</Text>
          <Text className="mt-3 text-left text-2xl font-normal text-slate-500">
            Device IoT Fall Detector
          </Text>
        </View>
        <View className="mt-10 flex flex-col items-start justify-between rounded-3xl bg-white p-4 shadow-md">
          <View className="w-full flex-row">
            <View className="flex h-60 w-1/2 flex-row items-center gap-4">
              <Image className="flex h-full w-full object-cover" source={Ilustration} />
            </View>
            <View className="items w-1/2 items-center justify-center">
              <Button
                title="Location"
                style="w-32"
                onPress={() => {
                  navigate.push({
                    pathname: '(dashboard)/maps',
                    params: {
                      longitude: deviceData?.longitude,
                      latitude: deviceData?.latitude,
                    },
                  });
                }}
              />
            </View>
          </View>
          <Text className="mt-5 flex text-xl font-bold"> Device : {deviceData?.name} </Text>
          <Text className="mt-2 flex text-lg font-medium text-slate-500">
            {' '}
            Status : {deviceData?.status}{' '}
          </Text>
          <View className="mt-3 rounded-md bg-primary p-4">
            <Text className="text-md flex font-medium text-white">
              Message : {deviceData?.message}
            </Text>
          </View>
        </View>
        <View className="mt-5">
          <Text className="mb-3 text-2xl font-bold">Recent Notifications</Text>
          <View>
            {notifications.length > 0 ? (
              notifications.map((notification, index) => (
                <View key={index} className="mb-2 flex rounded-lg bg-white p-3 shadow-sm">
                  <View className="flex">
                    <Text className="mb-4 flex rounded-xl bg-red-400 p-2 text-lg font-medium">
                      {'Warning!!'}
                    </Text>
                  </View>
                  <View className='px-2'>
                    <Text className="text-slate-500">{notification?.fallData?.status}</Text>
                    <Text className="mt-1 text-xs text-slate-400">
                      {new Date(notification.createdAt?.toDate()).toLocaleString()}
                    </Text>
                  </View>
                </View>
              ))
            ) : (
              <Text className="text-center text-slate-500">No notifications</Text>
            )}
          </View>
        </View>
      </ScrollView>
    </Container>
  );
};

export default Dashboard;
