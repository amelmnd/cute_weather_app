import * as Location from 'expo-location';

import { t_setErrorProps } from '../types/type';

const getLocationPermission = async ({
  setErrorMessage,
}: t_setErrorProps) => {
  try {
    const { status } = await Location.requestForegroundPermissionsAsync();

    if (!status) throw 'Error requesting permission.';

    return status;
  } catch (error: any) {
    setErrorMessage(error);
    return null;
  }
};

export default getLocationPermission;