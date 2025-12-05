export type t_GeolocationCoordinate = {
  latitude: number;
  longitude: number;
}

export type t_setErrorProps = {
  setErrorMessage: (errorMessage: string) => void;
};

export type t_Route = { key: string; title: string; icon: string };

export type t_dataLocation = {
  city: string;
  region: string;
  country: string;
};

export type t_apiDataCity = {
  name: string;
  admin1: string;
  country: string;
  latitude: number;
  longitude: number;
};

// JSON weatherCode type
export type WeatherDescriptions = Record<string, string>;
