import { fetchWeatherApi } from 'openmeteo';

import { t_GeolocationCoordinate } from '../types/type';

const todayWeatherData = async (
  geolocationCoordinate: t_GeolocationCoordinate
) => {
  try {
    const data = [];
    const responses = await fetchWeatherApi(
      'https://api.open-meteo.com/v1/forecast',
      {
        latitude: geolocationCoordinate.latitude,
        longitude: geolocationCoordinate.longitude,
        hourly: ['temperature_2m', 'weather_code', 'wind_speed_10m'],
        forecast_days: 1,
      }
    );
    if (responses.length === 0) throw 'No data found';

    const response = responses[0];
    if (!response) throw 'No data found';

    const utcOffsetSeconds = response.utcOffsetSeconds();
    const hourly = response.hourly()!;
    if (!hourly) throw 'No data found';

    const range = (start: number, stop: number, step: number) =>
      Array.from({ length: (stop - start) / step }, (_, i) => start + i * step);

    const weatherData = {
      hourly: {
        time: range(
          Number(hourly.time()),
          Number(hourly.timeEnd()),
          hourly.interval()
        ).map((t) => new Date((t + utcOffsetSeconds) * 1000)),
        temperature2m: hourly.variables(0)!.valuesArray()!,
        weatherCode: hourly.variables(1)!.valuesArray()!,
        windSpeed10m: hourly.variables(2)!.valuesArray()!,
      },
    };

    for (let i = 0; i < weatherData.hourly.time.length; i++) {
      data.push({
        hourly: `${new Date(weatherData.hourly.time[i]).getHours()}:00`,
        temperature2m: weatherData.hourly.temperature2m[i].toFixed(2),
        weatherCode: weatherData.hourly.weatherCode[i],
        windSpeed10m: weatherData.hourly.windSpeed10m[i].toFixed(2),
      });
    }
    return data;
  } catch (error: any) {
    return null;
  }
};

export default todayWeatherData;