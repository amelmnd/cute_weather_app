// utils/weatherMapper.ts

export type WeatherCategory =
  | 'Clear'
  | 'Cloudy'
  | 'Foggy'
  | 'Rainy'
  | 'Snowy'
  | 'Stormy'
  | 'Default';

export interface WeatherInfo {
  category: WeatherCategory;
  label: string;
  image: any;
}

const weatherImages: Record<WeatherCategory, any> = {
  Clear: require('../../assets/images/weather/clear.webp'),
  Cloudy: require('../../assets/images/weather/cloudy.png'),
  Foggy: require('../../assets/images/weather/foggy.png'),
  Rainy: require('../../assets/images/weather/rainy.png'),
  Snowy: require('../../assets/images/weather/snowy.png'),
  Stormy: require('../../assets/images/weather/stormy.png'),
  Default: require('../../assets/images/weather/unknown.png'),
};

// Mapping weather code → category + label
export const mapWeatherCode = (code: number): WeatherInfo => {
  const c = Number(code);

  if ([0].includes(c))
    return {
      category: 'Clear',
      label: 'Clear sky',
      image: weatherImages.Clear,
    };

  if ([1, 2, 3].includes(c))
    return { category: 'Cloudy', label: 'Cloudy', image: weatherImages.Cloudy };

  if ([45, 48].includes(c))
    return { category: 'Foggy', label: 'Fog', image: weatherImages.Foggy };

  if ([51, 53, 55, 56, 57, 61, 63, 65, 66, 67, 80, 81, 82].includes(c))
    return { category: 'Rainy', label: 'Rain', image: weatherImages.Rainy };

  if ([71, 73, 75, 77, 85, 86].includes(c))
    return { category: 'Snowy', label: 'Snow', image: weatherImages.Snowy };

  if ([95, 96, 99].includes(c))
    return {
      category: 'Stormy',
      label: 'Thunderstorm',
      image: weatherImages.Stormy,
    };

  return {
    category: 'Default',
    label: 'Unknown',
    image: weatherImages.Default,
  };
};
