<script>
import axios from 'axios';

export default {
  data() {
    return {
      location: "",
      locationText: "",
      temperatureText: "",
      descriptionText: "",
    }
  },
  methods: {
    fetchWeather() {
      this.locationText = "";
      this.temperatureText = "";
      this.descriptionText = "";
      const apiKey =  process.env.VUE_APP_WEATHER_API_KEY;
      const url = `https://api.openweathermap.org/data/2.5/weather?q=${this.location}&units=metric&appid=${this.apiKey}`;
      axios.get(url).then((response) => {
        this.locationText = response.data.name;
        this.temperatureText = response.data.main.temp;
        this.descriptionText = response.data.weather[0].description;
      });
    },
  }
}
</script>

<template>
  <div class="app-container">
    <h1>Weather App</h1>
    <input
        type="text"
        id="locationInput"
        placeholder="Enter location..."
        class="input mt-4"
        v-model="location"
    />
    <button @click="fetchWeather" id="searchButton" class="button is-dark mt-4">
      Search
    </button>
    <div class="mt-4">
      <p>Location: {{ locationText }}</p>
      <p>Temperature: {{ temperatureText }}°C</p>
      <p>Description:  {{ descriptionText }}</p>
    </div>
  </div>
</template>

<style scoped>

</style>
