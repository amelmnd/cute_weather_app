import { View, TouchableOpacity, StyleSheet, Text } from 'react-native';
import React, { useEffect, useState } from 'react';
import FontAwesome from '@expo/vector-icons/FontAwesome';
import AntDesign from '@expo/vector-icons/AntDesign';
import Autocomplete from 'react-native-autocomplete-input';

import { i_HeaderProps } from '../types/interface';
import getLocationPermission  from '../utils/getLocationPermission';
import  getCurrentLocation  from '../utils/getCurrentLocation';
import {
  findCityWithCoor,
  findCitiesWithInputName,
} from '../utils/findDataCity';
import { t_apiDataCity } from '../types/type';

export default function Header({
  setGeographicalLocation,
  statusGeolocationPermission,
  setStatusGeolocationPermission,
  setGeolocationCoordinate,
  inputLocation,
  setInputLocation,
  setErrorMessage,
  setIsLoading,
}: i_HeaderProps) {
  const [allCitiesFind, setAllCitiesFind] = useState<t_apiDataCity[]>([]);

  const handlePermissionRequest = async () => {
    try {
      setErrorMessage('');
      const res = await getLocationPermission({
        setErrorMessage,
      });
      if (!res) return;
      setStatusGeolocationPermission(res);
      if (res && res !== 'granted') {
        throw 'Geolocation is not available, please enable it in your settings';
      }
      const coords = await getCurrentLocation({
        setErrorMessage,
      });
      if (!coords || !coords.latitude || !coords.longitude)
        throw 'Error retrieving location.';

      setGeolocationCoordinate(coords);
      const dataCityWithCoor = await findCityWithCoor(
        coords.latitude,
        coords.longitude,
        setErrorMessage
      );
      if (!dataCityWithCoor) throw 'Error retrieving city data.';
      setGeographicalLocation(dataCityWithCoor);
      setErrorMessage('');
    } catch (err: any) {
      setErrorMessage(err);
    }
  };

  const handleInputLocation = async (text: string) => {
    setIsLoading(true);
    try {
      setErrorMessage('');
      const res = await findCitiesWithInputName(text, setErrorMessage);
      if (!res) throw 'No cities found.';
      setAllCitiesFind(res.slice(0, 5));

      setErrorMessage('');
    } catch (error: any) {
      setAllCitiesFind([]);
      setErrorMessage(error);
    }
    setIsLoading(false);
  };
  useEffect(() => {
    if (statusGeolocationPermission === '') {
      handlePermissionRequest();
    }
  }, []);
  useEffect(() => {
    if (inputLocation.trim() !== '' && inputLocation.length >= 2) {
      handleInputLocation(inputLocation);
    } else {
      setAllCitiesFind([]);
    }
  }, [inputLocation]);

  const handleSelectCity = (item: any) => {
    setErrorMessage('');
    setGeographicalLocation({
      city: item.name,
      region: item.admin1,
      country: item.country,
    });
    setGeolocationCoordinate({
      latitude: item.latitude,
      longitude: item.longitude,
    });
    setInputLocation('');
    setAllCitiesFind([]);
  };

  return (
    <View style={styles.box}>
      <View style={styles.iconBox}>
        <AntDesign name='search1' size={24} color='#E1E1E5' />
      </View>
      <View style={styles.autocompleteContainer}>
        <Autocomplete
          data={allCitiesFind}
          value={inputLocation}
          onChangeText={(text) => setInputLocation(text)}
          placeholder={'Search location....'}
          placeholderTextColor={'#b3b6b7'}
          flatListProps={{
            keyboardShouldPersistTaps: 'handled',
            keyExtractor: (_, index) => index.toString(),
            renderItem: ({ item }) => (
              <TouchableOpacity
                style={styles.txtAutocomplete}
                onPress={() => {
                  handleSelectCity(item);
                }}
              >
                <View>
                  {item.name && <Text style={styles.cityTxt}>{item.name}</Text>}
                  {item.admin1 && <Text>{item.admin1}</Text>}
                  {item.country && <Text>{item.country}</Text>}
                </View>
              </TouchableOpacity>
            ),
          }}
        />
      </View>

      <TouchableOpacity
        onPress={() => {
          setIsLoading(true);
          handlePermissionRequest();
          setIsLoading(false);
        }}
        style={styles.iconBox}
      >
        <FontAwesome name='location-arrow' size={24} color='#FFF' />
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  box: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: '#4598F2',
  },
  iconBox: {
    padding: 25,
  },
  autocompleteContainer: {
    flex: 1,
    left: 60,
    position: 'absolute',
    right: 60,
    top: 15,
    zIndex: 1,
  },
  input: {
    borderColor: 'gray',
    borderWidth: 1,
    backgroundColor: '#4A6B94',
  },
  txtAutocomplete: {
    padding: 10,
  },
  inputFocused: {
    backgroundColor: '#4A6B94',
    color: '#FFF',
  },
  cityTxt: {
    fontWeight: 'bold',
  },
});
