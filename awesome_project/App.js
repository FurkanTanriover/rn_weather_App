import { StatusBar } from "expo-status-bar";
import {
  Button,
  StyleSheet,
  Text,
  View,
  ActivityIndicator,
} from "react-native";
import * as Location from "expo-location";
import react, { useEffect, useState } from "react";
import WeatherInfo from "./components/WeatherInfo";
import UnitsPicker from "./components/UnitsPicker";
import { colors } from "./utils/index";
import ReloadIcon from "./components/ReloadIcon";
import WeatherDetails from "./components/WeatherDetails";
import {WEATHER_API_KEY} from "@env"

const BASE_WEATHER_URL = "https://api.openweathermap.org/data/2.5/weather?";

function App() {
  const [currentWeather, setCurrentWeather] = useState(null);
  const [errorMessage, setErrorMessage] = useState(null);
  const [unitsSystem, setUnitsSystem] = useState("metric");

  useEffect(() => {
    load();
  }, [unitsSystem]);

  async function load() {
    setCurrentWeather(null);
    setErrorMessage(null);
    try {
      let { status } = await Location.requestForegroundPermissionsAsync();

      if (status != "granted") {
        setErrorMessage("Access to location is needed to run the app");
        setLoading(!loading);
        return;
      }

      const location = await Location.getCurrentPositionAsync();

      const { latitude, longitude } = location.coords;

      const weatherUrl = `${BASE_WEATHER_URL}lat=${latitude}&lon=${longitude}&units=${unitsSystem}&appid=${WEATHER_API_KEY}`;

      const response = await fetch(weatherUrl);

      const result = await response.json();
      if (response.ok) {
        setCurrentWeather(result);
      } else {
        setErrorMessage(result.message);
      }
    } catch (error) {
      setErrorMessage(error.message);
    }
  }
  if (currentWeather) {
    return (
      <View style={styles.container}>
        <StatusBar style="auto" />
        <View style={styles.main}>
          <UnitsPicker
            unitsSystem={unitsSystem}
            setUnitsSystem={setUnitsSystem}
          />
          <ReloadIcon load={load} />
          <WeatherInfo currentWeather={currentWeather} />
        </View>
        <WeatherDetails
          currentWeather={currentWeather}
          unitsSystem={unitsSystem}
        />
      </View>
    );
  } else if (errorMessage) {
    return (
      <View style={styles.loading}>
        <ReloadIcon load={load} />
        <Text> {errorMessage}</Text>
        <StatusBar style="auto" />
      </View>
    );
  } else {
    return (
      <View style={styles.loading}>
        <ActivityIndicator size={"large"} color={colors.primaryColor} />
        <StatusBar style="auto" />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "white",
    justifyContent: "center",
  },
  main: {
    justifyContent: "center",
    flex: 1,
  },
  loading: {
    alignItems: "center",
    justifyContent: "center",
    flex: 1,
  },
});
export default App;
