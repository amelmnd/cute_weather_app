import { useEffect, useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  Dimensions,
  Image,
} from 'react-native';
import { LineChart } from 'react-native-chart-kit';

import { i_NavBarProps } from '../types/interface';
import weeklyWeatherData from '../utils/weeklyWeatherData';
import Loader from '../components/Loader';
import WeeklyDayCard from '../components/WeeklyDayCard';

export default function WeeklyTab({
  geolocationCoordinate,
  geographicalLocation,
  errorMessage,
  isLoading,
  setIsLoading,
}: i_NavBarProps) {
  const [weatherWeek, setWeatherWeek] = useState<any[]>([]);

  const findWeeklyWeather = async () => {
    setIsLoading(true);
    try {
      if (!geolocationCoordinate) throw 'No geolocation data';
      const data = await weeklyWeatherData(geolocationCoordinate);
      if (!data) throw 'Error fetching weekly weather data';
      setWeatherWeek(data);
    } catch (error) {
      console.log(error);
    }
    setIsLoading(false);
  };

  useEffect(() => {
    if (geolocationCoordinate?.latitude && geolocationCoordinate?.longitude) {
      findWeeklyWeather();
    }
  }, [geographicalLocation, geolocationCoordinate]);

  // GRAPH DATA
  const chartData = {
    labels: weatherWeek.map((x) => x.day.slice(5)),
    datasets: [
      {
        data: weatherWeek.map((x) => Number(x.temperatureMax)),
        color: () => '#FF8A80',
        strokeWidth: 2,
      },
      {
        data: weatherWeek.map((x) => Number(x.temperatureMin)),
        color: () => '#81D4FA',
        strokeWidth: 2,
      },
    ],
  };

  return isLoading ? (
    <Loader />
  ) : (
    <View style={styles.container}>
      {errorMessage ? (
        <View style={styles.errorBox}>
          <Text style={styles.error}>{errorMessage}</Text>
        </View>
      ) : (
        <ScrollView
          style={{ width: '100%' }}
          contentContainerStyle={{ paddingBottom: 40 }}
        >
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

          {weatherWeek.length > 0 && (
            <View style={styles.chartContainer}>
              <LineChart
                data={chartData}
                width={Dimensions.get('window').width - 20}
                height={230}
                withInnerLines={false}
                withOuterLines={false}
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
                    r: '4',
                    strokeWidth: '2',
                    stroke: '#ffffff',
                  },
                }}
                style={{
                  borderRadius: 20,
                  padding: 20,
                }}
              />
            </View>
          )}

          <ScrollView
            horizontal
            showsHorizontalScrollIndicator={false}
            style={{ marginTop: 15, paddingLeft: 10 }}
          >
            {weatherWeek.map((day, index) => (
              <WeeklyDayCard
                key={index}
                day={day.day}
                icon={day.weatherIcon}
                min={day.temperatureMin}
                max={day.temperatureMax}
              />
            ))}
          </ScrollView>

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
    marginBottom: 25,
    alignItems: 'center',
  },
  dayCard: {
    width: '90%',
    backgroundColor: 'rgba(255,255,255,0.1)',
    borderRadius: 20,
    padding: 15,
    marginVertical: 10,
    alignSelf: 'center',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  dayText: {
    color: '#fff',
    fontSize: 18,
    width: 110,
  },
  icon: {
    width: 45,
    height: 45,
  },
  tempWrap: {
    alignItems: 'flex-end',
  },
  tempMax: {
    color: '#FF8A80',
    fontSize: 16,
  },
  tempMin: {
    color: '#81D4FA',
    fontSize: 16,
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
