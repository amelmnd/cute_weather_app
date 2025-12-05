import * as Location from 'expo-location';

import { t_setErrorProps } from '../types/type';

const getCurrentLocation = async ({
  setErrorMessage,
}: t_setErrorProps) => {
  try {
    const { coords } = await Location.getCurrentPositionAsync({
      accuracy: Location.Accuracy.High,
    });
    if (!coords) throw 'Error retrieving location.';

    return {
      latitude: coords.latitude,
      longitude: coords.longitude,
    };
  } catch (error: any) {
    setErrorMessage(error);
  }
};

export default getCurrentLocation