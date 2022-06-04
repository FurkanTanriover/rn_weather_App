import { View, Text, StyleSheet, Image } from "react-native";
import { colors } from "../utils/index";

const { primaryColor, secondaryColor } = colors;

export default function WeatherInfo({ currentWeather }) {
  const {
    main: { temp },
    weather: [details],
    name,
  } = currentWeather;
  const { icon, description, main } = details;
  const iconUrl = `https://openweathermap.org/img/wn/${icon}@4x.png`;
  return (
    <View style={styles.weatherInfo}>
      <Text>{name}</Text>
      <Image style={styles.weatherIcon} source={{ uri: iconUrl }} />
      <Text style={styles.textPrimary}>{temp}°</Text>
      <Text style={styles.weatherDescription}>{description}</Text>
      <Text style={styles.textSecondary}>{main}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  weatherInfo: {
    alignItems: "center",
  },
  weatherIcon: {
    width: 100,
    height: 100,
  },
  weatherDescription: {
    textTransform: "capitalize",
  },
  textPrimary: {
    fontSize: 40,
    color: primaryColor,
  },
  textSecondary: {
    fontSize: 20,
    marginTop: 10,
    color: secondaryColor,
    fontWeight: "500",
  },
});
