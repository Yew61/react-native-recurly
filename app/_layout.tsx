import {SplashScreen, Stack, Slot, useRouter, useSegments} from "expo-router";

import '@/global.css'
import {useFonts} from "expo-font";
import {useEffect} from "react";
import { ClerkProvider, useAuth } from '@clerk/expo';
import { tokenCache } from '@/lib/tokenCache';

SplashScreen.preventAutoHideAsync();

function InitialLayout() {
  const { isLoaded, isSignedIn } = useAuth();
  const segments = useSegments();
  const router = useRouter();

  useEffect(() => {
    if (!isLoaded) return;
    const inAuthGroup = segments[0] === '(auth)';
    if (isSignedIn && inAuthGroup) {
      router.replace('/(tabs)');
    } else if (!isSignedIn && !inAuthGroup) {
      router.replace('/(auth)/sign-in');
    }
  }, [isSignedIn, isLoaded, segments]);

  return <Slot />;
}

export default function RootLayout() {

   const [fontsLoaded] = useFonts({
     "sans-regular" : require("../assets/fonts/PlusJakartaSans-Regular.ttf"),
     "sans-bold" : require("../assets/fonts/PlusJakartaSans-Bold.ttf"),
     "sans-medium" : require("../assets/fonts/PlusJakartaSans-Medium.ttf"),
     "sans-semibold" : require("../assets/fonts/PlusJakartaSans-SemiBold.ttf"),
     "sans-extrabold" : require("../assets/fonts/PlusJakartaSans-ExtraBold.ttf"),
     "sans-light" : require("../assets/fonts/PlusJakartaSans-Light.ttf")
   })

  useEffect(() => {
    if(fontsLoaded) {
      SplashScreen.hideAsync();
    }
  }, [fontsLoaded])
  if(!fontsLoaded){
    return null
  }


  return (
    <ClerkProvider
        publishableKey={process.env.EXPO_PUBLIC_CLERK_PUBLISHABLE_KEY!}
        tokenCache={tokenCache}
    >
        <InitialLayout />
    </ClerkProvider>
  );
}
