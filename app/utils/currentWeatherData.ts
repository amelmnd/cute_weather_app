import { fetchWeatherApi } from 'openmeteo';

import { t_GeolocationCoordinate } from '../types/type';
import { mapWeatherCode } from './weatherMapper';

const currentWeatherData = async (
  geolocationCoordinate: t_GeolocationCoordinate
) => {
  try {
    if (!geolocationCoordinate.latitude || !geolocationCoordinate.longitude)
      throw 'No geolocation data';

    const responses = await fetchWeatherApi(
      'https://api.open-meteo.com/v1/forecast',
      {
        latitude: geolocationCoordinate.latitude,
        longitude: geolocationCoordinate.longitude,
        current: ['temperature_2m', 'weather_code', 'wind_speed_10m'],
      }
    );
    if (!responses || responses.length === 0)
      throw 'Error fetching weather data';

    const response = responses[0];
    if (!response.current()) throw 'No current weather data';

    const current = response.current()!;
    if (!current) throw 'No current weather data';

    const weatherData = {
      current: {
        temperature2m: current.variables(0)!.value(),
        weatherCode: current.variables(1)!.value(),
        windSpeed10m: current.variables(2)!.value(),
      },
    };
    const weatherInfo = mapWeatherCode(weatherData.current.weatherCode);
    return {
      temperature: weatherData.current.temperature2m.toFixed(2),
      weather: weatherInfo.category,
      weatherLabel: weatherInfo.label,
      weatherImage: weatherInfo.image,
      windSpeed: weatherData.current.windSpeed10m.toFixed(2),
    };
  } catch (error: any) {
    return null;
  }
};

export default currentWeatherData;
