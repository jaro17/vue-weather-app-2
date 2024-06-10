<script>
export default {
  data() {
    return {
      location: "",
      apiKey: "10448f4db4c14398dd325a8088edd189",
      locationText: "",
      temperatureText: "",
      descriptionText: "",
    };
  },
  methods: {
    async fetchWeather() {
      if (this.location.trim() === "") return;

      const apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${this.location}&appid=${this.apiKey}&units=metric`;

      try {
        const response = await fetch(apiUrl);
        const data = await response.json(); // Added await

        if (response.ok) {
          const { name, main, weather } = data;

          if (main && main && weather[0]) {
            this.locationText = `Location: ${name}`;
            this.temperatureText = `Temperature: ${main.temp}°C`;
            this.descriptionText = `Description: ${weather[0].description}`;
          } else {
            this.locationText = "Invalid data received";
            this.temperatureText = "";
            this.descriptionText = "";
          }
        } else {
          this.locationText = `Location not found!`;
          this.temperatureText = "";
          this.descriptionText = "";
        }
      } catch (error) {
        console.error("Error fetching weather data", error);
        this.locationText = "Error fetching data!";
        this.temperatureText = "";
        this.descriptionText = "";
      }
    },
  },
};
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
      <p>{{ locationText }}</p>
      <p>{{ temperatureText }}</p>
      <p>{{ descriptionText }}</p>
    </div>
  </div>
</template>

<style scoped></style>
