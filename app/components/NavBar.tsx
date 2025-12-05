import React, { useState } from 'react';
import { StyleSheet, useWindowDimensions } from 'react-native';
import { TabView, TabBar } from 'react-native-tab-view';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

import { t_Route } from '../types/type';
import { i_NavBarProps } from '../types/interface';
import CurrentTab from '../screens/CurrentTab';
import TodayTab from '../screens/TodayTab';
import WeeklyTab from '../screens/WeeklyTab';

export default function NavBar({
  geolocationCoordinate,
  geographicalLocation,
  errorMessage,
  isLoading,
  setIsLoading,
}: i_NavBarProps) {
  const layout = useWindowDimensions();
  const [index, setIndex] = useState(0);

  const routes: t_Route[] = [
    { key: 'Current', title: 'Current', icon: 'weather-sunny' },
    { key: 'Today', title: 'Today', icon: 'calendar-today' },
    { key: 'Weekly', title: 'Weekly', icon: 'calendar-range' },
  ];

  const renderScene = ({ route }: { route: t_Route }) => {
    switch (route.key) {
      case 'Current':
        return (
          <CurrentTab
            geolocationCoordinate={geolocationCoordinate}
            geographicalLocation={geographicalLocation}
            errorMessage={errorMessage}
            isLoading={isLoading}
            setIsLoading={setIsLoading}
          />
        );
      case 'Today':
        return (
          <TodayTab
            geolocationCoordinate={geolocationCoordinate}
            geographicalLocation={geographicalLocation}
            errorMessage={errorMessage}
            isLoading={isLoading}
            setIsLoading={setIsLoading}
          />
        );
      case 'Weekly':
        return (
          <WeeklyTab
            geolocationCoordinate={geolocationCoordinate}
            geographicalLocation={geographicalLocation}
            errorMessage={errorMessage}
            isLoading={isLoading}
            setIsLoading={setIsLoading}
          />
        );
      default:
        return null;
    }
  };

  return (
    <TabView
      swipeEnabled={true}
      navigationState={{ index, routes }}
      renderScene={renderScene}
      onIndexChange={setIndex}
      initialLayout={{ width: layout.width }}
      tabBarPosition={'bottom'}
      commonOptions={{
        icon: ({ route, focused, color }) => (
          <Icon name={route.icon} color={color} size={28} />
        ),
      }}
      options={{
        current: {
          labelText: 'current',
        },
        today: {
          labelText: 'today',
        },
        weekly: {
          labelText: 'weekly',
        },
      }}
      renderTabBar={(props) => (
        <>
          <TabBar
            {...props}
            style={styles.tabBar}
            indicatorStyle={styles.indicator}
            activeColor='#4A6B94'
            inactiveColor='#E1E1E5'
            pressColor={'#FFF'}
          />
        </>
      )}
    />
  );
}

const styles = StyleSheet.create({
  tabBar: {
    backgroundColor:
      'linear-gradient(180deg, rgba(243,248,250,1) 0%, rgba(251,251,251,0.5130646008403361) 10%);',
    fontSize: 22,
  },
  indicator: {
    backgroundColor: 'transparent',
  },
});
