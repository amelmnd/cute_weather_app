import { View, Text, Image, StyleSheet } from 'react-native';

export default function WeeklyDayCard({ day, icon, min, max }: any) {
  return (
    <View style={styles.card}>
      <Text style={styles.day}>{day}</Text>
      <Image source={icon} style={styles.icon} />
      <Text style={styles.max}>{max}°C max</Text>
      <Text style={styles.min}>{min}°C min</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    width: 130,
    height: 160,
    backgroundColor: 'rgba(0,0,0,0.15)',
    borderRadius: 20,
    marginRight: 15,
    padding: 10,
    justifyContent: 'center',
    alignItems: 'center',
  },
  day: {
    color: '#012750',
    fontSize: 16,
    marginBottom: 6,
  },
  icon: {
    width: 50,
    height: 45,
    marginVertical: 8,
  },
  max: {
    color: '#6D071A',
    fontSize: 15,
    fontWeight: '600',
  },
  min: {
    color: '#012750',
    fontSize: 15,
    fontWeight: '600',
  },
});
