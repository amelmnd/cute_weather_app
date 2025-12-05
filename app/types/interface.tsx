import { t_GeolocationCoordinate, t_dataLocation } from './type';

export interface i_HeaderProps {
  statusGeolocationPermission: string;
  setStatusGeolocationPermission: (statusGeolocationPermission: string) => void;
  geolocationCoordinate: t_GeolocationCoordinate | null;
  setGeolocationCoordinate: (
    statusGeolocationPermission: t_GeolocationCoordinate | null
  ) => void;
  geographicalLocation: t_dataLocation;
  setGeographicalLocation: (geographicalLocation: t_dataLocation) => void;
  inputLocation: string;
  setInputLocation: (inputLocation: string) => void;
  setErrorMessage: (errorMessage: string) => void;
  setIsLoading: (isLoading: boolean) => void;
}

export interface i_NavBarProps {
  geolocationCoordinate: t_GeolocationCoordinate | null;
  geographicalLocation: t_dataLocation;
  errorMessage: string;
  isLoading: boolean;
  setIsLoading: (isLoading: boolean) => void;
};
