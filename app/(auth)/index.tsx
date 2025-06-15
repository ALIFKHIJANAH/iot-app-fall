import Button from 'components/Button';
import { useRouter } from 'expo-router';
import { useNotification } from 'lib/firebase/useNotification';
import { useEffect } from 'react';
import { View, Text, Image } from 'react-native';

const LoginScreen = () => {
  const { expoPushToken,sendPushNotification } = useNotification();
  console.log(expoPushToken,'token');
  useEffect(() => {
    console.log('Current push token:', expoPushToken);
  }, [expoPushToken]);
  const router = useRouter();
  return (
    <View className="flex-1 items-center justify-center bg-[#F2F2F2] p-4 pt-0">
      <Image source={require('../../assets/map_vector.png')} className="object-cover" />
      <View className="absolute bottom-4 w-full rounded-[29px] bg-white px-8 py-4 shadow-lg">
        <View className="mb-8 mt-5 flex w-full items-start justify-start">
        </View>
        <Text className="mb-2 text-left text-3xl font-bold">Get Started</Text>
        <Text className="text-md mb-4 text-left">
          Create an account to get started with our app.
        </Text>
        <View className="mt-10 flex w-full items-center justify-center gap-3">
          <Button
            title="Get Started"
            style="text-center items-center"
            onPress={() => {
              router.push('(dashboard)');
            }}
          />
        </View>
      </View>
    </View>
  );
};

export default LoginScreen;
