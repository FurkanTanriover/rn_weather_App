import { View, Text, StyleSheet } from "react-native";
import React from "react";
import { colors } from "../utils/index";
import { FontAwesome5, MaterialCommunityIcons } from "@expo/vector-icons";

const { primaryColor, secondaryColor, borderColor } = colors;
export default function WeatherDetails({ currentWeather, unitsSystem }) {
  const {
    main: { feels_like, humidity, pressure },
    wind: { speed },
  } = currentWeather;

  const windSpeed =
    unitsSystem === "metric"
      ? `${Math.round(speed)} m/s`
      : `${Math.round(speed)} miles/s`;

  return (
    <View style={styles.weatherDetails}>
      <View style={styles.weatherDetailsRow}>
        <View
          style={[
            styles.weatherDetailsBox,
            { borderRightWidth: 1, borderRightColor: borderColor },
          ]}
        >
          <View style={styles.weatherDetailsRow}>
            <MaterialCommunityIcons
              name="speedometer"
              size={30}
              color={primaryColor}
            />
            <View style={styles.weatherDetailsItem}>
              <Text>Wind Speed:</Text>
              <Text style={styles.textSecondary}>{windSpeed}</Text>
            </View>
          </View>
        </View>
        <View style={styles.weatherDetailsBox}>
          <View style={styles.weatherDetailsRow}>
            <MaterialCommunityIcons
              name="weather-windy"
              size={30}
              color={primaryColor}
            />
            <View style={styles.weatherDetailsItem}>
              <Text>Pressure:</Text>
              <Text style={styles.textSecondary}>{pressure}</Text>
            </View>
          </View>
        </View>
      </View>
      <View style={[styles.weatherDetailsRow,{borderTopWidth:1,borderTopColor:borderColor}]}>
        <View
          style={[
            styles.weatherDetailsBox,
            { borderRightWidth: 1, borderRightColor: borderColor },
          ]}
        >
          <View style={styles.weatherDetailsRow}>
            <FontAwesome5
              name="temperature-low"
              size={30}
              color={primaryColor}
            />
            <View style={styles.weatherDetailsItem}>
              <Text>Feels like:</Text>
              <Text style={styles.textSecondary}>{feels_like}</Text>
            </View>
          </View>
        </View>
        <View style={styles.weatherDetailsBox}>
          <View style={styles.weatherDetailsRow}>
            <MaterialCommunityIcons
              name="water"
              size={30}
              color={primaryColor}
            />
            <View style={styles.weatherDetailsItem}>
              <Text>Humidity:</Text>
              <Text style={styles.textSecondary}>{humidity}%</Text>
            </View>
          </View>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  weatherDetails: {
    margin: 20,
    marginTop: "auto",
    borderWidth: 1,
    borderColor: borderColor,
    borderRadius: 10,
    marginBottom:50,
  },
  weatherDetailsRow: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  weatherDetailsBox: {
    flex: 1,
    padding: 20,
  },
  textSecondary: {
    fontSize: 15,
    color: secondaryColor,
    fontWeight: "bold",
  },
  weatherDetailsItem:{
    alignItems:"flex-end",
    justifyContent:"flex-end",
  }
});
