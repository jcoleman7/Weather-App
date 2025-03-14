import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, ScrollView, Dimensions, KeyboardAvoidingView, Platform } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient'; // Use expo-linear-gradient

const apiKey = '92836225263d912448ce63a1f6f1bc65';

const { height, width } = Dimensions.get('window'); // Get screen dimensions

const WeatherApp = () => {
  const [city, setCity] = useState('');
  const [weather, setWeather] = useState(null);
  const [error, setError] = useState('');

  const getWeatherData = async () => {
    if (city) {
      try {
        const response = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=imperial`);
        if (!response.ok) {
          throw new Error('Could not fetch weather data');
        }
        const data = await response.json();
        setWeather(data);
        setError('');
      } catch (error) {
        setError(error.message);
        setWeather(null);
      }
    } else {
      setError('Please enter a city');
      setWeather(null);
    }
  };

  const getWeatherEmoji = (weatherId) => {
    if (weatherId >= 200 && weatherId < 300) return '⚡'; // Thunderstorm
    if (weatherId >= 300 && weatherId < 400) return '🌧️'; // Drizzle
    if (weatherId >= 500 && weatherId < 600) return '🌧️'; // Rain
    if (weatherId >= 600 && weatherId < 700) return '❄️'; // Snow
    if (weatherId >= 700 && weatherId < 800) return '🌫️'; // Atmosphere
    if (weatherId === 800) return '☀️'; // Clear sky
    if (weatherId > 800) return '☁️'; // Clouds
    return '🌥️'; // Default
  };

  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
    >
      <ScrollView contentContainerStyle={styles.scrollContainer}>
        <View style={styles.weatherForm}>
          <TextInput
            style={styles.cityInput}
            placeholder="Enter city"
            value={city}
            onChangeText={setCity}
          />
          <TouchableOpacity style={styles.button} onPress={getWeatherData}>
            <Text style={styles.buttonText}>Get Weather</Text>
          </TouchableOpacity>
        </View>

        {error && <Text style={styles.errorDisplay}>{error}</Text>}

        {weather && (
          <LinearGradient colors={['orange', 'blue']} style={styles.card}>
            <Text style={styles.cityDisplay}>{weather.name}</Text>
            <Text style={styles.tempDisplay}>{weather.main.temp}°F</Text>
            <Text style={styles.humidityDisplay}>Humidity: {weather.main.humidity}%</Text>
            <Text style={styles.descDisplay}>{weather.weather[0].description}</Text>
            <Text style={styles.weatherEmoji}>{getWeatherEmoji(weather.weather[0].id)}</Text>
          </LinearGradient>
        )}
      </ScrollView>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    backgroundColor: 'grey',
  },
  scrollContainer: {
    flexGrow: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  weatherForm: {
    marginBottom: 20,
    flexDirection: 'column', // Stack the input and button vertically
    justifyContent: 'center',
    alignItems: 'center',
    width: width * 0.9, // Dynamic width to fit screen
  },
  cityInput: {
    padding: 15,
    fontSize: width * 0.07, // Adjust based on screen width
    fontWeight: 'bold',
    borderWidth: 2,
    borderColor: 'black',
    borderRadius: 10,
    margin: 10,
    width: '100%',  // Make the input take full width
    backgroundColor: 'white',
  },
  button: {
    padding: 15,
    fontWeight: 'bold',
    fontSize: width * 0.07, // Adjust based on screen width
    backgroundColor: 'green',
    borderRadius: 10,
    width: '100%',  // Make the button take full width
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 10,
  },
  buttonText: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: width * 0.07, // Adjust text size dynamically
  },
  card: {
    padding: 30,
    width: width * 0.9, // Dynamic width to fit screen
    minWidth: 300,
    flexDirection: 'column',
    alignItems: 'center',
    marginTop: 20,
    borderRadius: 10,
    shadowColor: 'black',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.8,
    shadowRadius: 2,
  },
  cityDisplay: {
    fontSize: width * 0.1, // Adjust based on screen width (3.5rem equivalent)
    fontWeight: 'bold',
    color: 'black',
    marginBottom: 15,
  },
  tempDisplay: {
    fontSize: width * 0.1, // Adjust based on screen width (3.5rem equivalent)
    fontWeight: 'bold',
    color: 'black',
    marginBottom: 15,
  },
  humidityDisplay: {
    fontSize: width * 0.05,
    marginBottom: 5,
  },
  descDisplay: {
    fontSize: width * 0.06,
    fontWeight: 'bold',
    fontStyle: 'italic',
  },
  weatherEmoji: {
    margin: 0,
    fontSize: width * 0.2,  // 7.5rem equivalent
  },
  errorDisplay: {
    fontSize: width * 0.06, // Adjust based on screen width (2.5rem equivalent)
    fontWeight: 'bold',
    color: 'black',
    marginTop: 20,
  },
});

export default WeatherApp;




