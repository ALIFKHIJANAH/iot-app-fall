import { useLocalSearchParams, useRouter } from 'expo-router';
import React from 'react';
import { View, Text, Pressable } from 'react-native';
import MapView, { Marker, PROVIDER_GOOGLE } from 'react-native-maps';

const Maps = () => {
  const params = useLocalSearchParams();
  const { latitude, longitude, deviceName } = params;
  const router = useRouter();
  return (
    <View className="relative flex-1">
      <View className="absolute left-4 top-4 z-10">
        <Pressable className="rounded-full bg-white p-4 px-8 shadow-md" onPress={() => router.back()}>
          <Text className="text-xl font-bold">Back</Text>
        </Pressable>
      </View>
      <MapView
        style={{ width: '100%', height: '100%' }}
        provider={PROVIDER_GOOGLE}
        initialRegion={{
          latitude: latitude ? parseFloat(latitude) : -6.2,
          longitude: longitude ? parseFloat(longitude) : 106.816666,
          latitudeDelta: 0.0922,
          longitudeDelta: 0.0421,
        }}>
        <Marker
          coordinate={{
            latitude: Number(latitude),
            longitude: Number(longitude),
          }}
          title={'Device Location'}
          description={`Lat: ${latitude}, Long: ${longitude}`}
        />
      </MapView>
    </View>
  );
};

export default Maps;
