import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import {
  Nunito_600SemiBold,
  Nunito_700Bold,
  Nunito_800ExtraBold,
} from '@expo-google-fonts/nunito';
import { useFonts } from 'expo-font';

import Routes from './src/routes';
export default function App() {
  const [fontsLoaded] = useFonts({
    Nunito600: Nunito_600SemiBold,
    Nunito700: Nunito_700Bold,
    Nunito800: Nunito_800ExtraBold,
  });

  if (!fontsLoaded) {
    return null;
  }
  return <Routes />;
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
