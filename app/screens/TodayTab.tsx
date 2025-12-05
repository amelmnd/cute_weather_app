import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  Dimensions,
  Image,
} from 'react-native';
import { useEffect, useState } from 'react';
import { LineChart } from 'react-native-chart-kit';

import { i_NavBarProps } from '../types/interface';
import todayWeatherData from '../utils/todayWeatherData';
import Loader from '../components/Loader';
import TodayHourCard from '../components/TodayHourCard';
import { mapWeatherCode } from '../utils/weatherMapper';

export default function TodayTab({
  geolocationCoordinate,
  geographicalLocation,
  errorMessage,
  isLoading,
  setIsLoading,
}: i_NavBarProps) {
  const [weatherHour, setWeatherHour] = useState<any[]>([]);

  const findTodayWeather = async () => {
    setIsLoading(true);
    try {
      if (!geolocationCoordinate) throw 'No geolocation data';
      const data = await todayWeatherData(geolocationCoordinate);
      if (!data) throw 'Error fetching weather data';
      setWeatherHour(data);
    } catch (error) {
      console.log(error);
    }
    setIsLoading(false);
  };

  useEffect(() => {
    if (geolocationCoordinate?.latitude && geolocationCoordinate?.longitude) {
      findTodayWeather();
    }
  }, [geographicalLocation, geolocationCoordinate]);

  const chartData = {
    labels: weatherHour.map((x) => x.hourly),
    datasets: [
      {
        data: weatherHour.map((x) => Number(x.temperature2m)),
        color: () => 'rgba(255,180,0,1)',
        strokeWidth: 2,
      },
    ],
  };

  const getWeatherIcon = (code: number) => {
    const info = mapWeatherCode(code);
    return info.image;
  };

  const fullHours = weatherHour.map((x) => x.hourly); // 24 valeurs
  const labelEvery3Hours = fullHours.filter((_, index) => index % 3 === 0);

  return isLoading ? (
    <Loader />
  ) : (
    <View style={styles.container}>
      {errorMessage ? (
        <View style={styles.errorBox}>
          <Text style={styles.error}>{errorMessage}</Text>
        </View>
      ) : (
        <ScrollView style={{ width: '100%' }}>
          <View style={{ marginTop: 15 }}>
            {geographicalLocation.city && (
              <Text style={styles.textState}>{geographicalLocation.city}</Text>
            )}
            {geographicalLocation.region && (
              <Text style={styles.textState}>
                {geographicalLocation.region}
              </Text>
            )}
            {geographicalLocation.country && (
              <Text style={styles.textState}>
                {geographicalLocation.country}
              </Text>
            )}
          </View>

          {weatherHour.length > 0 && (
            <View style={styles.chartContainer}>
              <View>
                <LineChart
                  data={{
                    labels: labelEvery3Hours,
                    datasets: [
                      {
                        data: weatherHour.map((x) => Number(x.temperature2m)),
                        color: () => '#65A9EA',
                        strokeWidth: 2,
                      },
                    ],
                  }}
                  width={Dimensions.get('window').width - 20}
                  height={230}
                  withInnerLines={false}
                  withOuterLines={false}
                  withHorizontalLabels={true}
                  withVerticalLabels={true}
                  withShadow={false}
                  bezier={false}
                  chartConfig={{
                    backgroundColor: '#C3E4F3',
                    backgroundGradientFrom: '#B5DCF0',
                    backgroundGradientTo: '#C3E4F3',
                    decimalPlaces: 1,
                    color: () => '#012750',
                    labelColor: () => '#012750',
                    propsForDots: {
                      r: '2',
                      strokeWidth: '1',
                      stroke: '#012750',
                      fill: '#012750',
                    },
                  }}
                  style={{
                    borderRadius: 20,
                    padding: 20,
                  }}
                />
              </View>
            </View>
          )}

          <ScrollView
            horizontal
            showsHorizontalScrollIndicator={false}
            style={styles.hourScroll}
          >
            {weatherHour.map((item, index) => (
              <TodayHourCard
                key={index}
                hour={item.hourly}
                icon={getWeatherIcon(item.weatherCode)}
                temp={item.temperature2m}
                wind={item.windSpeed10m}
              />
            ))}
          </ScrollView>
        </ScrollView>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'transparent',
    alignItems: 'center',
  },
  textState: {
    fontSize: 22,
    textAlign: 'center',
    color: '#fff',
  },
  chartContainer: {
    marginTop: 20,
    marginBottom: 15,
    alignItems: 'center',
  },
  chartTitle: {
    color: '#fff',
    fontSize: 18,
    marginBottom: 8,
  },
  chart: {
    borderRadius: 20,
  },
  hourScroll: {
    marginTop: 10,
    paddingBottom: 20,
    paddingHorizontal: 10,
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
