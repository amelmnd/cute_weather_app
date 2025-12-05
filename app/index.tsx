import React, { useState } from 'react';
import { StyleSheet, ImageBackground } from 'react-native';
import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context';

import { t_GeolocationCoordinate, t_dataLocation } from './types/type';
import NavBar from './components/NavBar';
import Header from './components/Header';

export default function Index() {
  const [isLoading, setIsLoading] = useState(true);
  const [inputLocation, setInputLocation] = useState('');
  const [statusGeolocationPermission, setStatusGeolocationPermission] =
    useState<string>('');
  const [geolocationCoordinate, setGeolocationCoordinate] =
    useState<t_GeolocationCoordinate | null>(null);
  const [geographicalLocation, setGeographicalLocation] =
    useState<t_dataLocation>({
      city: '',
      region: '',
      country: '',
    });
  const [errorMessage, setErrorMessage] = useState<string>(''); // error message

  return (
    <SafeAreaProvider>
      <ImageBackground
        source={require('../assets/images/background.png')} // Remplace par le chemin de ton image
        style={styles.backgroundImage}
      >
        <SafeAreaView style={styles.container} edges={['top']}>
          <Header
            statusGeolocationPermission={statusGeolocationPermission}
            setStatusGeolocationPermission={setStatusGeolocationPermission}
            geolocationCoordinate={geolocationCoordinate}
            setGeolocationCoordinate={setGeolocationCoordinate}
            geographicalLocation={geographicalLocation}
            setGeographicalLocation={setGeographicalLocation}
            inputLocation={inputLocation}
            setInputLocation={setInputLocation}
            setErrorMessage={setErrorMessage}
            setIsLoading={setIsLoading}
          />

          <NavBar
            geolocationCoordinate={geolocationCoordinate}
            geographicalLocation={geographicalLocation}
            errorMessage={errorMessage}
            isLoading={isLoading}
            setIsLoading={setIsLoading}
          />
        </SafeAreaView>
      </ImageBackground>
    </SafeAreaProvider>
  );
}

const styles = StyleSheet.create({
  backgroundImage: {
    flex: 1,
    resizeMode: 'stretch',
  },
  container: {
    flex: 1,
    backgroundColor: 'transparent',
  },
  error: {
    backgroundColor: 'red',
    color: '#FFF',
  },
});
