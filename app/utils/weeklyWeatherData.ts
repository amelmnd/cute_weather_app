import { fetchWeatherApi } from 'openmeteo';
import { t_GeolocationCoordinate } from '../types/type';
import { mapWeatherCode } from './weatherMapper';

const weeklyWeatherData = async (
  geolocationCoordinate: t_GeolocationCoordinate
) => {
  try {
    const data: any[] = [];

    const responses = await fetchWeatherApi(
      'https://api.open-meteo.com/v1/forecast',
      {
        latitude: geolocationCoordinate.latitude,
        longitude: geolocationCoordinate.longitude,
        daily: ['weather_code', 'temperature_2m_max', 'temperature_2m_min'],
      }
    );

    if (!responses.length) throw 'No data found';
    const response = responses[0];

    const utcOffsetSeconds = response.utcOffsetSeconds();
    const daily = response.daily()!;

    const range = (start: number, stop: number, step: number) =>
      Array.from({ length: (stop - start) / step }, (_, i) => start + i * step);

    const time = range(
      Number(daily.time()),
      Number(daily.timeEnd()),
      daily.interval()
    ).map((t) => new Date((t + utcOffsetSeconds) * 1000));

    const codes = daily.variables(0)!.valuesArray()!;
    const maxTemps = daily.variables(1)!.valuesArray()!;
    const minTemps = daily.variables(2)!.valuesArray()!;

    for (let i = 0; i < time.length; i++) {
      const code = codes[i];
      const weatherInfo = mapWeatherCode(code);

      data.push({
        day: time[i].toISOString().split('T')[0].replace(/-/g, '/'), // YYYY/MM/DD
        weatherCode: code,
        weatherLabel: weatherInfo.label,
        weatherIcon: weatherInfo.image,
        temperatureMax: maxTemps[i].toFixed(1),
        temperatureMin: minTemps[i].toFixed(1),
      });
    }

    return data;
  } catch (error) {
    console.log('weeklyWeatherData error:', error);
    return null;
  }
};

export default weeklyWeatherData;
