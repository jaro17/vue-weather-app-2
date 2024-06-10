const locationInput = document.getElementById("locationInput");
const searchButton = document.getElementById("searchButton");
const locationElement = document.getElementById("location");
const temperatureElement = document.getElementById("temperature");
const descriptionElement = document.getElementById("description");

async function getWeatherData(location) {
	const apiKey = "10448f4db4c14398dd325a8088edd189";
	const apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${location}&appid=${apiKey}&units=metric`;

	try {
		const response = await fetch(apiUrl);
		const data = await response.json();

		if (response.ok) {
			const { name, main, weather } = data;
			locationElement.textContent = `Location: ${name}`;
			temperatureElement.textContent = `Temperature: ${main.temp}°C`;
			descriptionElement.textContent = `Description: ${weather[0].description}`;
		} else {
			// console.error("Error fetching weather data", error);
			locationElement.textContent = `Location not found!`;
			temperatureElement.textContent = "";
			descriptionElement.textContent = "";
		}
	} catch (error) {
		console.error("Error fetching weather data", error);
	}
}

searchButton.addEventListener("click", () => {
	const location = locationInput.value.trim();
	if (location !== "") {
		getWeatherData(location);
	}
});
