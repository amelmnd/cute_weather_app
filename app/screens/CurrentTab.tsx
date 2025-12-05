import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  ImageBackground,
  Image,
} from 'react-native';
import { useEffect, useState } from 'react';
import { i_NavBarProps } from '../types/interface';
import Loader from '../components/Loader';
import currentWeatherData from '../utils/currentWeatherData';

export default function CurrentTab({
  geolocationCoordinate,
  geographicalLocation,
  errorMessage,
  isLoading,
  setIsLoading,
}: i_NavBarProps) {
  const [currentWeather, setCurrentWeather] = useState<any>({
    temperature: 0,
    weather: '',
    windSpeed: 0,
  });

  const findWeather = async () => {
    setIsLoading(true);
    try {
      if (!geolocationCoordinate) throw 'No geolocation data';
      const data = await currentWeatherData(geolocationCoordinate);
      if (!data) throw 'Error fetching weather data';
      setCurrentWeather(data);
    } catch (error) {}
    setIsLoading(false);
  };

  useEffect(() => {
    if (geolocationCoordinate?.latitude && geolocationCoordinate?.longitude) {
      findWeather();
    }
  }, [geographicalLocation, geolocationCoordinate]);

  const bg = currentWeather.weatherImage;

  return isLoading ? (
    <Loader />
  ) : (
    <View>
      {errorMessage ? (
        <View style={styles.errorBox}>
          <Text style={styles.error}>{errorMessage}</Text>
        </View>
      ) : (
        <ScrollView contentContainerStyle={styles.container}>
          {geographicalLocation.city && (
            <Text style={styles.city}>{geographicalLocation.city}</Text>
          )}
          {geographicalLocation.region && (
            <Text style={styles.region}>{geographicalLocation.region}</Text>
          )}
          {geographicalLocation.country && (
            <Text style={styles.country}>{geographicalLocation.country}</Text>
          )}

          {currentWeather.weather !== '' && (
            <>
              <Image source={bg} style={{ width: 200, height: 150 }} />
              <Text style={styles.weather}>{currentWeather.weather}</Text>

              <Text style={styles.temp}>{currentWeather.temperature}°C</Text>
              <Text style={styles.wind}>
                💨 {currentWeather.windSpeed} km/h
              </Text>
            </>
          )}

          {!errorMessage &&
            !geographicalLocation.city &&
            !geolocationCoordinate && (
              <Text style={styles.textState}>No location yet.</Text>
            )}
        </ScrollView>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: 60,
  },
  city: {
    fontSize: 32,
    fontWeight: '700',
    color: 'white',
  },
  region: {
    fontSize: 20,
    fontWeight: '500',
    color: 'white',
  },
  country: {
    fontSize: 20,
    fontWeight: '500',
    color: 'white',
    marginBottom: 20,
  },
  weather: {
    fontSize: 28,
    fontWeight: '500',
    color: 'white',
    marginTop: 10,
  },
  temp: {
    fontSize: 70,
    fontWeight: '800',
    color: 'white',
    marginVertical: 10,
  },
  wind: {
    fontSize: 22,
    fontWeight: '400',
    color: 'white',
    marginTop: 10,
  },
  textState: {
    fontSize: 20,
    fontWeight: '500',
    color: 'white',
  },
  errorBox: {
    padding: 20,
  },
  error: {
    textAlign: 'center',
    color: '#6D071A',
    fontSize: 20,
    fontWeight: '800',
  },
});
