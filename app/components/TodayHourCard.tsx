import { View, Text, Image, StyleSheet } from "react-native";

export default function TodayHourCard({ hour, icon, temp, wind }: any) {
  return (
    <View style={styles.card}>
      <Text style={styles.hour}>{hour}</Text>
      <Image source={icon} style={styles.icon} />
      <Text style={styles.temp}>{temp}°C</Text>
      <View style={styles.windBox}>
        <Text style={styles.wind}> 💨 {wind} km/h</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    width: 90,
    backgroundColor: 'rgba(0,0,0,0.15)',
    marginHorizontal: 6,
    borderRadius: 15,
    paddingVertical: 10,
    paddingHorizontal: 5,
    alignItems: 'center',
  },
  hour: {
    color: '#fff',
    fontWeight: '600',
    fontSize: 15,
    marginBottom: 5,
  },
  icon: {
    width: 35,
    height: 25,
    marginBottom: 5,
  },
  temp: {
    color: '#012750',
    fontSize: 18,
    fontWeight: '700',
    marginBottom: 5,
  },
  windBox: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  windIcon: {
    width: 18,
    height: 18,
    tintColor: '#fff',
    marginRight: 3,
  },
  wind: {
    color: '#fff',
    fontSize: 12,
  },
});
